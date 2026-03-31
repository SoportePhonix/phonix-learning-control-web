'use client';

import { TrainingPathwayDetailCard } from '@/app/(users)/trainingPathways/components/trainingPathways-detail-card/TrainingPathwaysDetailCard';
import { TrainingPathwayCoursesTable } from '@/app/(users)/trainingPathways/components/trainingPathways-detail-card/info/trainingPathwayCoursesTable';
import { PageHeader } from '@/components/page-header';

import { coursesByTrainingPathway } from '../../hooks/info/courses/courses.mock';
import { trainingPathwaysMock } from '../../hooks/trainingPathways.mock';
import { trainingPathwaysStatsMock } from '../../hooks/trainingPathwaysStats.mock';

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
      <PageHeader title="Rutas de información" />
      <TrainingPathwayDetailCard trainingPathway={trainingPathway} stats={stats} />
      <div className="py-12">
        <PageHeader title="Cursos" />
        <h2 className="text-sm font-medium text-[#3A484C] mb-4">{trainingPathway.name}</h2>
        <TrainingPathwayCoursesTable data={courses} />
      </div>
    </div>
  );
}
