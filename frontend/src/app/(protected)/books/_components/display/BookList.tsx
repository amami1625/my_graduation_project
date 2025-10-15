"use client";

import { Book } from "@/app/(protected)/books/_types";
import { Author } from "@/app/(protected)/authors/types";
import { Category } from "@/app/(protected)/categories/_types";
import EmptyState from "./EmptyState";
import BookCard from "./BookCard";
import { useCreateBook } from "../../_hooks/useCreateBook";
import CreateBookFormModal from "../modal/CreateBookModal";
import CreateBookButton from "./CreateBookButton";

interface BookListProps {
  books: Book[];
  authors: Author[];
  categories: Category[];
}

export default function BookList({
  books,
  authors,
  categories,
}: BookListProps) {
  const { isCreateFormOpen, openCreateForm, closeCreateForm } = useCreateBook();

  return (
    <>
      <div className="mb-6 flex justify-end">
        <CreateBookButton onClick={openCreateForm} />
      </div>
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
      <CreateBookFormModal
        authors={authors}
        categories={categories}
        isOpen={isCreateFormOpen}
        onClose={closeCreateForm}
      />
    </>
  );
}
