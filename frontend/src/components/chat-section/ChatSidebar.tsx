import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

import type { User } from "@/store/userSlice";

type ChatSidebarProps = {
  users: User[];
  onUserSelect: (user: User) => void;
  activeUserId: number | null;
  onlineUserIds: string[];
  unseenCounts: Record<string, number>;
};

export default function ChatSidebar({
  users,
  onUserSelect,
  activeUserId,
  onlineUserIds,
  unseenCounts,
}: ChatSidebarProps) {
  function isActiveUser(userId: number) {
    if (userId === activeUserId) return true;
    return false;
  }

  function isUserOnline(id: number) {
    return onlineUserIds.includes(`${id}`);
  }

  function handleSelectUserForChat(user: User) {
    onUserSelect(user);
  }

  return (
    <div className="w-[300px] border-r-1">
      {users.length > 0 ? (
        users.map((user: User) => {
          return (
            <div
              className={cn(
                "border-b-1 py-3 px-4 flex items-center gap-4 cursor-pointer",
                isActiveUser(user.id) ? "bg-slate-100" : "hover:bg-slate-50"
              )}
              key={user.id}
              onClick={handleSelectUserForChat.bind(null, user)}
            >
              <img
                src={user.image}
                alt="profile image"
                className="w-[40px] h-[40px] rounded-full"
              />
              <div className="flex flex-1 justify-between items-center gap-2">
                {user.name}{" "}
                {unseenCounts[user.id] > 0 && (
                  <span className="ml-auto bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                    {unseenCounts[user.id]}
                  </span>
                )}
                <div
                  className={cn(
                    "w-[8px] h-[8px] rounded-full ",
                    isUserOnline(user.id) ? "bg-green-700" : "bg-red-700"
                  )}
                />
              </div>
            </div>
          );
        })
      ) : (
        <>
          {Array.from({ length: 10 }).map(() => {
            return (
              <div className={"border-b-1 py-3 px-4 flex items-center gap-4"}>
                <Skeleton className="w-[40px] h-[40px] rounded-full" />
                <Skeleton className="w-[200px] h-[40px]" />
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
