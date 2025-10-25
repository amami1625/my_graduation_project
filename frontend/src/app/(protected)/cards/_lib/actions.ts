'use server';

import { revalidatePath } from 'next/cache';
import { CardFormData } from '@/app/(protected)/cards/_types';
import { authenticatedRequest } from '@/supabase/dal';

export const createCard = async (
  formData: CardFormData,
): Promise<{ success: true } | { error: string }> => {
  try {
    await authenticatedRequest(`/books/${formData.book_id}/cards`, {
      method: 'POST',
      body: JSON.stringify({ card: formData }),
    });

    revalidatePath(`/books/${formData.book_id}`);
    revalidatePath('/cards');
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: '不明なエラーが発生しました' };
    }
  }
};

export const deleteCard = async (
  bookId: number,
  cardId: number,
): Promise<{ success: true } | { error: string }> => {
  try {
    await authenticatedRequest(`/books/${bookId}/cards/${cardId}`, {
      method: 'DELETE',
    });

    revalidatePath(`/books/${bookId}`);
    revalidatePath('/cards');
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: '不明なエラーが発生しました' };
    }
  }
};
