import { FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';

interface FormCheckboxProps<T extends FieldValues = FieldValues> {
  name: Path<T>;
  label: string;
  error?: string;
  register: UseFormRegister<T>;
  registerOptions?: RegisterOptions<T>;
}

export default function FormCheckbox<T extends FieldValues = FieldValues>({
  name,
  label,
  error,
  register,
  registerOptions,
}: FormCheckboxProps<T>) {
  return (
    <div className="flex flex-col gap-2 text-sm">
      <label htmlFor={name} className="flex items-center gap-2">
        <input
          id={name}
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
