import { listSchema } from "@/schemas/list";
import { authenticatedRequest } from "@/supabase/dal";

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
