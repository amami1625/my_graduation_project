import { useState } from 'react';
import { removeListBook } from '../_lib/actions';

type UseRemoveBookParams = {
  listBookId: number;
} & ({ context: 'list'; listId: number } | { context: 'book'; bookId: number });

export const useRemoveBook = (params: UseRemoveBookParams) => {
  const [error, setError] = useState('');

  const handleRemove = async () => {
    const formData = {
      id: params.listBookId,
      list_id: params.context === 'list' ? params.listId : undefined,
      book_id: params.context === 'book' ? params.bookId : undefined,
    };

    const res = await removeListBook(formData);

    if ('error' in res) {
      setError(res.error);
      return;
    }
  };

  return {
    error,
    handleRemove,
  };
};
