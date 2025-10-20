import BaseButton from '@/components/Buttons/BaseButton';

interface UpdateButtonProps {
  onClick: () => void;
}

export default function UpdateButton({ onClick }: UpdateButtonProps) {
  return (
    <BaseButton variant="update" onClick={onClick}>
      編集
    </BaseButton>
  );
}
