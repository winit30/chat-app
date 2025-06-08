import { useEffect, useMemo } from "react";
import { socket } from "@/lib/socket";
import { useStore } from "@/store";
import type { User } from "@/store/userSlice";
import { toast } from "sonner";
import { debounce } from "lodash";
import type { Message } from "@/store/chatSlice";

export type LoginArgTypes = {
  payload: {
    name: string;
    email: string;
    image: string;
  };
};
export default function useChat() {
  const setme = useStore((state) => state.setme);
  const setUsers = useStore((state) => state.setUsers);
  const setActiveUser = useStore((state) => state.setActiveUser);
  const markUserOnline = useStore((state) => state.markUserOnline);
  const markUserOffline = useStore((state) => state.markUserOffline);
  const setOnlineUserIds = useStore((state) => state.setOnlineUserIds);
  const addMessage = useStore((state) => state.addMessage);
  const getMessagesWithUser = useStore((state) => state.getMessagesWithUser);
  const markMessagesSeen = useStore((state) => state.markMessagesSeen);

  const me = useStore((state) => state.me);
  const users = useStore((state) => state.users);
  const activeUserId = useStore((state) => state.activeUserId);
  const onlineUserIds = useStore((state) => state.onlineUserIds);
  const unseenCounts = useStore((state) => state.unseenCounts);

  const activeUser: User | null =
    users.find((u: User) => u.id === activeUserId) || null;

  function onUserSelectForChat(userId: number) {
    setActiveUser(userId);
    markMessagesSeen(userId);
  }

  async function fetchMe() {
    return await fetch("http://localhost:3001/api/me", {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      method: "GET",
    });
  }

  async function fetchUserList() {
    const usersResponse = await fetch("http://localhost:3001/api/users", {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      method: "GET",
    });

    if (usersResponse.ok) {
      const data = await usersResponse.json();
      if (data && data.length) {
        setUsers(data);
      }
    }
  }

  const debouncedFetchUsers = useMemo(
    () => debounce(() => fetchUserList(), 300),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  async function fetchInitials() {
    let myProfile;
    const response = await fetchMe();
    if (response.ok) {
      const data = await response.json();
      if (data) {
        myProfile = data;
      } else {
        return;
      }
    }

    if (myProfile) {
      await debouncedFetchUsers();
      setme(myProfile);
    }
  }

  async function onChatLogin({ payload }: LoginArgTypes) {
    const response = await fetch("http://localhost:3001/api/users/", {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      fetchInitials();
    }
  }

  function sendMessage(content: string) {
    if (!me?.id || !activeUserId) return;

    const msg = {
      id: crypto.randomUUID(),
      senderId: me.id,
      receiverId: activeUserId,
      content,
      timestamp: Date.now(),
    };

    socket.emit("message:send", msg);
    addMessage(msg, me.id);
  }

  useEffect(() => {
    fetchInitials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (me?.id && !socket.connected) {
      socket.connect();
      socket.emit("user:register", me.id);
    }

    return () => {
      socket.disconnect();
    };
  }, [me?.id]);

  useEffect(() => {
    socket.on("users:online", (ids: string[]) => {
      setOnlineUserIds(ids);
    });

    socket.on("user:joined", ({ userId }) => {
      toast(`👤 user joined: ${userId}`);
      markUserOnline(userId);
      debouncedFetchUsers();
    });

    socket.on("user:left", ({ userId }) => {
      toast(`👤 user left: ${userId}`);
      markUserOffline(userId);
    });

    return () => {
      socket.off("users:online");
      socket.off("user:joined");
      socket.off("user:left");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!me?.id) return;

    const handler = (msg: Message) => {
      addMessage(msg, me.id);
    };

    socket.on("message:receive", handler);

    return () => {
      socket.off("message:receive", handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me?.id]);

  const filteredUsers = useMemo(
    () => users.filter((u) => u.id !== me?.id),
    [users, me?.id]
  );

  return {
    me,
    users: filteredUsers,
    activeUser,
    onlineUserIds,
    activeUserMessages: activeUserId ? getMessagesWithUser(activeUserId) : [],
    unseenCounts,
    onChatLogin,
    onUserSelectForChat,
    sendMessage,
  };
}
