'use client';

import { useState } from 'react';

import { StudentDetailCard } from '@/app/(users)/students/components/student-detail-card/StudentDetailCard';
import { RecruitmentAndSelectionTable } from '@/app/(users)/students/components/student-detail-card/info/recruitmentAndSelection/recruitmentAndSelectionTable';
import { TrainingRoutesTable } from '@/app/(users)/students/components/student-detail-card/info/trainingRoute/trainingRoutesTable';
import { recruitmentAndSelectionByRoute } from '@/app/(users)/students/hooks/info/recruitmentAndSelection/recruitmentAndSelection.mock';
import { trainingRoutesMock } from '@/app/(users)/students/hooks/info/trainingRoute/trainingRoutes.mock';
import { TrainingRoute } from '@/app/(users)/students/hooks/info/trainingRoute/trainingRoutes.types';
import { studentStatsMock } from '@/app/(users)/students/hooks/studentStats.mock';
import { studentsMock } from '@/app/(users)/students/hooks/students.mock';
import { SectionTitle } from '@/components/section-title';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function StudentInfoPage() {
  const { id } = useParams<{ id: string }>();

  const student = studentsMock.find((s) => s.id === id);
  const stats = studentStatsMock.find((s) => s.studentId === id);

  const [selectedRoute, setSelectedRoute] = useState<TrainingRoute>(trainingRoutesMock[0]);

  if (!student || !stats) {
    return <div>Estudiante no encontrado</div>;
  }

  const filteredCourses = selectedRoute ? (recruitmentAndSelectionByRoute[selectedRoute.name] ?? []) : [];

  return (
    <div className="p-8 mb-20 h-full w-full flex flex-col">
      <SectionTitle title="Detalle de estudiante" />

      <div className="grid grid-cols-7 gap-12">
        <div className="col-span-3">
          <StudentDetailCard student={student} stats={stats} />
        </div>

        <div className="h-full w-full flex flex-col col-span-4">
          <SectionTitle title="Rutas de formación" />

          <Link href="/courses" className="underline underline-offset-4 hover:no-underline">
            Todos los cursos
          </Link>

          <TrainingRoutesTable onSelect={setSelectedRoute} selectedRouteId={selectedRoute?.id} />
        </div>
      </div>

      <div className="h-full w-full flex flex-col mt-6">
        <SectionTitle title="Cursos" />

        <h2 className="text-sm font-medium text-[#3A484C]">
          {selectedRoute?.name ?? 'Selecciona una ruta de formación'}
        </h2>

        <RecruitmentAndSelectionTable data={filteredCourses} />
      </div>
    </div>
  );
}
