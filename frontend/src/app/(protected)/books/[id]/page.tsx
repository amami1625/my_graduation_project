import { getBook } from '../_lib/queries';
import { getAuthors } from '@/app/(protected)/authors/_lib/queries';
import { getCategories } from '@/app/(protected)/categories/_lib/queries';
import BookDetailView from '../_components/display/BookDetailView';
import ErrorMessage from '@/components/ErrorMessage';
import { getLists } from '../../lists/_lib/queries';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BookPage({ params }: PageProps) {
  const { id } = await params;

  // すべてのデータを並列取得
  const [book, lists, authors, categories] = await Promise.all([
    getBook(id),
    getLists(),
    getAuthors(),
    getCategories(),
  ]);

  if ('error' in book) {
    return <ErrorMessage message={book.error} />;
  }

  if ('error' in lists) {
    return <ErrorMessage message={lists.error} />;
  }

  if ('error' in authors) {
    return <ErrorMessage message={authors.error} />;
  }

  if ('error' in categories) {
    return <ErrorMessage message={categories.error} />;
  }

  return <BookDetailView book={book} lists={lists} authors={authors} categories={categories} />;
}
