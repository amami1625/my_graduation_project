import { z } from 'zod';

// Cardのバリデーションスキーマ(APIレスポンス用)
export const cardSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  book_id: z.number(),
  created_at: z.string().transform((str) => {
    return new Date(str).toLocaleString('ja-JP', {
      timeZone: 'Asia/Tokyo',
    });
  }),
  updated_at: z.string().transform((str) => {
    return new Date(str).toLocaleString('ja-JP', {
      timeZone: 'Asia/Tokyo',
    });
  }),
});

// Cardのバリデーションスキーマ(フォーム用)
export const cardFormSchema = z.object({
  book_id: z.number(),
  title: z
    .string()
    .min(1, { message: 'タイトルを入力してください' })
    .max(255, { message: 'タイトルは255文字以内で入力してください' }),
  content: z
    .string()
    .min(1, { message: '本文を入力してください' })
    .max(10000, { message: '本文は10000文字以内で入力してください' }),
});

export type Card = z.infer<typeof cardSchema>;
export type CardFormData = z.infer<typeof cardFormSchema>;
