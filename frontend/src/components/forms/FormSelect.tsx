import { ReactNode } from 'react';
import { FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';

interface SelectOption {
  value: string | number;
  label: string;
}

interface FormSelectProps<T extends FieldValues = FieldValues> {
  name: Path<T>;
  label?: string;
  options: SelectOption[];
  defaultValue?: string | number;
  defaultLabel?: string;
  error?: string;
  register: UseFormRegister<T>;
  registerOptions?: RegisterOptions<T>;
  button?: ReactNode;
}

export default function FormSelect<T extends FieldValues = FieldValues>({
  name,
  label,
  options,
  defaultLabel,
  defaultValue,
  error,
  register,
  registerOptions,
  button,
}: FormSelectProps<T>) {
  return (
    <div className="flex flex-col gap-2 text-sm">
      {(label || button) && (
        <div className="flex items-center justify-between">
          {label && (
            <label htmlFor={name} className="font-semibold text-gray-700">
              {label}
            </label>
          )}
          {button}
        </div>
      )}
      <select
        id={name}
        {...register(name, registerOptions)}
        className="rounded-lg border border-gray-300 px-3 py-2 text-base text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
      >
        {defaultLabel && <option value={defaultValue}>{defaultLabel}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
