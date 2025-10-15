"use server";

import { authenticatedRequest } from "@/supabase/dal";
import { BookFormData } from "../_types";
import { revalidatePath } from "next/cache";

export async function createBook(
  formData: BookFormData
): Promise<{ success: true } | { error: string }> {
  const book = toRequestBody(formData);

  try {
    await authenticatedRequest("/books", {
      method: "POST",
      body: JSON.stringify({ book }),
    });

    revalidatePath("/books");
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "不明なエラーが発生しました" };
    }
  }
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

export async function deleteBook(
  id: number
): Promise<{ success: true } | { error: string }> {
  try {
    await authenticatedRequest(`/books/${id}`, {
      method: "DELETE",
    });

    revalidatePath("/books");
    revalidatePath(`/books/${id}`);
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
