import ErrorMessage from "@/components/ErrorMessage";
import ListDetail from "../_components/display/ListDetail";
import { getList } from "../_lib/queries";
import { getBooks } from "../../books/_lib/queries";

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

  return <ListDetail list={list} books={books} />;
}
