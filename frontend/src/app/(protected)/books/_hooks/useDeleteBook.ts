import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { deleteBook } from '../_lib/actions';

// 本の削除を行うカスタムフック(対応コンポーネント: BookDeleteButton)
export const useDeleteBook = (id: number) => {
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm('本当に削除しますか？')) {
      const res = await deleteBook(id);
      if ('error' in res) {
        setError(res.error);
      } else {
        router.push('/books');
      }
    }
  };

  return { error, handleDelete };
};
