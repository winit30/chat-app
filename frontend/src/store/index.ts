import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createChatSlice, type ChatSlice } from "./chatSlice";
import { createUserSlice, type UserSlice } from "./userSlice";
import { createProfileSlice, type ProfileSlice } from "./profileSlice";

const PERSIST_APP_STORE = true;

export type AppState = ChatSlice & UserSlice & ProfileSlice;

const combineSlices = (
  set: (
    partial: Partial<AppState> | ((state: AppState) => Partial<AppState>)
  ) => void,
  get: () => AppState
): AppState => ({
  ...createChatSlice(set, get),
  ...createUserSlice(set),
  ...createProfileSlice(set),
});

export const useStore = create<AppState>()(
  PERSIST_APP_STORE
    ? persist<AppState>(combineSlices, {
        name: "app-storage",
        storage: createJSONStorage(() => sessionStorage),
      })
    : combineSlices
);
