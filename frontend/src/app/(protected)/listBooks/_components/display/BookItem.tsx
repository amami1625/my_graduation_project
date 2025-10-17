import { Book } from "@/app/(protected)/books/_types";
import { useAddBookModal } from "../../_hooks/useAddBookModal";
import ErrorMessage from "@/components/ErrorMessage";
import AddButton from "@/components/Buttons/AddButton";

interface BookItemProps {
  listId: number;
  book: Book;
}

export default function BookItem({ listId, book }: BookItemProps) {
  const { error, handleAdd } = useAddBookModal();
  const isAdded = book.list_ids.includes(listId);

  return (
    <div className="border-b border-gray-200 py-4 last:border-b-0">
      {error && <ErrorMessage message={error} />}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* タイトル */}
          <h3 className="text-base font-semibold text-gray-900 mb-2 truncate">
            {book.title}
          </h3>

          {/* 著者 */}
          {book.authors.length > 0 && (
            <div className="flex items-center gap-1 mb-1">
              <span className="text-xs text-gray-500">著者:</span>
              <p className="text-sm text-gray-700">
                {book.authors.map((author) => author.name).join(", ")}
              </p>
            </div>
          )}

          {/* カテゴリ */}
          {book.category && (
            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-500">カテゴリ:</span>
              <span className="inline-block rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
                {book.category.name}
              </span>
            </div>
          )}
        </div>

        {/* 追加ボタン */}
        <div className="flex-shrink-0">
          <AddButton
            onClick={() => handleAdd(listId, book.id)}
            isAdded={isAdded}
          />
        </div>
      </div>
    </div>
  );
}
