import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 py-12">
      <BookOpen className="mb-4 h-12 w-12 text-gray-400" />
      <p className="mb-2 text-lg font-semibold text-gray-700">
        まだ本が登録されていません
      </p>
      <p className="mb-4 text-sm text-gray-500">最初の本を登録してみましょう</p>
      <Link
        href="/books/new"
        className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
      >
        新規作成
      </Link>
    </div>
  );
}
