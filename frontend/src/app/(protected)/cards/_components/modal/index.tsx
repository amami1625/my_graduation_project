import BaseModal from '@/components/BaseModal';
import CardForm from '@/app/(protected)/cards/_components/form';
import { createCard } from '../../_lib/actions';
import { Card } from '@/app/(protected)/cards/_types';

interface CardModalProps {
  card?: Card;
  bookId: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function CardModal({ card, bookId, isOpen, onClose }: CardModalProps) {
  return (
    <BaseModal title="カードを作成" isOpen={isOpen} onClose={onClose}>
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
