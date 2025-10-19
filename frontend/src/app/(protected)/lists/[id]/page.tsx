import ErrorMessage from "@/components/ErrorMessage";
import ListDetailView from "@/app/(protected)/lists/_components/display/ListDetailView";
import { getList } from "@/app/(protected)/lists/_lib/queries";
import { getBooks } from "@/app/(protected)/books/_lib/queries";

interface ListPageProps {
  params: Promise<{ id: string }>;
}

export default async function ListPage({ params }: ListPageProps) {
  const { id } = await params;
  const [list, books] = await Promise.all([getList(id), getBooks()]);

  if ("error" in list) {
    return <ErrorMessage message={list.error} />;
  }

  if ("error" in books) {
    return <ErrorMessage message={books.error} />;
  }

  return <ListDetailView list={list} books={books} />;
}
