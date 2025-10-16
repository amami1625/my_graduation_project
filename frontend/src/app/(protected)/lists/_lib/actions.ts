"use server";

import { authenticatedRequest } from "@/supabase/dal";
import { ListFormData } from "../_types";
import { revalidatePath } from "next/cache";

export async function createList(
  formData: ListFormData
): Promise<{ success: true } | { error: string }> {
  try {
    await authenticatedRequest("/lists", {
      method: "POST",
      body: JSON.stringify({ list: formData }),
    });

    revalidatePath("/lists");
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "不明なエラーが発生しました" };
    }
  }
}
