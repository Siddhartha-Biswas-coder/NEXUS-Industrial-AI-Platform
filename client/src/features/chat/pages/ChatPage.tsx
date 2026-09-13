import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";
import ChatHeader from "../components/ChatHeader";
import useChat from "../hooks/useChat";
import useConversations from "../hooks/useConversations";
import { useAppDispatch } from "@/shared/hooks";
import { setActiveConversation, setMessages } from "../state/conversationSlice";
import type { Conversation } from "../types/conversation.types";

export default function ChatPage() {
  const dispatch = useAppDispatch();
  const chat = useChat();
  const { loadConversations, selectConversation } = useConversations();
  const { conversationId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      const conversations = await loadConversations();

      if (conversations.length === 0) return;

      if (conversationId) {
        const conversation = conversations.find(
          (c: Conversation) => c._id === conversationId
        );

        if (conversation) {
          await selectConversation(conversation);
          return;
        }
      } else {
        dispatch(setActiveConversation(null));
        dispatch(setMessages([]));
      }
    };

    init();
  }, [loadConversations, conversationId, selectConversation, navigate, dispatch]);

  return (
    <div className="h-full max-w-5xl mx-auto flex flex-col">
      <ChatHeader />

      <div className="flex-1 flex flex-col min-h-0">
        <ChatWindow
          messages={chat.messages}
          loadingHistory={chat.loadingHistory}
          generating={chat.generating}
          streaming={chat.streaming}
        />
        <ChatInput
          sendMessage={chat.sendMessage}
          loading={chat.generating || chat.loadingHistory}
        />
      </div>
    </div>
  );
}
