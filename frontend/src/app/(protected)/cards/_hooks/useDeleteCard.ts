import { useState } from 'react';
import { deleteCard } from '../_lib/actions';

interface UseDeleteCardProps {
  bookId: number;
  cardId: number;
}

export const useDeleteCard = ({ bookId, cardId }: UseDeleteCardProps) => {
  const [error, setError] = useState('');

  const handleDelete = async () => {
    if (confirm('本当に削除しますか？')) {
      const res = await deleteCard(bookId, cardId);

      if ('error' in res) {
        setError(res.error);
        return;
      }
    }
  };

  return { error, handleDelete };
};
