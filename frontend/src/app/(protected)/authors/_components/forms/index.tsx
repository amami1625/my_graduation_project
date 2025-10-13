"use client";

import { AuthorFormData, authorFormSchema } from "@/schemas/author";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { Author } from "@/app/(protected)/authors/types";

interface AuthorFormProps {
  submitLabel: string;
  action: (formData: AuthorFormData) => Promise<Author>;
  cancel: () => void;
  setCreatedAuthors: React.Dispatch<React.SetStateAction<Author[]>>;
}

export default function AuthorForm({
  submitLabel,
  action,
  cancel,
  setCreatedAuthors,
}: AuthorFormProps) {
  const defaultValues: AuthorFormData = {
    name: "",
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
    setCreatedAuthors((prev) => [...prev, newAuthor]);
    cancel();
  };

  return (
    <form
      className="flex flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm">
          <span className="font-semibold text-gray-700">著者名</span>
          <input
            type="text"
            {...register("name")}
            className="rounded-lg border border-gray-300 px-3 py-2 text-base text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            placeholder="著者名を入力"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
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
          {pending ? "送信中..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
