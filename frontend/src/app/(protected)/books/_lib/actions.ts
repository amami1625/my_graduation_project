"use server";

import { authenticatedRequest } from "@/supabase/dal";
import { redirect } from "next/navigation";
import { BookFormData } from "../_types";

export async function createBook(
  formData: BookFormData
): Promise<void | { error: string }> {
  const book = toRequestBody(formData);

  try {
    await authenticatedRequest("/books", {
      method: "POST",
      body: JSON.stringify({ book }),
    });
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "不明なエラーが発生しました" };
    }
  }

  redirect("/books");
}

// FormDataからBook用のリクエストボディを生成
function toRequestBody(formData: BookFormData) {
  return {
    ...formData,
    category_id: formData.category_id === 0 ? null : formData.category_id,
    rating: formData.rating === 0 ? null : formData.rating,
  };
}
