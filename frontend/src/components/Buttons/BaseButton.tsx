import { ReactNode } from 'react';

interface BaseButtonProps {
  variant: 'update' | 'delete' | 'add' | 'remove' | 'create';
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
  icon?: ReactNode;
}

const BUTTON_STYLES = {
  update: 'bg-blue-600 hover:bg-blue-700',
  delete: 'bg-red-600 hover:bg-red-700',
  add: 'bg-pink-600 hover:bg-pink-700',
  remove: 'bg-gray-600 hover:bg-gray-700',
  create: 'bg-green-600 hover:bg-green-700',
};

const BASE_STYLES =
  'inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition';

const DISABLED_STYLES = 'disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed';

export default function BaseButton({
  variant,
  onClick,
  disabled,
  children,
  icon,
}: BaseButtonProps) {
  const variantStyles = disabled ? '' : BUTTON_STYLES[variant];

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${BASE_STYLES} ${DISABLED_STYLES} ${variantStyles}`}
    >
      {icon}
      {children}
    </button>
  );
}
