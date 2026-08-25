"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function toggleCompletion(goalTemplateId: string, date: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data: existing } = await supabase
    .from("completions")
    .select("id, is_completed")
    .eq("goal_template_id", goalTemplateId)
    .eq("date", date)
    .eq("user_id", user.id)
    .maybeSingle();

  if (existing) {
    await supabase
      .from("completions")
      .update({
        is_completed: !existing.is_completed,
        completed_at: !existing.is_completed ? new Date().toISOString() : null,
      })
      .eq("id", existing.id);
  } else {
    await supabase.from("completions").insert({
      goal_template_id: goalTemplateId,
      user_id: user.id,
      date,
      is_completed: true,
      completed_at: new Date().toISOString(),
    });
  }

  revalidatePath("/");
}

export async function addGoalTemplate(title: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");
  const { data, error } = await supabase
    .from("goal_templates")
    .insert({ user_id: user.id, title })
    .select("id, title")
    .single();
  if (error) throw error;
  revalidatePath("/");
  return data;
}
