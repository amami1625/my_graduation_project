import { List } from '@/app/(protected)/lists/_types';
import BaseModal from '@/components/BaseModal';
import ListItem from '../display/ListItem';

interface AddListModalProps {
  bookId: number;
  lists: List[];
  isOpen: boolean;
  onClose: () => void;
}

export default function AddListModal({ bookId, lists, isOpen, onClose }: AddListModalProps) {
  return (
    <BaseModal title="本をリストに追加" isOpen={isOpen} onClose={onClose}>
      {lists.length === 0 ? (
        <p className="text-gray-500">リストがありません</p>
      ) : (
        <div className="space-y-2">
          {lists.map((list) => (
            <ListItem key={list.id} list={list} bookId={bookId} />
          ))}
        </div>
      )}
    </BaseModal>
  );
}
