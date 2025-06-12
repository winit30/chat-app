export type User = {
  id: number;
  name: string;
  image?: string;
  status?: string;
};

export type Drafts = Record<number, string>;

export type Draft = {
  id: number;
  message: string;
};

export interface UserSlice {
  users: User[];
  onlineUserIds: string[];
  drafts: Record<number, string>;
  activeUser: User | null;
  setUsers: (users: User[]) => void;
  setActiveUser: (user: User) => void;
  setOnlineUserIds: (ids: string[]) => void;
  markUserOnline: (id: string) => void;
  markUserOffline: (id: string) => void;
  updateDraftForActiveUser: (d: Draft) => void;
}

export const createUserSlice = (
  set: (fn: (state: UserSlice) => Partial<UserSlice>) => void
): UserSlice => ({
  users: [],
  onlineUserIds: [],
  activeUser: null,
  drafts: {},
  setUsers: (users) => set(() => ({ users })),
  setActiveUser: (user) => set(() => ({ activeUser: user })),
  updateDraftForActiveUser: (d) => {
    set((state) => ({
      drafts: {
        ...state.drafts,
        [d.id]: d.message,
      },
    }));
  },
  setOnlineUserIds: (ids) => set(() => ({ onlineUserIds: ids })),
  markUserOnline: (id) =>
    set((state) => ({
      onlineUserIds: [...new Set([...state.onlineUserIds, id])],
    })),
  markUserOffline: (id) =>
    set((state) => ({
      onlineUserIds: state.onlineUserIds.filter((uid) => uid !== id),
    })),
});
