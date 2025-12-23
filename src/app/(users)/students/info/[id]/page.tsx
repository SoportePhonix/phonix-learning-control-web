'use client';

import { useState } from 'react';

import { SectionTitle } from '@/components/section-title';
import { StudentDetailCard } from '@/components/student-detail-card/StudentDetailCard';
import { RecruitmentAndSelectionTable } from '@/components/student-detail-card/info/recruitmentAndSelection/recruitmentAndSelectionTable';
import { TrainingRoutesTable } from '@/components/student-detail-card/info/trainingRoute/trainingRoutesTable';
import { recruitmentAndSelectionByRoute } from '@/hooks/students/info/recruitmentAndSelection/recruitmentAndSelection.mock';
import { trainingRoutesMock } from '@/hooks/students/info/trainingRoute/trainingRoutes.mock';
import { TrainingRoute } from '@/hooks/students/info/trainingRoute/trainingRoutes.types';
import { studentStatsMock } from '@/hooks/students/studentStats.mock';
import { studentsMock } from '@/hooks/students/students.mock';
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

      <div className="grid grid-cols-7 gap-4">
        <div className="col-span-3">
          <StudentDetailCard student={student} stats={stats} />
        </div>

        <div className="h-full w-full flex flex-col">
          <div className="whitespace-nowrap text-sm">
            <SectionTitle title="Rutas de formación" />
          </div>

          <Link href="/courses" className="underline underline-offset-4 hover:no-underline">
            Todos los cursos
          </Link>

          <TrainingRoutesTable onSelect={setSelectedRoute} selectedRouteId={selectedRoute?.id} />
        </div>
      </div>

      <div className="h-full w-full flex flex-col mt-6">
        <div className="whitespace-nowrap text-sm">
          <SectionTitle title="Cursos" />
        </div>

        <h2 className="text-sm font-medium text-[#3A484C]">
          {selectedRoute?.name ?? 'Selecciona una ruta de formación'}
        </h2>

        <RecruitmentAndSelectionTable data={filteredCourses} />
      </div>
    </div>
  );
}
