import { SectionTitle } from '@/components/section-title';
import { TrainingPathwayDetailCard } from '@/components/trainingPathways-detail-card/TrainingPathwaysDetailCard';
import { TrainingPathwayCoursesTable } from '@/components/trainingPathways-detail-card/info/trainingPathwayCoursesTable';
import { coursesByTrainingPathway } from '@/hooks/trainingPathways/info/courses/courses.mock';
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

  const courses = coursesByTrainingPathway[id] ?? [];

  return (
    <div className="p-8 mb-20 h-full w-full flex flex-col">
      <SectionTitle title="Rutas de información" />
      <TrainingPathwayDetailCard trainingPathway={trainingPathway} stats={stats} />
      <div className="py-12">
        <SectionTitle title="Cursos" />
        <h2 className="text-sm font-medium text-[#3A484C] mb-4">{trainingPathway.name}</h2>
        <TrainingPathwayCoursesTable data={courses} />
      </div>
    </div>
  );
}
