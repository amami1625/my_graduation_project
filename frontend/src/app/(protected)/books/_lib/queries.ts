import { authenticatedRequest } from "@/supabase/dal";
import { bookSchema } from "../_types";

// Book詳細取得
export async function getBook(id: string) {
  try {
    const data = await authenticatedRequest(`/books/${id}`);
    return bookSchema.parse(data);
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "不明なエラーが発生しました" };
    }
  }
}
