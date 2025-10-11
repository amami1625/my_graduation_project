"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { LoginFormData } from "@/schemas/auth";
import { createServerSupabaseClient } from "@/supabase/clients/server";

export async function loginAction(formData: LoginFormData) {
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase.auth.signInWithPassword(formData);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/top");
}

export async function logoutAction() {
  const supabase = await createServerSupabaseClient();

  await supabase.auth.signOut();

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signUpAction(
  name: string,
  email: string,
  password: string
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
  redirect("/top");
}
