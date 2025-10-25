'use client';

import { Card } from '@/app/(protected)/cards/_types';
import CardItem from '@/app/(protected)/cards/_components/display/CardItem';
import CardModal from '@/app/(protected)/cards/_components/modal';
import { CreateCardButton } from '@/components/Buttons';
import { useCardModal } from '@/app/(protected)/cards/_hooks/useCardModal';
import { createCard } from '@/app/(protected)/cards/_lib/actions';

interface BookCardGroupProps {
  book: {
    id: number;
    title: string;
  };
  cards: Card[];
}

export default function BookCardGroup({ book, cards }: BookCardGroupProps) {
  const { isCardModalOpen, openCardModal, closeCardModal } = useCardModal();

  return (
    <section className="space-y-4">
      {/* 本のタイトルと作成ボタン */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">{book.title}</h2>
        <CreateCardButton onClick={openCardModal} />
      </div>

      {/* カードのリスト */}
      {cards.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
          <p className="text-sm text-gray-500">この本にはまだカードが登録されていません</p>
        </div>
      ) : (
        <div className="rounded-lg border border-gray-200 bg-white">
          {cards.map((card) => (
            <CardItem key={card.id} card={card} />
          ))}
        </div>
      )}

      {/* カード作成モーダル */}
      <CardModal
        action={createCard}
        bookId={book.id}
        bookTitle={book.title}
        isOpen={isCardModalOpen}
        onClose={closeCardModal}
      />
    </section>
  );
}
