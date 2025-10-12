import { z } from "zod";

// categoryのバリデーションスキーマ(APIレスポンス用)
export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  user_id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Category = z.infer<typeof categorySchema>;
