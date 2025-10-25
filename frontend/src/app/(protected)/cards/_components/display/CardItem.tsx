'use client';

import { Card } from '@/app/(protected)/cards/_types';
import { useDeleteCard } from '@/app/(protected)/cards/_hooks/useDeleteCard';
import { DeleteButton } from '@/components/Buttons';
import { DetailLink } from '@/components/links';
import ErrorMessage from '@/components/ErrorMessage';

interface CardItemProps {
  card: Card;
}

export default function CardItem({ card }: CardItemProps) {
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

        {/* アクションボタン */}
        <div className="flex-shrink-0 flex gap-2">
          <DetailLink href={`/cards/${card.id}`} />
          <DeleteButton onClick={handleDelete} />
        </div>
      </div>
    </div>
  );
}
