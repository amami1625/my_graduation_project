"use client";

import { List } from "@/app/(protected)/lists/_types";
import CreateListButton from "./CreateListButton";
import { useCreateList } from "../../_hooks/useCreateList";
import CreateListFormModal from "../modal/CreateListFormModal";
import Link from "next/link";

interface ListProps {
  lists: List[];
}

export default function Lists({ lists }: ListProps) {
  const { isCreateFormOpen, openCreateForm, closeCreateForm } = useCreateList();

  return (
    <>
      <div className="mb-6 flex justify-end">
        <CreateListButton onClick={openCreateForm} />
      </div>
      {lists.length === 0 ? (
        <p>リストが存在しません</p>
      ) : (
        lists.map((list) => <Link key={list.id} href={`/lists/${list.id}`}>{list.name}</Link>)
      )}
      <CreateListFormModal
        isOpen={isCreateFormOpen}
        onClose={closeCreateForm}
      />
    </>
  );
}
