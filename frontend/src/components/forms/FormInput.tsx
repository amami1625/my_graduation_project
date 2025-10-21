import { FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';

interface FormInputProps<T extends FieldValues = FieldValues> {
  name: Path<T>;
  label?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'hidden';
  placeholder?: string;
  error?: string;
  register: UseFormRegister<T>;
  registerOptions?: RegisterOptions<T>;
}

const BASE_STYLES = 'border border-gray-300';

const INPUT_STYLES = {
  text: 'rounded-lg px-3 py-2 text-base text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100',
  email:
    'rounded-lg px-3 py-2 text-base text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100',
  password:
    'rounded-lg px-3 py-2 text-base text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100',
  number:
    'rounded-lg px-3 py-2 text-base text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100',
  hidden: '',
} as const;

export default function FormInput<T extends FieldValues = FieldValues>({
  name,
  label,
  type = 'text',
  placeholder,
  error,
  register,
  registerOptions,
}: FormInputProps<T>) {
  // hidden inputの場合はラベルなしで返す
  if (type === 'hidden') {
    return <input type="hidden" {...register(name, registerOptions)} />;
  }

  return (
    <label className="flex flex-col gap-2 text-sm">
      {label && <span className="font-semibold text-gray-700">{label}</span>}
      <input
        type={type}
        {...register(name, registerOptions)}
        className={`${BASE_STYLES} ${INPUT_STYLES[type]}`}
        placeholder={placeholder}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </label>
  );
}
