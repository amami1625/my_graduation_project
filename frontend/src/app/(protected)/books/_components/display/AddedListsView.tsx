"use client";

import { AddedList } from "@/app/(protected)/lists/_types";
import AddedListItem from "./AddedListItem";
import EmptyState from "@/components/EmptyState";

interface AddedListsViewProps {
  lists: AddedList[];
}

export default function AddedListsView({ lists }: AddedListsViewProps) {
  return (
    <section className="space-y-4">
      {/* 見出し */}
      <h3 className="text-lg font-semibold text-gray-900">追加済みのリスト</h3>

      {/* リストのリスト */}
      {lists.length === 0 ? (
        <EmptyState element="リスト" context="detail" />
      ) : (
        <div className="rounded-lg border border-gray-200 bg-white">
          {lists.map((list) => (
            <AddedListItem key={list.id} list={list} />
          ))}
        </div>
      )}
    </section>
  );
}
