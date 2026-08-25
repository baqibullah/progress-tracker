import CompletionChart from "@/components/CompletionChart";
import GoalGrid from "@/components/GoalGrid";
import MonthHeatmap from "@/components/MonthHeatmap";
import StatsBar from "@/components/StatsBar";
import UserSwitcher from "@/components/UserSwitcher";
import { getGridData } from "@/lib/getGridData";
import { getAllProfiles } from "@/lib/profiles";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export default async function UserGridPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: viewerProfile } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .single();

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, username")
    .eq("username", username)
    .single();

  if (!profile) notFound();

  const {
    templates,
    completions,
    weeks,
    year,
    month,
    completionByDate,
    completionPct,
    chartData,
    currentStreak,
  } = await getGridData(profile.id);

  const profiles = await getAllProfiles();

  return (
    <main className="mx-auto max-w-6xl px-8 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <p className="text-sm text-ink/50">
            Viewing <span className="text-ink">{profile.username}</span>'s
            progress
          </p>
          <UserSwitcher
            profiles={profiles}
            currentUsername={viewerProfile?.username ?? profile.username}
          />
        </div>
        <Link href="/" className="text-sm text-ink/50 hover:text-ink">
          Back to your grid
        </Link>
      </div>
      <h1 className="font-display text-3xl text-ink">Progress</h1>
      <p className="mb-8 text-sm text-ink/50">
        {new Date(year, month).toLocaleString("default", {
          month: "long",
          year: "numeric",
        })}
      </p>
      <div className="mb-8">
        <StatsBar completionPct={completionPct} currentStreak={currentStreak} />
      </div>
      <div className="mb-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
        <CompletionChart data={chartData} />
        <MonthHeatmap
          year={year}
          month={month}
          completionByDate={completionByDate}
        />
      </div>
      <GoalGrid
        templates={templates}
        weeks={weeks}
        isDone={(goalId, date) =>
          completions.find((c) => c.goalId === goalId && c.date === date)
            ?.isCompleted ?? false
        }
        readOnly
      />
    </main>
  );
}
