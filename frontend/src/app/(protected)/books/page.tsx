import BookCard from "./_components/display/BookCard";
import EmptyState from "./_components/display/EmptyState";
import { getBooks } from "./_lib/queries";
import ErrorMessage from "@/components/ErrorMessage";

export default async function BooksPage() {
  const books = await getBooks();

  if ("error" in books) {
    return <ErrorMessage val={books} />;
  }

  return (
    <>
      {books.length === 0 ? (
        // 本が登録されていない場合の表示
        <EmptyState />
      ) : (
        // 本のリスト表示
        <div className="space-y-3">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </>
  );
}
