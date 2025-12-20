'use client';

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
    <div className="pt-10 px-2 h-full w-full flex flex-col">
      <Typography variant="titulo_medio" className="text-var--negro font-light mb-4">
        Detalle de estudiante
      </Typography>
      <div className="p-6 flex">
        {/* Card a la izquierda */}
        <StudentDetailCard student={student} stats={stats} />
      </div>
    </div>
  );
}
