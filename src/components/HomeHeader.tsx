import { logout } from "@/app/login/actions";

export default function HomeHeader({ username }: { username: string }) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <p className="text-sm text-ink/50">
        Signed in as <span className="text-ink">{username}</span>
      </p>
      <form action={logout}>
        <button type="submit" className="text-sm text-ink/50 hover:text-ink">
          Log out
        </button>
      </form>
    </div>
  );
}
