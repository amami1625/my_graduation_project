import Link from "next/link";
import { getBook } from "../_lib/queries";
import { ReadingStatus } from "../_types";

interface PageProps {
  params: Promise<{ id: string }>;
}

const STATUS_LABEL: Record<ReadingStatus, string> = {
  unread: "未読",
  reading: "読書中",
  completed: "読了",
};

const formatter = new Intl.DateTimeFormat("ja-JP", {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export default async function BookPage({ params }: PageProps) {
  const { id } = await params;
  const book = await getBook(id);

  if ("error" in book) {
    return <p>{book.error}</p>;
  }

  return (
    <>
      <Link
        href="/books"
        className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
      >
        ← 本一覧へ戻る
      </Link>
      <section className="mx-auto max-w-4xl px-4 py-10">
        <article className="flex flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <header className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                {STATUS_LABEL[book.reading_status]}
              </span>
              {book.category && (
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                  {book.category.name}
                </span>
              )}
            </div>
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
              {book.title}
            </h1>
            <p className="text-sm font-medium text-gray-500">著者名: 〇〇〇</p>
          </header>

          <section className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
              概要
            </h2>
            <p className="whitespace-pre-line text-base leading-relaxed text-gray-700">
              {book.description || "説明が登録されていません。"}
            </p>
          </section>

          <section className="grid gap-4 rounded-lg bg-gray-50 p-4 text-sm text-gray-600 md:grid-cols-2">
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-gray-500">評価</span>
              <span>{formatRating(book.rating)}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-gray-500">更新日</span>
              <span>{formatter.format(new Date(book.updated_at))}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-gray-500">登録日</span>
              <span>{formatter.format(new Date(book.created_at))}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-gray-500">ID</span>
              <span>#{book.id}</span>
            </div>
          </section>
        </article>
      </section>
    </>
  );
}

function formatRating(rating?: number | null) {
  if (rating == null) {
    return "未評価";
  }

  const rounded = Math.round(rating);
  const safe = Math.max(0, Math.min(5, rounded));
  const stars = "★".repeat(safe) + "☆".repeat(5 - safe);
  return `${stars} (${rating}/5)`;
}
