import { z } from "zod";
import { categorySchema } from "./category";

// Bookのバリデーションスキーマ(APIレスポンス用)
// TODO: タグ機能実装時にtagsフィールドを追加
export const bookSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  user_id: z.number(),
  author_ids: z.number().array().nullable(),
  category_id: z.number().nullable(),
  rating: z.number().int().min(0).max(5).nullable().optional(),
  reading_status: z.enum(["unread", "reading", "completed"]),
  category: categorySchema.nullable().optional(),
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

// Bookのバリデーションスキーマ(フォーム用)
// TODO: タグ機能実装時にtagsフィールドを追加
export const bookFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: "タイトルを入力してください" })
    .max(255, { message: "タイトルは255文字以内で入力してください" }),
  description: z.string().optional(),
  user_id: z.number().optional(),
  author_ids: z.number().array().optional(),
  category_id: z.number().optional(),
  rating: z.number().min(0).max(5).optional(),
  reading_status: z.enum(["unread", "reading", "completed"]),
  public: z.boolean(),
});

export type Book = z.infer<typeof bookSchema>;
export type BookFormData = z.infer<typeof bookFormSchema>;
