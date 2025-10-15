"use client";

import { Book, BookFormData } from "@/app/(protected)/books/_types";
import { Category } from "@/app/(protected)/categories/_types";
import { Author } from "@/schemas/author";
import Select from "react-select";
import { Controller } from "react-hook-form";
import AuthorModal from "@/app/(protected)/authors/_components/modal";
import CategoryModal from "@/app/(protected)/categories/_components/modal";
import { useBookFormState } from "../../_hooks/useBookFormState";
import { useAuthorModal } from "../../_hooks/useAuthorModal";
import { useCategoryModal } from "../../_hooks/useCategoryModal";
import { STATUS_OPTIONS, RATING_OPTIONS } from "../../_constants";

// TODO: Tag機能を実装したらTag型をimportする
interface BookFormProps {
  book?: Book;
  authors?: Author[];
  categories?: Category[];
  action: (
    formData: BookFormData
  ) => Promise<{ success: true } | { error: string } | void>;
  submitLabel: string;
  onClose?: () => void;
}

// TODO: Tag機能を実装したらTagsを追加する
export default function BookForm({
  book,
  authors = [],
  categories = [],
  action,
  submitLabel,
  onClose,
}: BookFormProps) {
  // カスタムフックを使用
  const {
    register,
    control,
    handleSubmit,
    errors,
    error,
    onSubmit,
    isSubmitting,
  } = useBookFormState({ book, action, onSuccess: onClose });

  const {
    createdAuthors,
    setCreatedAuthors,
    isAuthorModalOpen,
    openAuthorModal,
    closeAuthorModal,
  } = useAuthorModal({ initialAuthors: authors });

  const {
    createdCategories,
    setCreatedCategories,
    isCategoryModalOpen,
    openCategoryModal,
    closeCategoryModal,
  } = useCategoryModal({ initialCategories: categories });

  return (
    <>
      <form
        className="flex flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
        onSubmit={handleSubmit(onSubmit)}
      >
        {book && (
          <>
            <input
              {...register("user_id", { valueAsNumber: true })}
              type="hidden"
            />
            <input {...register("id", { valueAsNumber: true })} type="hidden" />
          </>
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
                  openAuthorModal();
                }}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                + 著者を追加
              </button>
            </div>
            <Controller
              name="author_ids"
              control={control}
              render={({ field: { onChange, value, ref } }) => {
                const options = createdAuthors.map((a) => ({
                  value: a.id,
                  label: a.name,
                }));
                return (
                  <Select
                    ref={ref}
                    instanceId="book-authors"
                    inputId="book-authors"
                    isMulti
                    options={options}
                    value={options.filter((c) =>
                      value?.includes(c.value)
                    )}
                    onChange={(val) => onChange(val.map((c) => c.value))}
                    placeholder="著者を検索・選択"
                    className="text-sm"
                  />
                );
              }}
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
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex items-center justify-between">
              <label
                htmlFor="book-authors"
                className="font-semibold text-gray-700"
              >
                カテゴリ
              </label>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  openCategoryModal();
                }}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                + カテゴリを追加
              </button>
            </div>
            <select
              {...register("category_id", { valueAsNumber: true })}
              className="rounded-lg border border-gray-300 px-3 py-2 text-base text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              <option value="0">未分類</option>
              {createdCategories &&
                createdCategories.map((category) => (
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
          </div>
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
          {onClose && (
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-300"
              onClick={onClose}
            >
              キャンセル
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            {isSubmitting ? "送信中..." : submitLabel}
          </button>
        </div>
      </form>
      {/* モーダル */}
      <AuthorModal
        isOpen={isAuthorModalOpen}
        onClose={closeAuthorModal}
        setCreatedAuthors={setCreatedAuthors}
      />
      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={closeCategoryModal}
        setCreatedCategories={setCreatedCategories}
      />
    </>
  );
}
