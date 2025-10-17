import { z } from "zod";
import { categorySchema } from "./category";
import { authorSchema } from "./author";
import { listSchema } from "./list";

// Bookのバリデーションスキーマ(APIレスポンス用)
// TODO: タグ機能実装時にtagsフィールドを追加
export const bookSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  user_id: z.number(),
  list_ids: z.number().array(),
  lists: listSchema.array(),
  author_ids: z.number().array(),
  authors: authorSchema.array(),
  category_id: z.number().nullable(),
  category: categorySchema.optional(),
  rating: z.number().int().min(0).max(5).nullable(),
  reading_status: z.enum(["unread", "reading", "completed"]),
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
  id: z.number().optional(),
  title: z
    .string()
    .min(1, { message: "タイトルを入力してください" })
    .max(255, { message: "タイトルは255文字以内で入力してください" }),
  description: z.string().optional(),
  user_id: z.number().optional(),
  author_ids: z
    .number()
    .array()
    .min(1, { message: "著者を1人以上選択してください" }),
  category_id: z.number().optional(),
  rating: z.number().min(0).max(5).optional(),
  reading_status: z.enum(["unread", "reading", "completed"]),
  public: z.boolean(),
});

export type Book = z.infer<typeof bookSchema>;
export type BookFormData = z.infer<typeof bookFormSchema>;
