"use client";

import {
  Book,
  BookFormData,
  bookFormSchema,
  ReadingStatus,
} from "@/app/(protected)/books/_types";
import { Category } from "@/app/(protected)/categories/_types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import AuthorModal from "@/app/(protected)/authors/_components/modal";
import { Author } from "@/schemas/author";
import Select from "react-select";

const STATUS_OPTIONS: { value: ReadingStatus; label: string }[] = [
  { value: "unread", label: "未読" },
  { value: "reading", label: "読書中" },
  { value: "completed", label: "読了" },
];

const RATING_OPTIONS: { value: string; label: string }[] = [
  { value: "1", label: "★" },
  { value: "2", label: "★★" },
  { value: "3", label: "★★★" },
  { value: "4", label: "★★★★" },
  { value: "5", label: "★★★★★" },
];

// TODO: Tag機能を実装したらTag型をimportする
interface BookFormProps {
  book?: Book;
  authors?: Author[];
  categories?: Category[];
  action: (formData: BookFormData) => Promise<void | { error: string }>;
  submitLabel: string;
  loading?: boolean;
  cancel?: () => void;
}

// TODO: Tag機能を実装したらTagsを追加する
export default function BookForm({
  book,
  authors = [],
  categories = [],
  action,
  submitLabel,
  loading,
  cancel,
}: BookFormProps) {
  const [error, setError] = useState("");
  const [createdAuthors, setCreatedAuthors] = useState<Author[]>(authors);
  const [isAuthorModalOpen, setIsAuthorModalOpen] = useState(false);

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

  const onSubmit = async (data: BookFormData) => {
    const res = await action(data);
    if (res && "error" in res) {
      setError(res.error);
      return;
    }
  };

  return (
    <>
      <form
        className="flex flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
        onSubmit={handleSubmit(onSubmit)}
      >
        {book && (
          <input
            {...register("user_id", { valueAsNumber: true })}
            type="hidden"
          />
        )}

        <div className="grid gap-4 md:grid-cols-2">
          {/* タイトル */}
          <label className="flex flex-col gap-2 text-sm">
            <span className="font-semibold text-gray-700">タイトル</span>
            <input
              type="text"
              {...register("title")}
              className="rounded-lg border border-gray-300 px-3 py-2 text-base text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              placeholder="書籍タイトルを入力"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">
                {errors.title.message}
              </p>
            )}
          </label>
          {/* 著者 */}
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex items-center justify-between">
              <label
                htmlFor="book-authors"
                className="font-semibold text-gray-700"
              >
                著者
              </label>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setIsAuthorModalOpen(true);
                }}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                + 著者を追加
              </button>
            </div>
            <Select
              instanceId="book-authors"
              inputId="book-authors"
              isMulti
              options={createdAuthors.map((a) => ({
                value: a.id,
                label: a.name,
              }))}
              onChange={(selected) => {
                setValue(
                  "author_ids",
                  selected.map((s) => s.value)
                );
              }}
              placeholder="著者を検索・選択"
              className="text-sm"
            />
            {errors.author_ids && (
              <p className="mt-1 text-sm text-red-600">
                {errors.author_ids.message}
              </p>
            )}
          </div>
          {/* ステータス */}
          <label className="flex flex-col gap-2 text-sm">
            <span className="font-semibold text-gray-700">ステータス</span>
            <select
              {...register("reading_status")}
              className="rounded-lg border border-gray-300 px-3 py-2 text-base text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.reading_status && (
              <p className="mt-1 text-sm text-red-600">
                {errors.reading_status.message}
              </p>
            )}
          </label>
          {/* 評価 */}
          <label className="flex flex-col gap-2 text-sm">
            <span className="font-semibold text-gray-700">評価 (1-5)</span>
            <select
              {...register("rating", { valueAsNumber: true })}
              className="rounded-lg border border-gray-300 px-3 py-2 text-base text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              <option value="0">未評価</option>
              {RATING_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.rating && (
              <p className="mt-1 text-sm text-red-600">
                {errors.rating.message}
              </p>
            )}
          </label>
        </div>

        {/* 説明 */}
        <label className="flex flex-col gap-2 text-sm">
          <span className="font-semibold text-gray-700">説明</span>
          <textarea
            {...register("description")}
            rows={5}
            className="rounded-lg border border-gray-300 px-3 py-2 text-base text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            placeholder="書籍の説明やメモを入力"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </label>

        {/* カテゴリ */}
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm">
            <span className="font-semibold text-gray-700">カテゴリ</span>
            <select
              {...register("category_id", { valueAsNumber: true })}
              className="rounded-lg border border-gray-300 px-3 py-2 text-base text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              <option value="0">未分類</option>
              {categories &&
                categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
            {errors.category_id && (
              <p className="mt-1 text-sm text-red-600">
                {errors.category_id.message}
              </p>
            )}
          </label>
        </div>

        {/* 公開・非公開 */}
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm">
            <span className="font-semibold text-gray-700">公開する</span>
            <input
              type="checkbox"
              {...register("public")}
              className="h-4 w-4 rounded border-gray-300"
            />
            {errors.public && (
              <p className="mt-1 text-sm text-red-600">
                {errors.public.message}
              </p>
            )}
          </label>
        </div>

        {error && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

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
            disabled={loading}
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            {loading ? "送信中..." : submitLabel}
          </button>
        </div>
      </form>
      {/* モーダル */}
      <AuthorModal
        isAuthorModalOpen={isAuthorModalOpen}
        setIsAuthorModalOpen={setIsAuthorModalOpen}
        setCreatedAuthors={setCreatedAuthors}
      />
    </>
  );
}
