import { useCallback, useState } from "react";

export const useCreateList = () => {
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);

  const openCreateForm = useCallback(() => setIsCreateFormOpen(true), []);
  const closeCreateForm = useCallback(() => setIsCreateFormOpen(false), []);

  return {
    isCreateFormOpen,
    openCreateForm,
    closeCreateForm,
  };
};
