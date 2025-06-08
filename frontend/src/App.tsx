import ChatSection from "./components/chat-section";
import Header from "./components/common/Header";
import AuthModal from "./components/auth-modal";
import useChat from "./hooks/useChat";
import { cn } from "./lib/utils";
import { Toaster } from "sonner";

function App() {
  const {
    onChatLogin,
    sendMessage,
    onUserSelectForChat,
    me,
    users,
    activeUser,
    onlineUserIds,
    activeUserMessages,
    unseenCounts,
  } = useChat();

  return (
    <div className="min-h-screen flex flex-col max-w-7xl mx-auto border-l-1 border-r-1 ">
      <div className={cn("flex flex-1 flex-col", !me?.id && "blur-xs")}>
        <Header profile={me} />
        <ChatSection
          meId={me.id}
          users={users}
          onUserSelect={onUserSelectForChat}
          activeUser={activeUser}
          onlineUserIds={onlineUserIds}
          sendMessage={sendMessage}
          activeUserMessages={activeUserMessages}
          unseenCounts={unseenCounts}
        />
      </div>
      <AuthModal onChatLogin={onChatLogin} open={!me?.id} />
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
