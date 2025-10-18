import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";
import { Book } from "@/app/(protected)/books/_types";
import BookItem from "../display/BookItem";

interface AddBookModalProps {
  listId: number;
  books: Book[];
  isOpen: boolean;
  onClose: () => void;
}

export default function AddBookModal({
  listId,
  books,
  isOpen,
  onClose,
}: AddBookModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* 背景オーバーレイ */}
      <DialogBackdrop className="fixed inset-0 bg-black/30" />

      {/* モーダル配置 */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="mx-auto max-w-md w-full rounded-2xl bg-white p-6 shadow-xl">
          <DialogTitle className="text-xl font-bold mb-4">
            本をリストに追加
          </DialogTitle>
          {books.length === 0 ? (
            <p>本が登録されていません</p>
          ) : (
            <>
              {books.map((book) => (
                <BookItem key={book.id} book={book} listId={listId} />
              ))}
            </>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
