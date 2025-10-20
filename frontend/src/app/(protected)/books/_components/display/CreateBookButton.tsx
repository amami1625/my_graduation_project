import { Plus } from 'lucide-react';

interface CreateBookButtonProps {
  onClick: () => void;
}

export default function CreateBookButton({ onClick }: CreateBookButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
    >
      <Plus className="h-4 w-4" /> 新規作成
    </button>
  );
}
