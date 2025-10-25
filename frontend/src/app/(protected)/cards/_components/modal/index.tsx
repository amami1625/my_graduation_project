import BaseModal from '@/components/BaseModal';
import ModalInfo from '@/components/modals/ModalInfo';
import CardForm from '@/app/(protected)/cards/_components/form';
import { Card, CardFormData } from '@/app/(protected)/cards/_types';

interface CardModalProps {
  card?: Card;
  action: (formData: CardFormData) => Promise<{ success: true } | { error: string }>;
  bookId: number;
  bookTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function CardModal({
  card,
  action,
  bookId,
  bookTitle,
  isOpen,
  onClose,
}: CardModalProps) {
  return (
    <BaseModal title={card ? 'カードを更新' : 'カードを作成'} isOpen={isOpen} onClose={onClose}>
      <ModalInfo label="書籍名" value={bookTitle} />
      <CardForm
        card={card}
        bookId={bookId}
        action={action}
        submitLabel={card ? '更新' : '作成'}
        onClose={onClose}
      />
    </BaseModal>
  );
}
