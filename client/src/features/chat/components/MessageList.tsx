import React from "react";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
import type { Message } from "../types/conversation.types";

export interface MessageListProps {
  messages: Message[];
  loading: boolean;
  bottomRef: React.RefObject<HTMLDivElement | null>;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  loading,
  bottomRef,
}) => {
  return (
    <div className="space-y-6 z-10">
      {messages.map((message, index) => (
        <ChatMessage key={message._id ?? index} message={message} />
      ))}
      <TypingIndicator loading={loading} />
      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;
