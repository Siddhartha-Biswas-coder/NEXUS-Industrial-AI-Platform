import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";

import {
  setConversations,
  setActiveConversation,
  setMessages,
  setLoading,
} from "../state/conversationSlice";

import {
  createConversation,
  getConversations,
  getMessages,
  renameConversation,
} from "../services/conversation.service";

import type { Conversation } from "../types/conversation.types";

export default function useConversations() {
  const dispatch = useAppDispatch();

  const {
    conversations,
    activeConversation,
    messages,
    loading,
  } = useAppSelector((state) => state.conversation);

  const loadConversations = useCallback(
    async () => {
      dispatch(setLoading(true));

      try {
        const conversations = await getConversations();

        dispatch(setConversations(conversations));

        return conversations;
      } finally {
        dispatch(setLoading(false));
      }
    }, [dispatch]);

  const selectConversation = useCallback(
    async (conversation: Conversation) => {
      dispatch(setActiveConversation(conversation))

      dispatch(setLoading(true));

      try {
        const messages = await getMessages(conversation._id);

        dispatch(setMessages(messages));
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  const createNewConversation = useCallback(async (title?: string) => {
    dispatch(setLoading(true));

    try {
      const conversation = await createConversation(title);

      dispatch(
        setConversations([conversation, ...conversations])
      );

      dispatch(setActiveConversation(conversation));

      dispatch(setMessages([]));

      return conversation;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, conversations]);

  const renameConversationById = useCallback(
    async (conversationId: string, title: string) => {
      const updated = await renameConversation(conversationId, title);

      dispatch(
        setConversations(
          conversations.map((conversation) =>
            conversation._id === conversationId
              ? updated
              : conversation
          )
        )
      )

      if (activeConversation?._id === conversationId) {
        dispatch(setActiveConversation(updated))
      }

      return updated
    },
    [dispatch, conversations, activeConversation]
  )

  return {
    conversations,
    activeConversation,
    messages,
    loading,
    loadConversations,
    selectConversation,
    createNewConversation,
    renameConversationById
  };
}