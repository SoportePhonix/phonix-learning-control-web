import { TrainingPathwayDetailCard } from '@/components/trainingPathways-detail-card/TrainingPathwaysDetailCard';
import { trainingPathwaysMock } from '@/hooks/trainingPathways/trainingPathways.mock';
import { trainingPathwaysStatsMock } from '@/hooks/trainingPathways/trainingPathwaysStats.mock';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  const trainingPathway = trainingPathwaysMock.find((tp) => tp.id === id);

  const stats = trainingPathwaysStatsMock.find((s) => s.trainingPathwayId === id);

  if (!trainingPathway || !stats) {
    return <p>No encontrado</p>;
  }

  return <TrainingPathwayDetailCard trainingPathway={trainingPathway} stats={stats} />;
}
