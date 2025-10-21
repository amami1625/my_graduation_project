import { Category } from '@/app/(protected)/categories/_types';
import CategoryForm from '@/app/(protected)/categories/_components/forms';
import BaseModal from '@/components/BaseModal';
import { createCategory } from '@/app/(protected)/categories/_lib/actions';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  setCreatedCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

export default function CategoryModal({
  isOpen,
  onClose,
  setCreatedCategories,
}: CategoryModalProps) {
  return (
    <BaseModal title="カテゴリを追加" isOpen={isOpen} onClose={onClose}>
      <CategoryForm
        action={createCategory}
        submitLabel="追加"
        cancel={onClose}
        setCreatedCategories={setCreatedCategories}
      />
    </BaseModal>
  );
}
