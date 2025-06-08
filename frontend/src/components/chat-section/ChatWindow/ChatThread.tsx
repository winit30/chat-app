import { cn } from "@/lib/utils";
import type { Message } from "@/store/chatSlice";
import { useEffect, useRef } from "react";

type ChatThreadPorpTypes = {
  activeUserMessages: Message[];
  meId: number;
};

export default function ChatThread({
  activeUserMessages,
  meId,
}: ChatThreadPorpTypes) {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeUserMessages]);

  return (
    <div className=" flex-col  p-4 flex flex-1 overflow-y-auto">
      {activeUserMessages &&
        activeUserMessages.map((message) => {
          const isSender = message.senderId === meId;
          return (
            <div
              className={cn(
                "p-2 px-4 bg-blue-100 mb-4 w-fit rounded-md max-w-[75%]",
                isSender && "bg-red-100 self-end"
              )}
            >
              {message.content}
            </div>
          );
        })}
      <div ref={messagesEndRef} />
    </div>
  );
}
