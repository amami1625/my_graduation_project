import { Dialog, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react';
import BookForm from '../forms/BookForm';
import { createBook } from '../../_lib/actions';
import { Author } from '@/app/(protected)/authors/types';
import { Category } from '@/app/(protected)/categories/_types';

interface CreateBookFormModalProps {
  authors: Author[];
  categories: Category[];
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateBookFormModal({
  authors,
  categories,
  isOpen,
  onClose,
}: CreateBookFormModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* 背景オーバーレイ */}
      <DialogBackdrop className="fixed inset-0 bg-black/30" />

      {/* モーダル配置 */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="mx-auto max-w-md w-full rounded-2xl bg-white p-6 shadow-xl">
          <DialogTitle className="text-xl font-bold mb-4">本を作成</DialogTitle>

          <BookForm
            authors={authors}
            categories={categories}
            action={createBook}
            submitLabel="作成"
            onClose={onClose}
          />
        </DialogPanel>
      </div>
    </Dialog>
  );
}
