import AuthorForm from '../forms';
import { createAuthor } from '../../_lib/actions';
import { Author } from '@/app/(protected)/authors/_types';
import BaseModal from '@/components/BaseModal';

interface AuthorModalProps {
  isOpen: boolean;
  onClose: () => void;
  setCreatedAuthors: React.Dispatch<React.SetStateAction<Author[]>>;
}

export default function AuthorModal({ isOpen, onClose, setCreatedAuthors }: AuthorModalProps) {
  return (
    <BaseModal title="著者を追加" isOpen={isOpen} onClose={onClose}>
      <AuthorForm
        action={createAuthor}
        submitLabel="追加"
        cancel={onClose}
        setCreatedAuthors={setCreatedAuthors}
      />
    </BaseModal>
  );
}
