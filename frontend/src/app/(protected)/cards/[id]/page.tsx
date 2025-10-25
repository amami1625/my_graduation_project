import ErrorMessage from '@/components/ErrorMessage';
import { getCard } from '../_lib/queries';
import CardDetailView from '../_components/display/CardDetailView';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CardPage({ params }: PageProps) {
  const { id } = await params;

  const card = await getCard(id);

  if ('error' in card) {
    return <ErrorMessage message={card.error} />;
  }

  return <CardDetailView card={card} />;
}
