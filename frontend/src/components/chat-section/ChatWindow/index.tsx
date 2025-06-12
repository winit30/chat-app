import type { Draft, Drafts, User } from "@/store/userSlice";
import ChatForm from "./ChatForm";
import ChatHeader from "./ChatHeader";
import ChatThread from "./ChatThread";
import type { Message } from "@/store/chatSlice";

type ChatWindowProps = {
  meId: number;
  user: User | null;
  isUserOnline: boolean;
  sendMessage: (content: string) => void;
  activeUserMessages: Message[];
  updateDraftForActiveUser: (d: Draft) => void;
  drafts: Drafts;
};

export default function ChatWindow({
  meId,
  user,
  isUserOnline,
  sendMessage,
  activeUserMessages,
  updateDraftForActiveUser,
  drafts,
}: ChatWindowProps) {
  console.log(user);
  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-64px)]">
      {user ? (
        <>
          <ChatHeader user={user} isUserOnline={isUserOnline} />
          <ChatThread meId={meId} activeUserMessages={activeUserMessages} />
          <ChatForm
            sendMessage={sendMessage}
            user={user}
            updateDraftForActiveUser={updateDraftForActiveUser}
            drafts={drafts}
          />
        </>
      ) : (
        <div className="flex flex-1 justify-center items-center flex-col bg-slate-50">
          <h3 className="text-6xl font-black mb-8">CHAT APP</h3>
          <h3 className="text-4xl font-bold mb-2">
            Connect Instantly. Talk Freely.
          </h3>
          <p className="text-2xl">Chat that just works — beautifully.</p>
        </div>
      )}
    </div>
  );
}
