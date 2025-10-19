export {
  type Book,
  type BookFormData,
  bookSchema,
  bookFormSchema,
} from "@/schemas/book";

export {
  type BookDetail,
  bookDetailSchema,
} from "@/schemas/details";

export type ReadingStatus = "unread" | "reading" | "completed";
