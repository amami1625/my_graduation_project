import { RegisterOptions, UseFormRegister } from 'react-hook-form';

interface FormTextareaProps {
  name: string;
  label?: string;
  placeholder?: string;
  rows?: number;
  error?: string;
  register: UseFormRegister<any>;
  registerOptions?: RegisterOptions;
}

export default function FormTextarea({
  name,
  label,
  placeholder,
  rows = 5,
  error,
  register,
  registerOptions,
}: FormTextareaProps) {
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
