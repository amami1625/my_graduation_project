export {
  type Book,
  type BookDetail,
  type BookFormData,
  bookSchema,
  bookDetailSchema,
  bookFormSchema,
} from '@/schemas/book';

export type ReadingStatus = 'unread' | 'reading' | 'completed';
