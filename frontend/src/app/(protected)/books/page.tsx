import { getAuthors } from "../authors/_lib/queries";
import { getCategories } from "../categories/_lib/queries";
import BookList from "./_components/display/BookList";
import { getBooks } from "./_lib/queries";
import ErrorMessage from "@/components/ErrorMessage";

export default async function BooksPage() {
  const [books, authors, categories] = await Promise.all([
    getBooks(),
    getAuthors(),
    getCategories(),
  ]);

  if ("error" in books) {
    return <ErrorMessage message={books.error} />;
  }

  if ("error" in authors) {
    return <ErrorMessage message={authors.error} />;
  }

  if ("error" in categories) {
    return <ErrorMessage message={categories.error} />;
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">本一覧</h1>
      <BookList books={books} authors={authors} categories={categories} />
    </>
  );
}
