import { authenticatedRequest } from '@/supabase/dal';
import { Author, authorSchema } from '../types';

export async function getAuthors(): Promise<Author[] | { error: string }> {
  try {
    const data = await authenticatedRequest('/authors');
    return authorSchema.array().parse(data);
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: '不明なエラーが発生しました' };
    }
  }
}
