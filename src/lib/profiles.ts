import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function getAllProfiles() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data } = await supabase
    .from("profiles")
    .select("id, username")
    .order("username");

  return data ?? [];
}
