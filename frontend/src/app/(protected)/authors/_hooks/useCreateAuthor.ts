import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Author, AuthorFormData, authorFormSchema } from '@/app/(protected)/authors/types';

interface UseCreateAuthorProps {
  action: (formData: AuthorFormData) => Promise<Author | { error: string }>;
  cancel: () => void;
  setCreatedAuthors: React.Dispatch<React.SetStateAction<Author[]>>;
}

export const useCreateAuthor = ({ action, cancel, setCreatedAuthors }: UseCreateAuthorProps) => {
  const [error, setError] = useState('');

  const defaultValues: AuthorFormData = {
    name: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthorFormData>({
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

  return {
    error,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
  };
};
