'use client';

import { List } from '@/app/(protected)/lists/_types';
import { useCreateList } from '@/app/(protected)/lists/_hooks/useCreateList';
import { CreateButton } from '@/components/Buttons';
import CreateListFormModal from '@/app/(protected)/lists/_components/modal/';
import ListCard from '@/app/(protected)/lists/_components/display/ListCard';
import EmptyState from '@/components/EmptyState';

interface ListProps {
  lists: List[];
}

export default function Lists({ lists }: ListProps) {
  const { isCreateFormOpen, openCreateForm, closeCreateForm } = useCreateList();

  return (
    <>
      <div className="mb-6 flex justify-end">
        <CreateButton onClick={openCreateForm} />
      </div>
      {lists.length === 0 ? (
        <EmptyState element="リスト" />
      ) : (
        <div className="space-y-3">
          {lists.map((list) => (
            <ListCard key={list.id} list={list} />
          ))}
        </div>
      )}
      <CreateListFormModal isOpen={isCreateFormOpen} onClose={closeCreateForm} />
    </>
  );
}
