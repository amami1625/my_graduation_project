import { z } from "zod";

// ListBookのバリデーションスキーマ(フォーム用)
export const listBookFormSchema = z.object({
  list_id: z.number(),
  book_id: z.number(),
});

export type ListBookFormData = z.infer<typeof listBookFormSchema>;
