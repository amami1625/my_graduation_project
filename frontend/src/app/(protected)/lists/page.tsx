import PageTitle from '@/components/PageTitle';
import { getLists } from './_lib/queries';
import ErrorMessage from '@/components/ErrorMessage';
import Lists from './_components/display/Lists';

export default async function ListPage() {
  const lists = await getLists();

  if ('error' in lists) {
    return <ErrorMessage message={lists.error} />;
  }

  return (
    <>
      <PageTitle title="リスト一覧" />
      <Lists lists={lists} />
    </>
  );
}
