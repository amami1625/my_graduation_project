'use client';

import {
  Category,
  CategoryFormData,
  categoryFormSchema,
} from '@/app/(protected)/categories/_types';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useFormStatus } from 'react-dom';
import { zodResolver } from '@hookform/resolvers/zod';

interface CategoryFormProps {
  submitLabel: string;
  action: (formData: CategoryFormData) => Promise<Category | { error: string }>;
  cancel: () => void;
  setCreatedCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

export default function CategoryForm({
  submitLabel,
  action,
  cancel,
  setCreatedCategories,
}: CategoryFormProps) {
  const [error, setError] = useState('');
  const { pending } = useFormStatus();

  const defaultValues: CategoryFormData = {
    name: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(categoryFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: CategoryFormData) => {
    const newCategory = await action(data);
    if ('error' in newCategory) {
      setError(newCategory.error);
      return;
    }
    setCreatedCategories((prev) => [...prev, newCategory]);
    cancel();
  };

  return (
    <form
      className="flex flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm">
          <span className="font-semibold text-gray-700">カテゴリ名</span>
          <input
            type="text"
            {...register('name')}
            className="rounded-lg border border-gray-300 px-3 py-2 text-base text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            placeholder="カテゴリ名を入力"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
        </label>
      </div>

      <div className="flex justify-end gap-3">
        {cancel && (
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-300"
            onClick={cancel}
          >
            キャンセル
          </button>
        )}
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
        >
          {pending ? '送信中...' : submitLabel}
        </button>
      </div>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </form>
  );
}
