import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Category,
  CategoryFormData,
  categoryFormSchema,
} from '@/app/(protected)/categories/_types';

interface UseCreateCategoryProps {
  action: (formData: CategoryFormData) => Promise<Category | { error: string }>;
  cancel: () => void;
  setCreatedCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

export const useCreateCategory = ({
  action,
  cancel,
  setCreatedCategories,
}: UseCreateCategoryProps) => {
  const [error, setError] = useState('');

  const defaultValues: CategoryFormData = {
    name: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormData>({
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

  return {
    error,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
  };
};
