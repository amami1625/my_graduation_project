"use server";

import { authenticatedRequest } from "@/supabase/dal";
import { redirect } from "next/navigation";
import { BookFormData } from "../_types";
import { revalidatePath } from "next/cache";

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

export async function updateBook(
  formData: BookFormData
): Promise<{ success: true } | { error: string }> {
  const book = toRequestBody(formData);

  try {
    await authenticatedRequest(`/books/${book.id}`, {
      method: "PUT",
      body: JSON.stringify({ book }),
    });

    revalidatePath(`/books/${book.id}`);
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "不明なエラーが発生しました" };
    }
  }
}

// FormDataからBook用のリクエストボディを生成
function toRequestBody(formData: BookFormData) {
  return {
    ...formData,
    category_id: formData.category_id === 0 ? null : formData.category_id,
    rating: formData.rating === 0 ? null : formData.rating,
  };
}
