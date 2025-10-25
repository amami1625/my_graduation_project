import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardFormData, cardFormSchema } from '@/app/(protected)/cards/_types';
import { zodResolver } from '@hookform/resolvers/zod';

interface UseCardFormProps {
  card?: Card;
  bookId: number;
  action: (formData: CardFormData) => Promise<{ success: true } | { error: string }>;
  cancel: () => void;
}

export const useCardForm = ({ card, bookId, action, cancel }: UseCardFormProps) => {
  const [error, setError] = useState('');

  const defaultValues: CardFormData = {
    id: card?.id,
    book_id: card ? card.book_id : bookId,
    title: card ? card.title : '',
    content: card ? card.content : '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CardFormData>({
    resolver: zodResolver(cardFormSchema),
    defaultValues,
  });

  const onSubmit = async (formData: CardFormData) => {
    const res = await action(formData);
    if ('error' in res) {
      setError(res.error);
      return;
    }
    cancel();
  };

  return {
    error,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
  };
};
