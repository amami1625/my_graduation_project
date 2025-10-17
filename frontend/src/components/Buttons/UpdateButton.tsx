interface UpdateButtonProps {
  onClick: () => void;
}

export default function UpdateButton({ onClick }: UpdateButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
    >
      編集
    </button>
  );
}
