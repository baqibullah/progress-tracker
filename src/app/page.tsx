import CompletionChart from "@/components/CompletionChart";
import GoalGridClient from "@/components/GoalGridClient";
import HomeHeader from "@/components/HomeHeader";
import MonthHeatmap from "@/components/MonthHeatmap";
import StatsBar from "@/components/StatsBar";
import { getMonthWeeksStrict } from "@/lib/dateUtils";
import { computeCompletionByDate } from "@/lib/stats";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
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

  const { data: templates } = await supabase
    .from("goal_templates")
    .select("id, title")
    .eq("user_id", user.id)
    .order("created_at");

  const { data: completions } = await supabase
    .from("completions")
    .select("goal_template_id, date, is_completed")
    .eq("user_id", user.id);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const weeks = getMonthWeeksStrict(year, month);

  const mappedCompletions = (completions ?? []).map((c) => ({
    goalId: c.goal_template_id,
    date: c.date,
    isCompleted: c.is_completed,
  }));

  const completionByDate = computeCompletionByDate(
    templates ?? [],
    mappedCompletions,
  );

  const completionPct =
    Object.values(completionByDate).length > 0
      ? Math.round(
          (Object.values(completionByDate).reduce((a, b) => a + b, 0) /
            Object.values(completionByDate).length) *
            100,
        )
      : 0;

  const chartData = Object.entries(completionByDate)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, ratio]) => ({ date, completion: Math.round(ratio * 100) }));

  return (
    <main className="mx-auto max-w-6xl px-8 py-12">
      <HomeHeader username={profile?.username ?? "Unknown"} />

      <h1 className="font-display text-3xl text-ink">Progress</h1>
      <p className="mb-8 text-sm text-ink/50">
        {today.toLocaleString("default", { month: "long", year: "numeric" })}
      </p>

      <div className="mb-8">
        <StatsBar completionPct={completionPct} currentStreak={0} />
      </div>

      <div className="mb-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
        <CompletionChart data={chartData} />
        <MonthHeatmap
          year={year}
          month={month}
          completionByDate={completionByDate}
        />
      </div>

      <GoalGridClient
        initialTemplates={templates ?? []}
        initialCompletions={mappedCompletions}
        weeks={weeks}
      />
    </main>
  );
}
