import React from "react";
import { StatusBadge } from "@/shared/components/StatusBadge";

export const ChatStatusBadge: React.FC = () => {
  return (
    <StatusBadge
      status="indexed"
      label="RAG Vector Engine"
      className="hidden sm:inline-flex"
    />
  );
};

export default ChatStatusBadge;
