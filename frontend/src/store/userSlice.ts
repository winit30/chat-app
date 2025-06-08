export type User = {
  id: number;
  name: string;
  image?: string;
  status?: string;
};

export interface UserSlice {
  users: User[];
  onlineUserIds: string[];
  activeUserId: number | null;
  setUsers: (users: User[]) => void;
  setActiveUser: (userId: number) => void;
  setOnlineUserIds: (ids: string[]) => void;
  markUserOnline: (id: string) => void;
  markUserOffline: (id: string) => void;
}

export const createUserSlice = (
  set: (fn: (state: UserSlice) => Partial<UserSlice>) => void
): UserSlice => ({
  users: [],
  onlineUserIds: [],
  activeUserId: null,

  setUsers: (users) => set(() => ({ users })),
  setActiveUser: (userId) => set(() => ({ activeUserId: userId })),
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
