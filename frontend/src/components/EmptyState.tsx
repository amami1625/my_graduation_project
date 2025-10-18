import { BookOpen, Library } from "lucide-react";

interface EmptyStateProps {
  element: "本" | "リスト";
}

export default function EmptyState({ element }: EmptyStateProps) {
  const Icon = element === "本" ? BookOpen : Library;
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 py-12">
      <Icon className="mb-4 h-12 w-12 text-gray-400" />
      <p className="mb-2 text-lg font-semibold text-gray-700">
        まだ{element}が登録されていません
      </p>
      <p className="mb-4 text-sm text-gray-500">
        最初の{element}を登録してみましょう
      </p>
    </div>
  );
}
