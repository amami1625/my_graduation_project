"use server";

import { createServerSupabaseClient } from "@/supabase/clients/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signUpAction(
  name: string,
  email: string,
  password: string,
) {
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: name || "",
      },
    },
  });

  if (error) {
    return { error: "登録に失敗しました。入力内容を確認してください。" };
  }

  revalidatePath("/", "layout");
  redirect("/");
}
