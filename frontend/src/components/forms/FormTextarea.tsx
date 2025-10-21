import { FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';

interface FormTextareaProps<T extends FieldValues = FieldValues> {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  rows?: number;
  error?: string;
  register: UseFormRegister<T>;
  registerOptions?: RegisterOptions<T>;
}

export default function FormTextarea<T extends FieldValues = FieldValues>({
  name,
  label,
  placeholder,
  rows = 5,
  error,
  register,
  registerOptions,
}: FormTextareaProps<T>) {
  return (
    <label className="flex flex-col gap-2 text-sm">
      {label && <span className="font-semibold text-gray-700">{label}</span>}
      <textarea
        {...register(name, registerOptions)}
        rows={rows}
        className="rounded-lg border border-gray-300 px-3 py-2 text-base text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
        placeholder={placeholder}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </label>
  );
}
