import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";

import {
  setConversations,
  setActiveConversation,
  setMessages,
  setLoadingHistory,
} from "../state/conversationSlice";

import {
  createConversation,
  deleteConversation,
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
    loadingHistory,
    generating,
    streaming,
  } = useAppSelector((state) => state.conversation);

  const loadConversations = useCallback(
    async () => {
      dispatch(setLoadingHistory(true));

      try {
        const conversations = await getConversations();

        dispatch(setConversations(conversations));

        return conversations;
      } finally {
        dispatch(setLoadingHistory(false));
      }
    }, [dispatch]);

  const selectConversation = useCallback(
    async (conversation: Conversation) => {
      dispatch(setActiveConversation(conversation))

      dispatch(setLoadingHistory(true));

      try {
        const messages = await getMessages(conversation._id);

        dispatch(setMessages(messages));
      } finally {
        dispatch(setLoadingHistory(false));
      }
    },
    [dispatch]
  );

  const createNewConversation = useCallback(async (title?: string) => {
    dispatch(setLoadingHistory(true));

    try {
      const conversation = await createConversation(title);

      dispatch(
        setConversations([conversation, ...conversations])
      );

      dispatch(setActiveConversation(conversation));

      dispatch(setMessages([]));

      return conversation;
    } finally {
      dispatch(setLoadingHistory(false));
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

  const deleteConversationById = useCallback(
    async (conversationId: string) => {
      await deleteConversation(conversationId);

      const updatedConversations = conversations.filter(
        (conversation) => conversation._id !== conversationId
      )

      dispatch(setConversations(updatedConversations));

      if (activeConversation?._id === conversationId) {
        dispatch(setActiveConversation(null));
        dispatch(setMessages([]));
      }

      return updatedConversations
    },
    [dispatch, conversations, activeConversation]
  )

  return {
    conversations,
    activeConversation,
    messages,
    loading: loadingHistory,
    loadingHistory,
    generating,
    streaming,
    loadConversations,
    selectConversation,
    createNewConversation,
    renameConversationById,
    deleteConversationById
  };
}