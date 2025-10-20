import { authenticatedRequest } from '@/supabase/dal';
import { Category, categorySchema } from '../_types';

export async function getCategories(): Promise<Category[] | { error: string }> {
  try {
    const data = await authenticatedRequest('/categories');
    return categorySchema.array().parse(data);
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: '不明なエラーが発生しました' };
    }
  }
}
