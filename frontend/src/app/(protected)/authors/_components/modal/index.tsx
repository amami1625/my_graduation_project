import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";
import AuthorForm from "../forms";
import { createAuthor } from "../../_lib/actions";
import { Author } from "../../types";

interface AuthorModalProps {
  isAuthorModalOpen: boolean;
  setIsAuthorModalOpen: (isOpen: boolean) => void;
  setCreatedAuthors: React.Dispatch<React.SetStateAction<Author[]>>;
}

export default function AuthorModal({
  isAuthorModalOpen,
  setIsAuthorModalOpen,
  setCreatedAuthors,
}: AuthorModalProps) {
  return (
    <Dialog
      open={isAuthorModalOpen}
      onClose={() => setIsAuthorModalOpen(false)}
      className="relative z-50"
    >
      {/* 背景オーバーレイ */}
      <DialogBackdrop className="fixed inset-0 bg-black/30" />

      {/* モーダル配置 */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="mx-auto max-w-md w-full rounded-2xl bg-white p-6 shadow-xl">
          <DialogTitle className="text-xl font-bold mb-4">
            著者を追加
          </DialogTitle>

          <AuthorForm
            action={createAuthor}
            submitLabel="追加"
            cancel={() => setIsAuthorModalOpen(false)}
            setCreatedAuthors={setCreatedAuthors}
          />
        </DialogPanel>
      </div>
    </Dialog>
  );
}
