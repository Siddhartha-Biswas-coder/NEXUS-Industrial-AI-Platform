import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";
import ChatHeader from "../components/ChatHeader";
import useChat from "../hooks/useChat";
import useConversations from "../hooks/useConversations";
import { useAppDispatch } from "@/shared/hooks";
import { setActiveConversation, setMessages } from "../state/conversationSlice";
import type { Conversation } from "../types/conversation.types";
import DocumentSelector from "../components/DocumentSelector";
import { updateConversationDocuments } from "../services/conversation.service";
import { setActiveDocuments } from "../state/conversationSlice";

export default function ChatPage() {
  const dispatch = useAppDispatch();
  const chat = useChat();
  const { loadConversations, selectConversation } = useConversations();
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [draftActiveDocuments, setDraftActiveDocuments] = useState<string[] | null>(null);

  useEffect(() => {
    const init = async () => {
      const conversations = await loadConversations();

      if (conversations.length === 0) return;

      if (conversationId) {
        const conversation = conversations.find(
          (c: Conversation) => c._id === conversationId,
        );

        if (conversation) {
          await selectConversation(conversation);
          setDraftActiveDocuments(null);
          return;
        }
      } else {
        dispatch(setActiveConversation(null));
        dispatch(setMessages([]));
        setDraftActiveDocuments(null);
      }
    };

    init();
  }, [
    loadConversations,
    conversationId,
    selectConversation,
    navigate,
    dispatch,
  ]);

  const activeDocumentsList = chat.activeConversation
    ? chat.activeConversation.activeDocuments
        ?.map((doc) => (typeof doc === "string" ? doc : doc._id))
        .filter((id): id is string => Boolean(id)) ?? []
    : draftActiveDocuments ?? [];

  const activeCount = chat.activeConversation
    ? chat.activeConversation.activeDocuments?.length ?? 0
    : draftActiveDocuments
    ? draftActiveDocuments.length
    : 0;

  return (
    <div className="h-full max-w-5xl mx-auto flex flex-col">
      <ChatHeader
        onOpenSources={() => setSelectorOpen(true)}
        activeCount={activeCount}
      />

      <div className="flex-1 flex flex-col min-h-0 gap-3">
        <ChatWindow
          messages={chat.messages}
          loadingHistory={chat.loadingHistory}
          generating={chat.generating}
          streaming={chat.streaming}
        />
        <ChatInput
          sendMessage={chat.sendMessage}
          loading={chat.generating || chat.loadingHistory}
          draftActiveDocuments={draftActiveDocuments}
        />
        <DocumentSelector
          open={selectorOpen}
          onClose={() => setSelectorOpen(false)}
          selected={activeDocumentsList}
          onSave={async (documentIds) => {
            if (chat.activeConversation) {
              const updatedConversation = await updateConversationDocuments(
                chat.activeConversation._id,
                documentIds,
              );

              dispatch(
                setActiveDocuments({
                  conversationId: chat.activeConversation._id,
                  activeDocuments: updatedConversation.activeDocuments,
                }),
              );
            } else {
              setDraftActiveDocuments(documentIds);
            }
          }}
        />
      </div>
    </div>
  );
}

