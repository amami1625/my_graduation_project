'use server';

import { authenticatedRequest } from '@/supabase/dal';
import { Category, CategoryFormData, categorySchema } from '../_types';

export async function createCategory(
  formData: CategoryFormData,
): Promise<Category | { error: string }> {
  try {
    const category = await authenticatedRequest('/categories', {
      method: 'POST',
      body: JSON.stringify({ category: formData }),
    });
    return categorySchema.parse(category);
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: '不明なエラーが発生しました' };
    }
  }
}
