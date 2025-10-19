"use client";

import { ListDetail } from "@/app/(protected)/lists/_types";
import { Book } from "@/app/(protected)/books/_types";
import { useUpdateList } from "@/app/(protected)/lists/_hooks/useUpdateList";
import { useDeleteList } from "@/app/(protected)/lists/_hooks/useDeleteList";
import { useAddBookModal } from "@/app/(protected)/listBooks/_hooks/useAddBookModal";
import { formatVisibility } from "@/lib/utils/formatVisibility";
import UpdateListFormModal from "../modal/UpdateListFormModal";
import AddBookModal from "@/app/(protected)/listBooks/_components/modal/AddBookModal";
import AddedBooksView from "@/app/(protected)/lists/_components/display/AddedBooksView";
import UpdateButton from "@/components/Buttons/UpdateButton";
import DeleteButton from "@/components/Buttons/DeleteButton";
import AddButton from "@/components/Buttons/AddButton";
import ErrorMessage from "@/components/ErrorMessage";

interface ListDetailProps {
  list: ListDetail;
  books: Book[];
}

export default function ListDetailView({ list, books }: ListDetailProps) {
  const { isUpdateFormOpen, openUpdateForm, closeUpdateForm } = useUpdateList();
  const { isAddBookModalOpen, openAddBookModal, closeAddBookModal } =
    useAddBookModal();
  const { error, handleDelete } = useDeleteList(list.id);

  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      {error && <ErrorMessage message={error} />}
      <article className="flex flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <header className="flex flex-col gap-3">
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            {list.name}
          </h1>
        </header>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
            概要
          </h2>
          <p className="whitespace-pre-line text-base leading-relaxed text-gray-700">
            {list.description || "説明が登録されていません。"}
          </p>
        </section>

        <section className="grid gap-4 rounded-lg bg-gray-50 p-4 text-sm text-gray-600 md:grid-cols-2">
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-gray-500">更新日</span>
            <span>{list.updated_at}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-gray-500">登録日</span>
            <span>{list.created_at}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-gray-500">公開/非公開</span>
            <span>{formatVisibility(list.public)}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-gray-500">ID</span>
            <span>#{list.id}</span>
          </div>
        </section>

        <div className="flex gap-3">
          <UpdateButton onClick={openUpdateForm} />
          <DeleteButton onClick={handleDelete} />
          <AddButton onClick={openAddBookModal} />
        </div>

        <AddedBooksView books={list.books} />
      </article>

      <UpdateListFormModal
        list={list}
        isOpen={isUpdateFormOpen}
        onClose={closeUpdateForm}
      />
      <AddBookModal
        listId={list.id}
        books={books}
        isOpen={isAddBookModalOpen}
        onClose={closeAddBookModal}
      />
    </section>
  );
}
