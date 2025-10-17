import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteList } from "../_lib/actions";

// リストの削除を行うカスタムフック
export const useDeleteList = (id: number) => {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm("本当に削除しますか？")) {
      const res = await deleteList(id);
      if ("error" in res) {
        setError(res.error);
      } else {
        router.push("/lists");
      }
    }
  };

  return { error, handleDelete };
};
