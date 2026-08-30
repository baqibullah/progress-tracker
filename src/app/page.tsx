import DashboardClient from "@/components/DashboardClient";
import HomeHeader from "@/components/HomeHeader";
import MonthNav from "@/components/MonthNav";
import StatsBar from "@/components/StatsBar";
import { getGridData } from "@/lib/getGridData";
import { getAllProfiles } from "@/lib/profiles";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ month?: string }>;
}) {
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

  const { data: profile } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .single();

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
  } = await getGridData(user.id, yearArg, monthArg);

  const profiles = await getAllProfiles();

  return (
    <main className="mx-auto max-w-[1600px] px-8 py-12">
      <HomeHeader
        username={profile?.username ?? "Unknown"}
        profiles={profiles}
      />

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
        variant="editable"
      />
    </main>
  );
}
