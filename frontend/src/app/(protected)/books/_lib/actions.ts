"use server";

import { authenticatedRequest } from "@/supabase/dal";
import { redirect } from "next/navigation";
import { BookFormData } from "../_types";

export async function createBook(formData: BookFormData): Promise<void> {
  const book = toRequestBody(formData);

  await authenticatedRequest("/books", {
    method: "POST",
    body: JSON.stringify({ book }),
  });

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
