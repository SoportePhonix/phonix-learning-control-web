'use client';

import { SectionTitle } from '@/components/section-title';
import { StudentDetailCard } from '@/components/student-detail-card/StudentDetailCard';
import { RecruitmentAndSelectionTable } from '@/components/student-detail-card/info/recruitmentAndSelection/recruitmentAndSelectionTable';
import { TrainingRoutesTable } from '@/components/student-detail-card/info/trainingRoute/trainingRoutesTable';
import { DataTable } from '@/components/ui/data-table';
import { studentsColumns } from '@/hooks/students/columns';
import { studentStatsMock } from '@/hooks/students/studentStats.mock';
import { studentsMock } from '@/hooks/students/students.mock';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function StudentInfoPage() {
  const { id } = useParams<{ id: string }>();

  const student = studentsMock.find((s) => s.id === id);
  const stats = studentStatsMock.find((s) => s.studentId === id);

  if (!student || !stats) {
    return <div>Estudiante no encontrado</div>;
  }

  return (
    <div className="p-8 mb-20 h-full w-full flex flex-col">
      <SectionTitle title="Detalle de estudiante" />
      <div className="grid grid-cols-7 gap-4">
        <div className="col-span-3">
          <StudentDetailCard student={student} stats={stats} />
        </div>
        <div className=" h-full w-full flex flex-col">
          <div className="whitespace-nowrap text-sm">
            <SectionTitle title="Rutas de formación" />
          </div>
          <Link href={'/courses'} className="underline underline-offset-4 hover:no-underline">
            Todos los cursos
          </Link>
          <TrainingRoutesTable></TrainingRoutesTable>
        </div>
      </div>
      <div className=" h-full w-full flex flex-col">
        <div className="whitespace-nowrap text-sm">
          <SectionTitle title="Cursos" />
        </div>
        <h2>Fundamentos del Reclutamiento y Selección</h2>

        <RecruitmentAndSelectionTable></RecruitmentAndSelectionTable>
      </div>
    </div>
  );
}
