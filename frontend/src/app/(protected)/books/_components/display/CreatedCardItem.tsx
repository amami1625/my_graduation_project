'use client';

import { Card } from '@/app/(protected)/cards/_types';

interface CreatedCardItemProps {
  card: Card;
}

export default function CreatedCardItem({ card }: CreatedCardItemProps) {
  return (
    <div className="border-b border-gray-200 p-4 last:border-b-0">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* タイトル */}
          <h3 className="text-base font-semibold text-gray-900 mb-2 truncate">{card.title}</h3>

          {/* 本文 */}
          <p className="text-sm text-gray-600 whitespace-pre-wrap">{card.content}</p>
        </div>
      </div>
    </div>
  );
}
