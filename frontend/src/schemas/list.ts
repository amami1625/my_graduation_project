import { z } from "zod";

// Listベーススキーマ（循環参照を含まない基本フィールド）
export const listBaseSchema = z.object({
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

// List一覧データのバリデーションスキーマ(APIレスポンス用)
export const listSchema = listBaseSchema.extend({
  book_ids: z.number().array(),
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
