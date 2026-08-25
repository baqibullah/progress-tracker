import DashboardClient from "@/components/DashboardClient";
import MonthNav from "@/components/MonthNav";
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
  searchParams,
}: {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ month?: string }>;
}) {
  const { username } = await params;
  const { month: monthParam } = await searchParams;

  let yearArg: number | undefined;
  let monthArg: number | undefined;

  if (monthParam && /^\d{4}-\d{2}$/.test(monthParam)) {
    const [y, m] = monthParam.split("-").map(Number);
    yearArg = y;
    monthArg = m - 1;
  }

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
  } = await getGridData(profile.id, yearArg, monthArg);

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
      <MonthNav year={year} month={month} />

      <div className="mb-8">
        <StatsBar completionPct={completionPct} currentStreak={currentStreak} />
      </div>

      <DashboardClient
        weeks={weeks}
        year={year}
        month={month}
        completionByDate={completionByDate}
        chartData={chartData}
        templates={templates}
        completions={completions}
        variant="readonly"
      />
    </main>
  );
}
