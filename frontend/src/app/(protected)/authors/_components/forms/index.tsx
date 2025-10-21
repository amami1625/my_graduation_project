'use client';

import { AuthorFormData, authorFormSchema } from '@/schemas/author';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { Author } from '@/app/(protected)/authors/types';
import { useState } from 'react';
import FormInput from '@/components/forms/FormInput';
import CancelButton from '@/components/Buttons/CancelButton';
import ErrorMessage from '@/components/ErrorMessage';
import SubmitButton from '@/components/Buttons/SubmitButton';

interface AuthorFormProps {
  submitLabel: string;
  action: (formData: AuthorFormData) => Promise<Author | { error: string }>;
  cancel: () => void;
  setCreatedAuthors: React.Dispatch<React.SetStateAction<Author[]>>;
}

export default function AuthorForm({
  submitLabel,
  action,
  cancel,
  setCreatedAuthors,
}: AuthorFormProps) {
  const [error, setError] = useState('');

  const defaultValues: AuthorFormData = {
    name: '',
  };

  const { pending } = useFormStatus();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(authorFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: AuthorFormData) => {
    const newAuthor = await action(data);
    if ('error' in newAuthor) {
      setError(newAuthor.error);
      return;
    }
    setCreatedAuthors((prev) => [...prev, newAuthor]);
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
          label="著者名"
          placeholder="著者名を入力"
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
