'use server';

import { authenticatedRequest } from '@/supabase/dal';
import { ListFormData } from '../_types';
import { revalidatePath } from 'next/cache';

export async function createList(
  formData: ListFormData,
): Promise<{ success: true } | { error: string }> {
  try {
    await authenticatedRequest('/lists', {
      method: 'POST',
      body: JSON.stringify({ list: formData }),
    });

    revalidatePath('/lists');
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: '不明なエラーが発生しました' };
    }
  }
}

export async function updateList(
  formData: ListFormData,
): Promise<{ success: true } | { error: string }> {
  try {
    await authenticatedRequest(`/lists/${formData.id}`, {
      method: 'PUT',
      body: JSON.stringify({ list: formData }),
    });

    revalidatePath(`/lists/${formData.id}`);
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: '不明なエラーが発生しました' };
    }
  }
}

export async function deleteList(id: number): Promise<{ success: true } | { error: string }> {
  try {
    await authenticatedRequest(`/lists/${id}`, {
      method: 'DELETE',
    });

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: '不明なエラーが発生しました' };
    }
  }
}
