import React from "react";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
import type { Message } from "../types/conversation.types";

export interface MessageListProps {
  messages: Message[];
  loadingHistory: boolean;
  generating: boolean;
  streaming: boolean;
  bottomRef: React.RefObject<HTMLDivElement | null>;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  loadingHistory,
  generating,
  streaming,
  bottomRef,
}) => {
  const hasAssistantMessage =
    messages[messages.length - 1]?.role === "assistant";

  const showTyping = (loadingHistory || generating) && !hasAssistantMessage;

  return (
    <div className="space-y-6 z-10">
      {messages.map((message, index) => (
        <ChatMessage
          key={message._id ?? index}
          message={message}
          streaming={
            streaming &&
            index === messages.length - 1 &&
            message.role === "assistant"
          }
        />
      ))}
      {showTyping && <TypingIndicator loading={true} />}
      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;
