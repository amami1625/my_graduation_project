import BaseButton from './BaseButton';

interface SubmitButtonProps {
  label: string;
  disabled?: boolean;
}

export default function SubmitButton({ label, disabled = false }: SubmitButtonProps) {
  return (
    <BaseButton type="submit" variant="submit" disabled={disabled}>
      {disabled ? '送信中...' : label}
    </BaseButton>
  );
}
