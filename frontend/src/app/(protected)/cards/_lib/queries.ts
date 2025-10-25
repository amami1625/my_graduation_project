import { authenticatedRequest } from '@/supabase/dal';
import { cardListSchema, cardDetailSchema } from '@/app/(protected)/cards/_types';

// Card詳細データ取得
export async function getCard(id: string) {
  try {
    const data = await authenticatedRequest(`/cards/${id}`);
    return cardDetailSchema.parse(data);
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: '不明なエラーが発生しました' };
    }
  }
}

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
