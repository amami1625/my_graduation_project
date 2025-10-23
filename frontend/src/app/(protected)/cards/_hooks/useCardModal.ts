import { useCallback, useState } from 'react';

export const useCardModal = () => {
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);

  const openCardModal = useCallback(() => setIsCardModalOpen(true), []);
  const closeCardModal = useCallback(() => setIsCardModalOpen(false), []);

  return {
    isCardModalOpen,
    openCardModal,
    closeCardModal,
  };
};
