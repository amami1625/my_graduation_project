"use client";

import BookForm from "../BookForm";
import { createBook } from "@/app/(protected)/books/_lib/actions";
import { Author } from "@/app/(protected)/authors/types";
import { Category } from "@/app/(protected)/categories/_types";

// TODO: Tag機能を実装したらTag型をimportする
interface CreateBookClientProps {
  authors?: Author[];
  categories?: Category[];
}

// TODO: Tag機能を実装したらTagsを追加する
export default function CreateBookClient({
  categories = [],
  authors = [],
}: CreateBookClientProps) {
  return (
    <BookForm
      authors={authors}
      action={createBook}
      categories={categories}
      submitLabel="作成"
    />
  );
}
