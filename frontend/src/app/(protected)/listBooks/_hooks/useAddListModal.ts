import { useCallback, useState } from "react";
import { addListBook } from "../_lib/actions";

export const useAddListModal = () => {
  const [error, setError] = useState("");
  const [isAddListModalOpen, setIsAddListModalOpen] = useState(false);

  const opneAddListModal = useCallback(() => setIsAddListModalOpen(true), []);
  const closeAddListModal = useCallback(() => setIsAddListModalOpen(false), []);

  const handleAdd = async (list_id: number, book_id: number) => {
    const res = await addListBook({ list_id, book_id });

    if ("error" in res) {
      setError(res.error);
      return;
    }
  };

  return {
    error,
    handleAdd,
    isAddListModalOpen,
    opneAddListModal,
    closeAddListModal,
  };
};
