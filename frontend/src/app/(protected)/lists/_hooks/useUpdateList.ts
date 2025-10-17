import { useCallback, useState } from "react";

export const useUpdateList = () => {
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);

  const openUpdateForm = useCallback(() => setIsUpdateFormOpen(true), []);
  const closeUpdateForm = useCallback(() => setIsUpdateFormOpen(false), []);

  return {
    isUpdateFormOpen,
    openUpdateForm,
    closeUpdateForm,
  };
};
