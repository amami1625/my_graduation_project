import ErrorMessage from "@/components/ErrorMessage";
import { getList } from "../_lib/queries";
import ListDetail from "../_components/display/ListDetail";

interface ListPageProps {
  params: Promise<{ id: string }>;
}

export default async function ListPage({ params }: ListPageProps) {
  const { id } = await params;

  const list = await getList(id);

  if ("error" in list) {
    return <ErrorMessage message={list.error} />;
  }

  return <ListDetail list={list} />;
}
