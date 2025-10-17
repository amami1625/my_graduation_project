"use client";

import { Book } from "../../_types";
import { Author } from "@/app/(protected)/authors/types";
import { Category } from "@/app/(protected)/categories/_types";
import { useUpdateForm } from "../../_hooks/useUpdateForm";
import UpdateBookFormModal from "../modal/UpdateBookModal";
import { STATUS_LABEL } from "../../_constants";
import { formatRating } from "@/lib/utils/formatRating";
import ErrorMessage from "@/components/ErrorMessage";
import { useDeleteBook } from "../../_hooks/useDeleteBook";
import DeleteBookButton from "./DeleteBookButton";
import { formatVisibility } from "@/lib/utils/formatVisibility";
import UpdateButton from "@/components/Buttons/UpdateButton";

interface BookDetailProps {
  book: Book;
  authors: Author[];
  categories: Category[];
}

export default function BookDetail({
  book,
  authors,
  categories,
}: BookDetailProps) {
  const { isUpdateFormOpen, openUpdateForm, closeUpdateForm } = useUpdateForm();
  const { error, handleDelete } = useDeleteBook(book.id);

  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      {error && <ErrorMessage message={error} />}
      <article className="flex flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <header className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              {STATUS_LABEL[book.reading_status]}
            </span>
            {book.category && (
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                {book.category.name}
              </span>
            )}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            {book.title}
          </h1>
          {book.authors && (
            <p className="text-sm font-medium text-gray-500">
              著者名:{" "}
              {book.authors.map((author) => (
                <span key={author.id}>{author.name}</span>
              ))}
            </p>
          )}
        </header>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
            概要
          </h2>
          <p className="whitespace-pre-line text-base leading-relaxed text-gray-700">
            {book.description || "説明が登録されていません。"}
          </p>
        </section>

        <section className="grid gap-4 rounded-lg bg-gray-50 p-4 text-sm text-gray-600 md:grid-cols-2">
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-gray-500">評価</span>
            <span>{formatRating(book.rating)}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-gray-500">更新日</span>
            <span>{book.updated_at}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-gray-500">登録日</span>
            <span>{book.created_at}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-gray-500">公開/非公開</span>
            <span>{formatVisibility(book.public)}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-gray-500">ID</span>
            <span>#{book.id}</span>
          </div>
        </section>

        <div className="flex gap-3">
          <UpdateButton onClick={openUpdateForm} />
          <DeleteBookButton onClick={handleDelete} />
        </div>
      </article>

      <UpdateBookFormModal
        book={book}
        authors={authors}
        categories={categories}
        isOpen={isUpdateFormOpen}
        onClose={closeUpdateForm}
      />
    </section>
  );
}
