'use server';

import { revalidatePath } from 'next/cache';
import { authenticatedRequest } from '@/supabase/dal';
import { ListBook, ListBookFormData } from '@/app/(protected)/listBooks/_types';

export async function addListBook(
  formData: ListBookFormData,
): Promise<{ success: true } | { error: string }> {
  try {
    await authenticatedRequest('/list_books', {
      method: 'POST',
      body: JSON.stringify({ list_book: formData }),
    });

    revalidatePath(`/lists/${formData.list_id}`);
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: '不明なエラーが発生しました' };
    }
  }
}

export async function removeListBook(
  formData: Partial<ListBook>,
): Promise<{ success: true } | { error: string }> {
  try {
    await authenticatedRequest(`/list_books/${formData.id}`, {
      method: 'DELETE',
    });

    if (formData.list_id) {
      revalidatePath(`/lists/${formData.list_id}`);
    }

    if (formData.book_id) {
      revalidatePath(`/books/${formData.book_id}`);
    }
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: '不明なエラーが発生しました' };
    }
  }
}
