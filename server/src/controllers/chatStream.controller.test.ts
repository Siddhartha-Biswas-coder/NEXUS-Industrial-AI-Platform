
import { EventEmitter } from "node:events";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../services/chat.service.ts", () => ({
    askQuestionStream: vi.fn(),
}));

vi.mock("../models/message.model.ts", () => ({
    default: { create: vi.fn() },
}));

vi.mock("../models/conversation.model.ts", () => ({
    default: { findOneAndUpdate: vi.fn() },
}));

import { streamChatController } from "./chatStream.controller.ts";
import { askQuestionStream } from "../services/chat.service.ts";
import MessageModel from "../models/message.model.ts";
import ConversationModel from "../models/conversation.model.ts";
import { clear } from "node:console";

const mockedAskQuestionStream = vi.mocked(askQuestionStream);
const mockedMessageModel = vi.mocked(MessageModel);
const mockedConversationModel = vi.mocked(ConversationModel);

function makeResponse() {
    const events = new EventEmitter();
    const chunks: string[] = [];

    const res = Object.assign(events, {
        writableEnded: false,
        destroyed: false,
        setHeader: vi.fn(),
        flushHeaders: vi.fn(),
        write: vi.fn((chunk: string) => {
            chunks.push(chunk);
            return true;
        }),
        end: vi.fn(function (this: { writableEnded: boolean }) {
            this.writableEnded = true;
        }),
    });

    return { res, chunks };
}

async function runController(req: any, res: any) {
    const next = vi.fn();

    // asyncHandler returns an Express middleware that starts a promise.
    streamChatController(req, res, next);

    // Allow the async handler to finish its awaited work.
    await vi.waitFor(() => {
        expect(res.end).toHaveBeenCalled();
    });

    return next;
}

describe("streamChatController", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("streams tokens, saves the answer, and sends done", async () => {
        const { res, chunks } = makeResponse();

        mockedAskQuestionStream.mockResolvedValue({
            stream: (async function* () {
                yield "Hello ";
                yield "world";
            })(),
            conversation: {
                _id: "conversation-a",
                title: "Hello",
                activeDocuments: [],
                lastMessageAt: new Date(),
                createdAt: new Date(),
            },
            sources: [],
            responseType: "general",
        } as any);

        mockedMessageModel.create.mockResolvedValue({} as any);

        mockedConversationModel.findOneAndUpdate.mockResolvedValue({
            _id: "conversation-a",
            title: "Hello",
            lastMessageAt: new Date(),
        } as any);

        await runController(
            {
                body: {
                    conversationId: "conversation-a",
                    question: "Hello",
                },
                user: { id: "user-a" },
            },
            res,
        );

        const output = chunks.join("");

        expect(output).toContain('"type":"start"');
        expect(output).toContain('"type":"token","content":"Hello "');
        expect(output).toContain('"type":"token","content":"world"');
        expect(output).toContain('"type":"done"');

        expect(mockedMessageModel.create).toHaveBeenCalledWith(
            expect.objectContaining({
                chat: "conversation-a",
                role: "assistant",
                content: "Hello world",
            }),
        );

        expect(res.end).toHaveBeenCalledOnce();
    });

    it("sends a safe error event when stream generation fails", async () => {
        const { res, chunks } = makeResponse();

        mockedAskQuestionStream.mockRejectedValue(
            new Error("private database details"),
        );

        const consoleError = vi
            .spyOn(console, "error")
            .mockImplementation(() => { });

        try {
            await runController(
                {
                    body: {
                        conversationId: "conversation-a",
                        question: "Hello",
                    },
                    user: { id: "user-a" },
                },
                res,
            );

            const output = chunks.join("");

            expect(output).toContain('"type":"error"');
            expect(output).toContain("Unable to complete the chat request.");
            expect(output).not.toContain("private database details");
            expect(mockedMessageModel.create).not.toHaveBeenCalled();
        } finally {
            consoleError.mockRestore();
        }
    });



    it("does not save an incomplete assistant response after client disconnects", async () => {
        const { res } = makeResponse();
        const offSpy = vi.spyOn(res, "off");

        let signalFirstToken!: () => void;
        let waitForDisconnect!: () => void;

        const firstTokenSent = new Promise<void>((resolve) => {
            signalFirstToken = resolve;
        });

        const disconnectReceived = new Promise<void>((resolve) => {
            waitForDisconnect = resolve;
        });

        mockedAskQuestionStream.mockResolvedValue({
            stream: (async function* () {
                yield "partial response";
                signalFirstToken();

                // Pause until the test explicitly disconnects the client.
                await disconnectReceived;

                yield " this should not be sent";
            })(),
            conversation: {
                _id: "conversation-a",
                title: "Test conversation",
                activeDocuments: [],
                lastMessageAt: new Date(),
                createdAt: new Date(),
            },
            sources: [],
            responseType: "general",
        } as any);

        const req = {
            body: {
                conversationId: "conversation-a",
                question: "Hello",
            },
            user: { id: "user-a" },
        };

        streamChatController(req as any, res as any, vi.fn());

        await firstTokenSent;

        await vi.waitFor(() => {
            expect(res.write).toHaveBeenCalledWith(
                expect.stringContaining('"content":"partial response"'),
            );
        });

        // Simulate the client closing the connection.
        res.emit("close");
        waitForDisconnect();

        await vi.waitFor(() => {
            expect(offSpy).toHaveBeenCalledWith(
                "close",
                expect.any(Function),
            );
        });

        const writtenChunks = res.write.mock.calls.map(
            ([chunk]) => String(chunk),
        );

        expect(
            writtenChunks.some((chunk) =>
                chunk.includes("this should not be sent"),
            ),
        ).toBe(false);

        expect(mockedMessageModel.create).not.toHaveBeenCalled();
        expect(mockedConversationModel.findOneAndUpdate).not.toHaveBeenCalled();
    });


});
