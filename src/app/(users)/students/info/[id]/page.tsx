'use client';

import { SectionTitle } from '@/components/section-title';
import { StudentDetailCard } from '@/components/student-detail-card/StudentDetailCard';
import { Typography } from '@/components/ui/typography';
import { studentStatsMock } from '@/hooks/students/studentStats.mock';
import { studentsMock } from '@/hooks/students/students.mock';
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
        <div className="col-span-4 bg-yellow-300">Aca poner la tabla</div>
      </div>
    </div>
  );
}
