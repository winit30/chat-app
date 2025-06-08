import type { UserSlice } from "./userSlice";

export type Message = {
  id: string;
  senderId: number;
  receiverId: number;
  content: string;
  timestamp: number;
};

export interface ChatSlice {
  messagesByUser: Record<string, Message[]>;
  unseenCounts: Record<string, number>;
  addMessage: (msg: Message, meId: number) => void;
  getMessagesWithUser: (userId: number) => Message[];
  markMessagesSeen: (userId: number) => void;
}

export function createChatSlice(
  set: (
    partial: Partial<ChatSlice> | ((state: ChatSlice) => Partial<ChatSlice>)
  ) => void,
  get: () => ChatSlice & UserSlice
): ChatSlice {
  return {
    messagesByUser: {},
    unseenCounts: {},
    addMessage: (msg, meId) =>
      set((state) => {
        const otherUserId =
          msg.senderId === meId ? msg.receiverId : msg.senderId;
        const isFromOther = msg.senderId !== meId;
        const shouldCountAsUnseen =
          isFromOther && get().activeUserId !== otherUserId;

        const existing = state.messagesByUser[otherUserId] || [];
        return {
          messagesByUser: {
            ...state.messagesByUser,
            [otherUserId]: [...existing, msg],
          },
          unseenCounts: {
            ...state.unseenCounts,
            ...(shouldCountAsUnseen
              ? {
                  [otherUserId]: (state.unseenCounts[otherUserId] || 0) + 1,
                }
              : {
                  [otherUserId]: 0,
                }),
          },
        };
      }),

    getMessagesWithUser: (userId) => get().messagesByUser[userId] || [],
    markMessagesSeen: (userId) =>
      set((state) => ({
        unseenCounts: {
          ...state.unseenCounts,
          [userId]: 0,
        },
      })),
  };
}
