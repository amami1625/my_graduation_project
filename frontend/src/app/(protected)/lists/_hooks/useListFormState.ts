import { useCallback, useState } from "react";
import { List, ListFormData, listFormSchema } from "../_types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface UseListFormStateProps {
  list?: List;
  action: (
    formData: ListFormData
  ) => Promise<{ success: true } | { error: string } | void>;
  onSuccess: () => void;
}

export function useListFormState({
  list,
  action,
  onSuccess,
}: UseListFormStateProps) {
  const [error, setError] = useState("");

  const defaultValues: ListFormData = {
    id: list?.id,
    name: list?.name ?? "",
    description: list?.description ?? "",
    user_id: list?.user_id,
    public: list?.public ?? false,
  };

  const onSubmit = useCallback(
    async (data: ListFormData) => {
      const res = await action(data);
      if (res && "error" in res) {
        setError(res.error);
        return;
      }
      if (res && "success" in res) {
        onSuccess();
      }
    },
    [action, onSuccess]
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ListFormData>({
    resolver: zodResolver(listFormSchema),
    defaultValues,
  });

  return {
    register,
    handleSubmit,
    errors,
    error,
    onSubmit,
    isSubmitting,
  };
}
