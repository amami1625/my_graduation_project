import Link from 'next/link';
import { Book } from '../../_types';
import { User, Tag, Clock, ChevronRight } from 'lucide-react';

export default function BookCard({ book }: { book: Book }) {
  return (
    <Link
      key={book.id}
      href={`/books/${book.id}`}
      className="group block rounded-lg border border-gray-200 bg-white p-4 transition hover:border-blue-400 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* タイトル */}
          <div className="mb-2 flex items-center gap-2">
            <h2 className="text-lg font-semibold text-blue-600 group-hover:text-blue-700 group-hover:underline truncate">
              {book.title}
            </h2>
          </div>

          {/* 説明 */}
          {book.description && (
            <p className="mb-3 text-sm text-gray-600 line-clamp-2">{book.description}</p>
          )}

          {/* メタ情報 */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
            {/* 著者 */}
            {book.authors && book.authors.length > 0 && (
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{book.authors.map((author) => author.name).join(', ')}</span>
              </div>
            )}

            {/* カテゴリ */}
            {book.category && (
              <div className="flex items-center gap-1">
                <Tag className="h-4 w-4" />
                <span>{book.category.name}</span>
              </div>
            )}

            {/* 更新日 */}
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>更新: {book.updated_at}</span>
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
