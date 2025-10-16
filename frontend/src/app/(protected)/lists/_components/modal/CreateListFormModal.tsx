import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";
import ListForm from "@/app/(protected)/lists/_components/form";
import { createList } from "@/app/(protected)/lists/_lib/actions";

interface CreateListFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateListFormModal({
  isOpen,
  onClose,
}: CreateListFormModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* 背景オーバーレイ */}
      <DialogBackdrop className="fixed inset-0 bg-black/30" />

      {/* モーダル配置 */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="mx-auto max-w-md w-full rounded-2xl bg-white p-6 shadow-xl">
          <DialogTitle className="text-xl font-bold mb-4">
            リストを作成
          </DialogTitle>

          <ListForm action={createList} submitLabel="作成" onClose={onClose} />
        </DialogPanel>
      </div>
    </Dialog>
  );
}
