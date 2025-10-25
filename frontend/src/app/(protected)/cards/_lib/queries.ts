import { authenticatedRequest } from '@/supabase/dal';
import { cardListSchema } from '@/app/(protected)/cards/_types';

// Card一覧取得（本ごとにグループ化）
export async function getCardList() {
  try {
    const data = await authenticatedRequest('/cards');
    return cardListSchema.parse(data);
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: '不明なエラーが発生しました' };
    }
  }
}
