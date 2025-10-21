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
import FormInput from '@/components/forms/FormInput';
import CancelButton from '@/components/Buttons/CancelButton';
import ErrorMessage from '@/components/ErrorMessage';
import SubmitButton from '@/components/Buttons/SubmitButton';

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
        <FormInput
          name="name"
          label="カテゴリ名"
          placeholder="カテゴリ名を入力"
          error={errors.name?.message}
          register={register}
        />
      </div>

      <div className="flex justify-end gap-3">
        <CancelButton onClick={cancel} />
        <SubmitButton label={submitLabel} disabled={pending} />
      </div>

      {/* エラーメッセージ */}
      {error && <ErrorMessage message={error} />}
    </form>
  );
}
