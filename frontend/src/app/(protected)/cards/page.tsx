import PageTitle from '@/components/PageTitle';
import ErrorMessage from '@/components/ErrorMessage';
import { getCardList } from '@/app/(protected)/cards/_lib/queries';
import CardListView from '@/app/(protected)/cards/_components/display/CardListView';

export default async function CardsPage() {
  const cardList = await getCardList();

  if ('error' in cardList) {
    return <ErrorMessage message={cardList.error} />;
  }

  return (
    <>
      <PageTitle title="カード一覧" />
      <CardListView cardList={cardList} />
    </>
  );
}
