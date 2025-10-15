"use client";

interface DeleteBookButtonProps {
  onClick: () => void;
}

export default function DeleteBookButton({ onClick }: DeleteBookButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
    >
      削除
    </button>
  );
}
