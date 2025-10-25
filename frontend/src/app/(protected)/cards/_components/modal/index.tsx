import BaseModal from '@/components/BaseModal';
import ModalInfo from '@/components/modals/ModalInfo';
import CardForm from '@/app/(protected)/cards/_components/form';
import { createCard } from '@/app/(protected)/cards/_lib/actions';
import { Card } from '@/app/(protected)/cards/_types';

interface CardModalProps {
  card?: Card;
  bookId: number;
  bookTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function CardModal({ card, bookId, bookTitle, isOpen, onClose }: CardModalProps) {
  return (
    <BaseModal title="カードを作成" isOpen={isOpen} onClose={onClose}>
      <ModalInfo label="書籍名" value={bookTitle} />
      <CardForm
        card={card}
        bookId={bookId}
        action={createCard}
        submitLabel="作成"
        onClose={onClose}
      />
    </BaseModal>
  );
}
