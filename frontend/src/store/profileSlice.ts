export type User = {
  id: number;
  name: string;
  image?: string;
  status?: string;
};

export interface ProfileSlice {
  me: User | Record<string, number>;
  setme: (me: User) => void;
}

export const createProfileSlice = (
  set: (fn: (state: ProfileSlice) => Partial<ProfileSlice>) => void
): ProfileSlice => ({
  me: {},
  setme: (me) => set(() => ({ me })),
});
