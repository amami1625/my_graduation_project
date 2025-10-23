'use client';

import { BookDetail } from '@/app/(protected)/books/_types';
import { List } from '@/app/(protected)/lists/_types';
import { Author } from '@/app/(protected)/authors/_types';
import { Category } from '@/app/(protected)/categories/_types';
import UpdateBookFormModal from '@/app/(protected)/books/_components/modal';
import { STATUS_LABEL } from '../../_constants';
import { formatRating } from '@/lib/utils/formatRating';
import { formatVisibility } from '@/lib/utils/formatVisibility';
import ErrorMessage from '@/components/ErrorMessage';
import { useUpdateForm } from '../../_hooks/useUpdateForm';
import { useDeleteBook } from '../../_hooks/useDeleteBook';
import { useAddListModal } from '@/app/(protected)/listBooks/_hooks/useAddListModal';
import { UpdateButton, DeleteButton, AddButton, CreateCardButton } from '@/components/Buttons';
import AddListModal from '@/app/(protected)/listBooks/_components/modal/AddListModal';
import AddedListsView from '@/app/(protected)/books/_components/display/AddedListsView';
import { useCardModal } from '@/app/(protected)/cards/_hooks/useCardModal';
import CardModal from '@/app/(protected)/cards/_components/modal';
import CreatedCardsView from '@/app/(protected)/books/_components/display/CreatedCardsView';

interface BookDetailProps {
  book: BookDetail;
  lists: List[];
  authors: Author[];
  categories: Category[];
}

export default function BookDetailView({ book, lists, authors, categories }: BookDetailProps) {
  const { isUpdateFormOpen, openUpdateForm, closeUpdateForm } = useUpdateForm();
  const { isAddListModalOpen, openAddListModal, closeAddListModal } = useAddListModal();
  const { isCardModalOpen, openCardModal, closeCardModal } = useCardModal();
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
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">{book.title}</h1>
          {book.authors && (
            <p className="text-sm font-medium text-gray-500">
              著者名:{' '}
              {book.authors.map((author) => (
                <span key={author.id}>{author.name}</span>
              ))}
            </p>
          )}
        </header>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">概要</h2>
          <p className="whitespace-pre-line text-base leading-relaxed text-gray-700">
            {book.description || '説明が登録されていません。'}
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
          <DeleteButton onClick={handleDelete} />
          <AddButton onClick={openAddListModal} />
          <CreateCardButton onClick={openCardModal} />
        </div>

        <AddedListsView lists={book.lists} listBooks={book.list_books} />
        <CreatedCardsView cards={book.cards} />
      </article>

      <UpdateBookFormModal
        book={book}
        authors={authors}
        categories={categories}
        isOpen={isUpdateFormOpen}
        onClose={closeUpdateForm}
      />
      <AddListModal
        bookId={book.id}
        lists={lists}
        isOpen={isAddListModalOpen}
        onClose={closeAddListModal}
      />
      <CardModal bookId={book.id} isOpen={isCardModalOpen} onClose={closeCardModal} />
    </section>
  );
}
