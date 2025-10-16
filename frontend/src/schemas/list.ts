import { z } from "zod";

// Listのバリデーションスキーマ(APIレスポンス用)
export const listSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  user_id: z.number(),
  public: z.boolean(),
  created_at: z.string().transform((str) => {
    return new Date(str).toLocaleString("ja-JP", {
      timeZone: "Asia/Tokyo",
    });
  }),
  updated_at: z.string().transform((str) => {
    return new Date(str).toLocaleString("ja-JP", {
      timeZone: "Asia/Tokyo",
    });
  }),
});

// Listのバリデーションスキーマ(フォーム用)
export const listFormSchema = z.object({
  id: z.number().optional(),
  name: z
    .string()
    .min(1, { message: "リスト名を入力してください" })
    .max(255, { message: "リスト名は255文字以内で入力してください" }),
  description: z.string().optional(),
  user_id: z.number().optional(),
  public: z.boolean(),
});

export type List = z.infer<typeof listSchema>;
export type ListFormData = z.infer<typeof listFormSchema>;
