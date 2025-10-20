import { BookOpen, Library } from 'lucide-react';

interface EmptyStateProps {
  element: '本' | 'リスト';
  context?: 'list' | 'detail';
}

export default function EmptyState({ element, context = 'list' }: EmptyStateProps) {
  const Icon = element === '本' ? BookOpen : Library;

  const getMessage = () => {
    if (context === 'detail') {
      if (element === '本') {
        return {
          title: 'まだ本が登録されていません',
          description: 'リストに本を追加してみましょう',
        };
      } else {
        return {
          title: 'まだリストに追加されていません',
          description: '本をリストに追加してみましょう',
        };
      }
    }

    // デフォルト（一覧ページ用）
    return {
      title: `まだ${element}が登録されていません`,
      description: `最初の${element}を登録してみましょう`,
    };
  };

  const { title, description } = getMessage();

  return (
    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 py-12">
      <Icon className="mb-4 h-12 w-12 text-gray-400" />
      <p className="mb-2 text-lg font-semibold text-gray-700">{title}</p>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
}
