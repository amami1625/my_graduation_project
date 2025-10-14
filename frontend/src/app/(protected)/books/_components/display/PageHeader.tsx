import Link from "next/link";
import { Plus } from "lucide-react";

export default function PageHeader() {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-900">本の一覧</h1>
      <Link
        href="/books/new"
        className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
      >
        <Plus className="h-4 w-4" />
        新規作成
      </Link>
    </div>
  );
}
