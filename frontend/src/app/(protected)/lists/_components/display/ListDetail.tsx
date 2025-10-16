"use client";

import { List } from "@/app/(protected)/lists/_types";
import { formatVisibility } from "@/lib/utils/formatVisibility";

interface ListDetailProps {
  list: List;
}

export default function ListDetail({ list }: ListDetailProps) {
  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <article className="flex flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <header className="flex flex-col gap-3">
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            {list.name}
          </h1>
        </header>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
            概要
          </h2>
          <p className="whitespace-pre-line text-base leading-relaxed text-gray-700">
            {list.description || "説明が登録されていません。"}
          </p>
        </section>

        <section className="grid gap-4 rounded-lg bg-gray-50 p-4 text-sm text-gray-600 md:grid-cols-2">
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-gray-500">更新日</span>
            <span>{list.updated_at}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-gray-500">登録日</span>
            <span>{list.created_at}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-gray-500">公開/非公開</span>
            <span>{formatVisibility(list.public)}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-gray-500">ID</span>
            <span>#{list.id}</span>
          </div>
        </section>

        <div className="flex gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            編集
          </button>
        </div>
      </article>
    </section>
  );
}
