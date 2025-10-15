import { getBook } from "../_lib/queries";
import { getAuthors } from "@/app/(protected)/authors/_lib/queries";
import { getCategories } from "@/app/(protected)/categories/_lib/queries";
import BookDetail from "../_components/display/BookDetail";
import ErrorMessage from "@/components/ErrorMessage";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BookPage({ params }: PageProps) {
  const { id } = await params;

  // すべてのデータを並列取得
  const [book, authors, categories] = await Promise.all([
    getBook(id),
    getAuthors(),
    getCategories(),
  ]);

  if ("error" in book) {
    return <ErrorMessage message={book.error} />;
  }

  if ("error" in authors) {
    return <ErrorMessage message={authors.error} />;
  }

  if ("error" in categories) {
    return <ErrorMessage message={categories.error} />;
  }

  return <BookDetail book={book} authors={authors} categories={categories} />;
}
