import { Dialog, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react';
import BookForm from '../forms/BookForm';
import { updateBook } from '../../_lib/actions';
import { Book } from '@/app/(protected)/books/_types';
import { Author } from '@/app/(protected)/authors/types';
import { Category } from '@/app/(protected)/categories/_types';

interface UpdateBookFormModalProps {
  book: Book;
  authors: Author[];
  categories: Category[];
  isOpen: boolean;
  onClose: () => void;
}

export default function UpdateBookFormModal({
  book,
  authors,
  categories,
  isOpen,
  onClose,
}: UpdateBookFormModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* 背景オーバーレイ */}
      <DialogBackdrop className="fixed inset-0 bg-black/30" />

      {/* モーダル配置 */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="mx-auto max-w-md w-full rounded-2xl bg-white p-6 shadow-xl">
          <DialogTitle className="text-xl font-bold mb-4">本を編集</DialogTitle>

          <BookForm
            book={book}
            authors={authors}
            categories={categories}
            action={updateBook}
            submitLabel="更新"
            onClose={onClose}
          />
        </DialogPanel>
      </div>
    </Dialog>
  );
}
