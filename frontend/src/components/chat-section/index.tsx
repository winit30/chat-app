import type { Draft, Drafts, User } from "@/store/userSlice";
import ChatSidebar from "./ChatSidebar";
import ChatWindow from "./ChatWindow";
import type { Message } from "@/store/chatSlice";

type ChatSectionProps = {
  users: User[];
  meId: number;
  onUserSelect: (user: User) => void;
  activeUser: User | null;
  onlineUserIds: string[];
  sendMessage: (content: string) => void;
  activeUserMessages: Message[];
  unseenCounts: Record<string, number>;
  updateDraftForActiveUser: (d: Draft) => void;
  drafts: Drafts;
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
  updateDraftForActiveUser,
  drafts,
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
        updateDraftForActiveUser={updateDraftForActiveUser}
        sendMessage={sendMessage}
        activeUserMessages={activeUserMessages}
        isUserOnline={
          activeUser && activeUser.id
            ? onlineUserIds.includes(`${activeUser.id}`)
            : false
        }
        drafts={drafts}
      />
    </div>
  );
}
