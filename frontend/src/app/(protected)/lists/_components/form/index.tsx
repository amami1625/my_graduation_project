import { List, ListFormData } from '@/app/(protected)/lists/_types';
import { useListFormState } from '../../_hooks/useListFormState';

interface ListFormProps {
  list?: List;
  action: (formData: ListFormData) => Promise<{ success: true } | { error: string } | void>;
  submitLabel: string;
  onClose: () => void;
}

export default function ListForm({ list, action, submitLabel, onClose }: ListFormProps) {
  const { register, handleSubmit, errors, error, onSubmit, isSubmitting } = useListFormState({
    list,
    action,
    onSuccess: onClose,
  });

  return (
    <form
      className="flex flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      onSubmit={handleSubmit(onSubmit)}
    >
      {list && (
        <>
          <input {...register('user_id', { valueAsNumber: true })} type="hidden" />
          <input {...register('id', { valueAsNumber: true })} type="hidden" />
        </>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {/* リスト名 */}
        <label className="flex flex-col gap-2 text-sm">
          <span className="font-semibold text-gray-700">リスト名</span>
          <input
            type="text"
            {...register('name')}
            className="rounded-lg border border-gray-300 px-3 py-2 text-base text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            placeholder="リスト名を入力"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
        </label>
      </div>

      {/* 説明 */}
      <label className="flex flex-col gap-2 text-sm">
        <span className="font-semibold text-gray-700">説明</span>
        <textarea
          {...register('description')}
          rows={5}
          className="rounded-lg border border-gray-300 px-3 py-2 text-base text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          placeholder="リストの説明やメモを入力"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </label>

      {/* 公開・非公開 */}
      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm">
          <span className="font-semibold text-gray-700">公開する</span>
          <input
            type="checkbox"
            {...register('public')}
            className="h-4 w-4 rounded border-gray-300"
          />
          {errors.public && <p className="mt-1 text-sm text-red-600">{errors.public.message}</p>}
        </label>
      </div>

      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="flex justify-end gap-3">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
          onClick={onClose}
        >
          キャンセル
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
        >
          {isSubmitting ? '送信中...' : submitLabel}
        </button>
      </div>
    </form>
  );
}
