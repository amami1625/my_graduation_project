import { Dialog, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react';
import { List } from '@/app/(protected)/lists/_types';
import ListItem from '../display/ListItem';

interface AddListModalProps {
  bookId: number;
  lists: List[];
  isOpen: boolean;
  onClose: () => void;
}

export default function AddListModal({ bookId, lists, isOpen, onClose }: AddListModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* 背景オーバーレイ */}
      <DialogBackdrop className="fixed inset-0 bg-black/30" />

      {/* モーダル配置 */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="mx-auto max-w-md w-full rounded-2xl bg-white p-6 shadow-xl">
          <DialogTitle className="text-xl font-bold mb-4">本をリストに追加</DialogTitle>
          {lists.length === 0 ? (
            <p>リストがありません</p>
          ) : (
            <>
              {lists.map((list) => (
                <ListItem key={list.id} list={list} bookId={bookId} />
              ))}
            </>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
