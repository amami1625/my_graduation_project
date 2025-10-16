import { listSchema } from "@/schemas/list";
import { authenticatedRequest } from "@/supabase/dal";

// リストのデータを取得
export async function getList(id: string) {
  try {
    const data = await authenticatedRequest(`/lists/${id}`);
    return listSchema.parse(data);
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "不明なエラーが発生しました" };
    }
  }
}

// リスト一覧を取得
export async function getLists() {
  try {
    const data = await authenticatedRequest("/lists");
    return listSchema.array().parse(data);
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "不明なエラーが発生しました" };
    }
  }
}
