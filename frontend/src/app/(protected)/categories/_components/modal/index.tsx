import { Dialog, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react';
import { Category } from '@/app/(protected)/categories/_types';
import CategoryForm from '../forms';
import { createCategory } from '../../_lib/actions';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  setCreatedCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

export default function CategoryModal({
  isOpen,
  onClose,
  setCreatedCategories,
}: CategoryModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* 背景オーバーレイ */}
      <DialogBackdrop className="fixed inset-0 bg-black/30" />

      {/* モーダル配置 */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="mx-auto max-w-md w-full rounded-2xl bg-white p-6 shadow-xl">
          <DialogTitle className="text-xl font-bold mb-4">カテゴリを追加</DialogTitle>

          <CategoryForm
            action={createCategory}
            submitLabel="追加"
            cancel={onClose}
            setCreatedCategories={setCreatedCategories}
          />
        </DialogPanel>
      </div>
    </Dialog>
  );
}
