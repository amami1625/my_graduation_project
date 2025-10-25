import { CardList } from '@/app/(protected)/cards/_types';
import EmptyState from '@/components/EmptyState';
import BookCardGroup from '@/app/(protected)/cards/_components/display/BookCardGroup';

interface CardListViewProps {
  cardList: CardList;
}

export default function CardListView({ cardList }: CardListViewProps) {
  if (cardList.books.length === 0) {
    return <EmptyState element="カード" context="list" />;
  }
  return (
    <div className="flex flex-col gap-8">
      {cardList.books.map((group) => (
        <BookCardGroup key={group.book.id} book={group.book} cards={group.cards} />
      ))}
    </div>
  );
}
