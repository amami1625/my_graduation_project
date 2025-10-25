'use client';

import { CardDetail } from '@/app/(protected)/cards/_types';
import ErrorMessage from '@/components/ErrorMessage';
import { useDeleteCard } from '@/app/(protected)/cards/_hooks/useDeleteCard';
import { DeleteButton } from '@/components/Buttons';

interface CardDetailViewProps {
  card: CardDetail;
}

export default function CardDetailView({ card }: CardDetailViewProps) {
  const { error, handleDelete } = useDeleteCard({
    cardId: card.id,
    bookId: card.book_id,
    redirectTo: '/cards',
  });

  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      {error && <ErrorMessage message={error} />}
      <article className="flex flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <header className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-gray-500">書籍名: {card.book.title}</p>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">{card.title}</h1>
        </header>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">本文</h2>
          <p className="whitespace-pre-wrap text-base leading-relaxed text-gray-700">
            {card.content}
          </p>
        </section>

        <section className="grid gap-4 rounded-lg bg-gray-50 p-4 text-sm text-gray-600 md:grid-cols-2">
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-gray-500">更新日</span>
            <span>{card.updated_at}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-gray-500">登録日</span>
            <span>{card.created_at}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-gray-500">ID</span>
            <span>#{card.id}</span>
          </div>
        </section>

        <div className="flex gap-3">
          <DeleteButton onClick={handleDelete} />
        </div>
      </article>
    </section>
  );
}
