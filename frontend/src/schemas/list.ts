import { z } from "zod";

// List一覧データのバリデーションスキーマ(APIレスポンス用)
export const listSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  user_id: z.number(),
  book_ids: z.number().array(),
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

// List詳細データ用のスキーマ(APIレスポンス用)
export const listDetailSchema = listSchema.extend({
  books: z.array(
    z.lazy(() =>
      require("./book").bookDetailSchema.omit({
        list_ids: true,
        author_ids: true,
        lists: true,
      })
    )
  ),
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
export type ListDetail = z.infer<typeof listDetailSchema>;
export type ListFormData = z.infer<typeof listFormSchema>;
