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

  const loadConversations = useCallback(async () => {
    dispatch(setLoading(true));

    try {
      const data = await getConversations();
      dispatch(setConversations(data));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const selectConversation = useCallback(
    async (conversation: Conversation) => {
      dispatch(setActiveConversation(conversation));
      dispatch(setLoading(true));

      try {
        const data = await getMessages(conversation._id);
        dispatch(setMessages(data));
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  const createNewConversation = useCallback(async () => {
    dispatch(setLoading(true));

    try {
      const conversation = await createConversation();

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

  return {
    conversations,
    activeConversation,
    messages,
    loading,
    loadConversations,
    selectConversation,
    createNewConversation,
  };
}