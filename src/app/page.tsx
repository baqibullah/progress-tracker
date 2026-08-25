import CompletionChart from "@/components/CompletionChart";
import GoalGridClient from "@/components/GoalGridClient";
import HomeHeader from "@/components/HomeHeader";
import MonthHeatmap from "@/components/MonthHeatmap";
import StatsBar from "@/components/StatsBar";
import { getGridData } from "@/lib/getGridData";
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

  const {
    templates,
    completions,
    weeks,
    year,
    month,
    completionByDate,
    completionPct,
    chartData,
  } = await getGridData(user.id);

  return (
    <main className="mx-auto max-w-6xl px-8 py-12">
      <HomeHeader username={profile?.username ?? "Unknown"} />

      <h1 className="font-display text-3xl text-ink">Progress</h1>
      <p className="mb-8 text-sm text-ink/50">
        {new Date(year, month).toLocaleString("default", {
          month: "long",
          year: "numeric",
        })}
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
        weeks={weeks}
        initialTemplates={templates}
        initialCompletions={completions}
      />
    </main>
  );
}
