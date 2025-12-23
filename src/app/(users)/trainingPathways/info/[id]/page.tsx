import { SectionTitle } from '@/components/section-title';
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

  return (
    <div>
      <SectionTitle title="Rutas de información" />
      <TrainingPathwayDetailCard trainingPathway={trainingPathway} stats={stats} />
      <div className="py-12">
        <SectionTitle title="Cursos" />
      </div>
    </div>
  );
}
