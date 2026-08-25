import { getMonthWeeksStrict } from "@/lib/dateUtils";
import { computeCompletionByDate, computeCurrentStreak } from "@/lib/stats";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function getGridData(
  userId: string,
  yearParam?: number,
  monthParam?: number,
) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: templates } = await supabase
    .from("goal_templates")
    .select("id, title")
    .eq("user_id", userId)
    .order("created_at");

  const { data: completions } = await supabase
    .from("completions")
    .select("goal_template_id, date, is_completed")
    .eq("user_id", userId);

  const today = new Date();
  const year = yearParam ?? today.getFullYear();
  const month = monthParam ?? today.getMonth();
  const weeks = getMonthWeeksStrict(year, month);

  const mappedCompletions = (completions ?? []).map((c) => ({
    goalId: c.goal_template_id,
    date: c.date,
    isCompleted: c.is_completed,
  }));

  const currentStreak = computeCurrentStreak(mappedCompletions);

  const monthPrefix = `${year}-${String(month + 1).padStart(2, "0")}`;
  const monthCompletions = mappedCompletions.filter((c) =>
    c.date.startsWith(monthPrefix),
  );

  const completionByDate = computeCompletionByDate(
    templates ?? [],
    monthCompletions,
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

  return {
    templates: templates ?? [],
    completions: monthCompletions,
    weeks,
    year,
    month,
    completionByDate,
    completionPct,
    chartData,
    currentStreak,
  };
}
