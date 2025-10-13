import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useCallback } from "react";
import { Book, BookFormData, bookFormSchema } from "../_types";

interface UseBookFormStateProps {
  book?: Book;
  action: (formData: BookFormData) => Promise<void | { error: string }>;
}

export function useBookFormState({ book, action }: UseBookFormStateProps) {
  const [error, setError] = useState("");

  const defaultValues: BookFormData = {
    title: book?.title ?? "",
    description: book?.description ?? "",
    user_id: book?.user_id,
    author_ids: book?.author_ids ?? [],
    category_id: book?.category_id ?? 0,
    rating: book?.rating ?? 0,
    reading_status: book?.reading_status ?? "unread",
    public: book ? book.public : false,
  };

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<BookFormData>({
    resolver: zodResolver(bookFormSchema),
    defaultValues,
  });

  const onSubmit = useCallback(
    async (data: BookFormData) => {
      const res = await action(data);
      if (res && "error" in res) {
        setError(res.error);
        return;
      }
    },
    [action]
  );

  return {
    register,
    setValue,
    handleSubmit,
    errors,
    error,
    onSubmit,
  };
}
