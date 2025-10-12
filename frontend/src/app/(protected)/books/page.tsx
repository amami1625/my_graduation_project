import Link from "next/link";

export default function BooksPage() {
  return (
    <div>
      <h3> Books Page</h3>
      <Link href="/books/new">Create New Book</Link>
    </div>
  );
}
