interface AddButtonProps {
  onClick: () => void;
  isAdded?: boolean;
}

export default function AddButton({ onClick, isAdded }: AddButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isAdded}
      className="inline-flex items-center gap-2 rounded-lg bg-pink-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-pink-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
    >
      {isAdded ? "追加済み" : "追加"}
    </button>
  );
}
