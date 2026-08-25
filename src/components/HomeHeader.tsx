import { logout } from "@/app/login/actions";
import UserSwitcher from "./UserSwitcher";

interface Profile {
  id: string;
  username: string;
}

export default function HomeHeader({
  username,
  profiles,
}: {
  username: string;
  profiles: Profile[];
}) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <p className="text-sm text-ink/50">
          Signed in as <span className="text-ink">{username}</span>
        </p>
        <UserSwitcher profiles={profiles} currentUsername={username} />
      </div>
      <form action={logout}>
        <button type="submit" className="text-sm text-ink/50 hover:text-ink">
          Log out
        </button>
      </form>
    </div>
  );
}
