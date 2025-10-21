import { Book } from '@/app/(protected)/books/_types';
import BaseModal from '@/components/BaseModal';
import BookItem from '../display/BookItem';

interface AddBookModalProps {
  listId: number;
  books: Book[];
  isOpen: boolean;
  onClose: () => void;
}

export default function AddBookModal({ listId, books, isOpen, onClose }: AddBookModalProps) {
  return (
    <BaseModal title="本をリストに追加" isOpen={isOpen} onClose={onClose}>
      {books.length === 0 ? (
        <p className="text-gray-500">本が登録されていません</p>
      ) : (
        <div className="space-y-2">
          {books.map((book) => (
            <BookItem key={book.id} book={book} listId={listId} />
          ))}
        </div>
      )}
    </BaseModal>
  );
}
