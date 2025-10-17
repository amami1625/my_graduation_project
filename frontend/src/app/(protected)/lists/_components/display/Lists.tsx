"use client";

import { List } from "@/app/(protected)/lists/_types";
import { useCreateList } from "@/app/(protected)/lists/_hooks/useCreateList";
import CreateListButton from "@/app/(protected)/lists/_components/display/CreateListButton";
import CreateListFormModal from "@/app/(protected)/lists/_components/modal/CreateListFormModal";
import ListCard from "@/app/(protected)/lists/_components/display/ListCard";

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
        <div className="space-y-3">
          {lists.map((list) => (
            <ListCard key={list.id} list={list} />
          ))}
        </div>
      )}
      <CreateListFormModal
        isOpen={isCreateFormOpen}
        onClose={closeCreateForm}
      />
    </>
  );
}
