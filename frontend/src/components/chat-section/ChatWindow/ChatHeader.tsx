import { cn } from "@/lib/utils";
import type { User } from "@/store/userSlice";

type ChatHeaderProps = {
  user: User;
  isUserOnline: boolean;
};

export default function ChatHeader({ user, isUserOnline }: ChatHeaderProps) {
  return (
    <div
      className={cn(
        "border-b-1 py-3 px-4 flex items-center gap-4 bg-slate-100"
      )}
    >
      <img
        src={user.image}
        alt="profile image"
        className="w-[40px] h-[40px] rounded-full"
      />
      <div className="flex flex-1 justify-between items-center">
        {user.name}{" "}
        <div
          className={cn(
            "w-[8px] h-[8px] rounded-full ",
            isUserOnline ? "bg-green-700" : "bg-red-700"
          )}
        />
      </div>
    </div>
  );
}
