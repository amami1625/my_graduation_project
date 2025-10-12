"use client";

import { Category } from "@/app/(protected)/categories/_types";
import BookForm from "../BookForm";
import { createBook } from "@/app/(protected)/books/_lib/actions";
import { useFormStatus } from "react-dom";

// TODO: Tag機能を実装したらTag型をimportする
interface CreateBookClientProps {
  categories?: Category[];
}

// TODO: Tag機能を実装したらTagsを追加する
export default function CreateBookClient({
  categories = [],
}: CreateBookClientProps) {
  const { pending } = useFormStatus();

  return (
    <BookForm
      action={createBook}
      categories={categories}
      submitLabel="作成"
      loading={pending}
    />
  );
}