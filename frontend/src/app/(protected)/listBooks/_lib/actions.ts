"use server";

import { authenticatedRequest } from "@/supabase/dal";
import { revalidatePath } from "next/cache";
import { ListBookFormData } from "../_types";

export async function addListBook(
  formData: ListBookFormData
): Promise<{ success: true } | { error: string }> {
  try {
    await authenticatedRequest("/list_books", {
      method: "POST",
      body: JSON.stringify({ list_book: formData }),
    });

    revalidatePath(`/lists/${formData.list_id}`);
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "不明なエラーが発生しました" };
    }
  }
}
