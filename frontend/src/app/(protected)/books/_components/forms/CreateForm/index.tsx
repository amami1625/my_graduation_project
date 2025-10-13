import { getAuthors } from "@/app/(protected)/authors/_lib/queries";
import CreateBookClient from "./CreateBookClient";

// TODO: Tag機能を実装したらTagsを追加する
export default async function CreateForm() {
  const authors = await getAuthors();

  if ("error" in authors) {
    return <div className="text-red-500">著者情報の取得に失敗しました</div>;
  }

  return <CreateBookClient authors={authors}/>;
}
