import Link from 'next/link';
import { List } from '@/app/(protected)/lists/_types';
import { ChevronRight, Clock } from 'lucide-react';

interface ListCardProps {
  list: List;
}

export default function ListCard({ list }: ListCardProps) {
  return (
    <Link
      href={`/lists/${list.id}`}
      className="group block rounded-lg border border-gray-200 bg-white p-4 transition hover:border-blue-400 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* タイトル */}
          <div className="mb-2 flex items-center gap-2">
            <h2 className="text-lg font-semibold text-blue-600 group-hover:text-blue-700 group-hover:underline truncate">
              {list.name}
            </h2>
          </div>

          {/* 説明 */}
          {list.description && (
            <p className="mb-3 text-sm text-gray-600 line-clamp-2">{list.description}</p>
          )}

          {/* メタ情報 */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
            {/* 更新日 */}
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>更新: {list.updated_at}</span>
            </div>
          </div>
        </div>

        {/* 右側のアイコン */}
        <div className="flex-shrink-0">
          <ChevronRight className="h-5 w-5 text-gray-400 transition group-hover:text-blue-600" />
        </div>
      </div>
    </Link>
  );
}
