import { z } from "zod";
import { bookBaseSchema } from "./book";
import { listBaseSchema, listSchema } from "./list";

// Book詳細データのバリデーションスキーマ(APIレスポンス用)
// listsフィールドにはlistBaseSchemaを使用（循環参照を回避）
export const bookDetailSchema = bookBaseSchema.extend({
  list_ids: z.number().array(),
  lists: z.array(listBaseSchema),
});

// List詳細データのバリデーションスキーマ(APIレスポンス用)
// booksフィールドにはbookBaseSchemaを使用（循環参照を回避）
export const listDetailSchema = listSchema.extend({
  book_ids: z.number().array(),
  books: z.array(bookBaseSchema),
});

export type BookDetail = z.infer<typeof bookDetailSchema>;
export type ListDetail = z.infer<typeof listDetailSchema>;
