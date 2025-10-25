import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteCard } from '../_lib/actions';

interface UseDeleteCardProps {
  bookId: number;
  cardId: number;
  redirectTo?: string;
}

export const useDeleteCard = ({ bookId, cardId, redirectTo }: UseDeleteCardProps) => {
  const [error, setError] = useState('');
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm('本当に削除しますか？')) {
      const res = await deleteCard(bookId, cardId);

      if ('error' in res) {
        setError(res.error);
        return;
      }

      if (redirectTo) {
        router.push(redirectTo);
      }
    }
  };

  return { error, handleDelete };
};
