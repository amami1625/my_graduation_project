import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useCallback } from 'react';
import { Book, BookFormData, bookFormSchema } from '../_types';

interface UseBookFormStateProps {
  book?: Book;
  action: (formData: BookFormData) => Promise<{ success: true } | { error: string } | void>;
  onSuccess: () => void; // フォーム送信成功時に呼ばれるコールバック
}

export function useBookFormState({ book, action, onSuccess }: UseBookFormStateProps) {
  const [error, setError] = useState('');

  const defaultValues: BookFormData = {
    id: book?.id,
    title: book?.title ?? '',
    description: book?.description ?? '',
    user_id: book?.user_id,
    author_ids: book?.author_ids ?? [],
    category_id: book?.category_id ?? 0,
    rating: book?.rating ?? 0,
    reading_status: book?.reading_status ?? 'unread',
    public: book ? book.public : false,
  };

  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookFormData>({
    resolver: zodResolver(bookFormSchema),
    defaultValues,
  });

  const onSubmit = useCallback(
    async (data: BookFormData) => {
      const res = await action(data);
      if (res && 'error' in res) {
        setError(res.error);
        return;
      }
      // 成功時のコールバックを実行
      if (res && 'success' in res) {
        onSuccess();
      }
    },
    [action, onSuccess],
  );

  return {
    register,
    control,
    setValue,
    handleSubmit,
    errors,
    error,
    onSubmit,
    isSubmitting,
  };
}
