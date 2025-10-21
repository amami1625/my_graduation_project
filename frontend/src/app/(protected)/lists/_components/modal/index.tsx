import ListForm from '@/app/(protected)/lists/_components/form';
import { List } from '@/app/(protected)/lists/_types';
import { createList, updateList } from '@/app/(protected)/lists/_lib/actions';
import BaseModal from '@/components/BaseModal';

interface ListFormModalProps {
  list?: List;
  isOpen: boolean;
  onClose: () => void;
}

export default function ListFormModal({ list, isOpen, onClose }: ListFormModalProps) {
  const title = list ? 'リストを編集' : 'リストを作成';
  const submitLabel = list ? '更新' : '作成';
  const action = list ? updateList : createList;

  return (
    <BaseModal title={title} isOpen={isOpen} onClose={onClose}>
      <ListForm list={list} action={action} submitLabel={submitLabel} onClose={onClose} />
    </BaseModal>
  );
}
