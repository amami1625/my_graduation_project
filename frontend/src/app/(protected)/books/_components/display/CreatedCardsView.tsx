'use client';

import EmptyState from '@/components/EmptyState';
import { Card } from '@/app/(protected)/cards/_types';
import CreatedCardItem from '@/app/(protected)/books/_components/display/CreatedCardItem';

interface CreatedCardsViewProps {
  cards: Card[];
}

export default function CreatedCardsView({ cards }: CreatedCardsViewProps) {
  return (
    <section className="space-y-4">
      {/* 見出し */}
      <h3 className="text-lg font-semibold text-gray-900">作成したカード</h3>

      {/* カードのリスト */}
      {cards.length === 0 ? (
        <EmptyState element="カード" context="detail" />
      ) : (
        <div className="rounded-lg border border-gray-200 bg-white">
          {cards.map((card) => (
            <CreatedCardItem key={card.id} card={card} />
          ))}
        </div>
      )}
    </section>
  );
}
