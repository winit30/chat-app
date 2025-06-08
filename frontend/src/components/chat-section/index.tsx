import type { User } from "@/store/userSlice";
import ChatSidebar from "./ChatSidebar";
import ChatWindow from "./ChatWindow";
import type { Message } from "@/store/chatSlice";

type ChatSectionProps = {
  users: User[];
  meId: number;
  onUserSelect: (userId: number) => void;
  activeUser: User | null;
  onlineUserIds: string[];
  sendMessage: (content: string) => void;
  activeUserMessages: Message[];
  unseenCounts: Record<string, number>;
};

export default function ChatSection({
  meId,
  users,
  onUserSelect,
  activeUser,
  onlineUserIds,
  sendMessage,
  activeUserMessages,
  unseenCounts,
}: ChatSectionProps) {
  return (
    <div className="flex flex-1 flex-row">
      <ChatSidebar
        users={users}
        onUserSelect={onUserSelect}
        activeUserId={activeUser ? activeUser.id : null}
        onlineUserIds={onlineUserIds}
        unseenCounts={unseenCounts}
      />
      <ChatWindow
        meId={meId}
        user={activeUser}
        sendMessage={sendMessage}
        activeUserMessages={activeUserMessages}
        isUserOnline={
          activeUser && activeUser.id
            ? onlineUserIds.includes(`${activeUser.id}`)
            : false
        }
      />
    </div>
  );
}
