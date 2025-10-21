import { RegisterOptions, UseFormRegister } from 'react-hook-form';

interface FormCheckboxProps {
  name: string;
  label: string;
  error?: string;
  register: UseFormRegister<any>;
  registerOptions?: RegisterOptions;
}

export default function FormCheckbox({
  name,
  label,
  error,
  register,
  registerOptions,
}: FormCheckboxProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          {...register(name, registerOptions)}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-100 focus:ring-offset-0"
        />
        <span className="font-semibold text-gray-700">{label}</span>
      </label>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
