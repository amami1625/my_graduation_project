import { useCallback, useState } from 'react';
import { addListBook } from '../_lib/actions';

export const useAddBookModal = () => {
  const [error, setError] = useState('');
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);

  const openAddBookModal = useCallback(() => setIsAddBookModalOpen(true), []);
  const closeAddBookModal = useCallback(() => setIsAddBookModalOpen(false), []);

  const handleAdd = async (list_id: number, book_id: number) => {
    const res = await addListBook({ list_id, book_id });

    if ('error' in res) {
      setError(res.error);
      return;
    }
  };

  return {
    error,
    handleAdd,
    isAddBookModalOpen,
    openAddBookModal,
    closeAddBookModal,
  };
};
