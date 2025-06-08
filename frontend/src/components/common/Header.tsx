import { Link } from "react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { User } from "@/store/userSlice";

type HeaderPropsType = {
  profile: User | Record<string, number>;
};
const Header = ({ profile }: HeaderPropsType) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!profile?.id);
  }, [profile]);

  return (
    <header className="w-full bg-white shadow-xs">
      <div className="flex items-center justify-between px-4 py-3">
        <Link to="/" className="text-xl font-bold text-primary">
          Chat App
        </Link>

        <nav className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <div className="text-sm font-medium text-black hover:text-primary flex items-center gap-2">
                Hi {profile?.name}
                <span className="w-[8px] h-[8px] rounded-full block bg-green-700" />
              </div>
              <Button variant="outline">Logout</Button>
            </>
          ) : (
            <>
              <Link
                to="#"
                className="text-sm font-medium text-muted-foreground hover:text-primary"
              >
                Login
              </Link>
              <Link to="#">
                <Button>Register</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
      <Separator />
    </header>
  );
};

export default Header;
