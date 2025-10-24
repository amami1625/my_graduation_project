'use client';

import { Card } from '@/app/(protected)/cards/_types';
import { useDeleteCard } from '@/app/(protected)/cards/_hooks/useDeleteCard';
import { DeleteButton } from '@/components/Buttons';
import ErrorMessage from '@/components/ErrorMessage';

interface CreatedCardItemProps {
  card: Card;
}

export default function CreatedCardItem({ card }: CreatedCardItemProps) {
  const { error, handleDelete } = useDeleteCard({ cardId: card.id, bookId: card.book_id });

  return (
    <div className="border-b border-gray-200 p-4 last:border-b-0">
      {/* エラーメッセージ */}
      {error && <ErrorMessage message={error} />}

      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* タイトル */}
          <h3 className="text-base font-semibold text-gray-900 mb-2 truncate">{card.title}</h3>

          {/* 本文 */}
          <p className="text-sm text-gray-600 whitespace-pre-wrap">{card.content}</p>
        </div>

        {/* 削除ボタン */}
        <div className="flex-shrink-0">
          <DeleteButton onClick={handleDelete} />
        </div>
      </div>
    </div>
  );
}
