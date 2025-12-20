import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

import { CircularProgress } from './CircularProgress';

type Props = {
  student: {
    name: string;
    document: string;
    email: string;
    area: string;
    role: string;
  };
  stats: {
    routes: number;
    courses: number;
    progress: number;
  };
};

export function StudentDetailCard({ student, stats }: Props) {
  const initials = student.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <Card className="w-[505px] h-[582px] p-[19px_21px] flex flex-col gap-[10px]">
      <CardHeader className="p-0 flex flex-col items-center gap-2">
        <Avatar className="h-14 w-14">
          <AvatarFallback className="text-sm font-semibold">{initials}</AvatarFallback>
        </Avatar>
        <p className="text-[18px] font-semibold leading-none text-[#1F2A37]">{student.name}</p>
        <div className="border-b border-[#3A576133] w-full pt-2" />
      </CardHeader>

      <CardContent className="w-[448px] flex flex-col gap-[23px] p-0">
        <div className="relative flex items-center px-[18px] py-[15px]">
          {/* Rutas (más angosto) */}
          <div className="flex flex-col items-center gap-[6px] w-[90px]">
            <p className="text-[32px] font-light leading-none text-[#1F2A37]">4</p>
            <p className="text-[18px] font-semibold leading-none text-[#4B5563]">Rutas</p>
          </div>

          {/* Línea 1 */}
          <div className="h-[100px] w-px bg-[#3A576133] mx-[28px]" />

          {/* Cursos (más ancho) */}
          <div className="flex flex-col items-center gap-[6px] w-[150px]">
            <p className="text-[32px] font-light leading-none text-[#1F2A37]">15</p>
            <p className="text-[18px] font-semibold leading-none text-[#4B5563]">Cursos totales</p>
          </div>

          {/* Línea 2 */}
          <div className="h-[100px] w-px bg-[#3A576133] mx-[28px]" />

          {/* Progreso (el más ancho) */}
          <div className="flex items-center justify-center w-[127px]">
            <CircularProgress value={stats.progress} />
          </div>

          {/* Línea inferior */}
          <div className="absolute left-[9px] bottom-0 h-px w-[445px] bg-[#3A576133]" />
        </div>

        <div className="grid grid-cols-[1fr_auto] gap-y-[25px] gap-x-[24px] w-full">
          <span className="text-[16px] font-semibold leading-none text-[#4B5563]">Documento</span>
          <span className="text-[18px] font-normal leading-none text-[#1F2A37] ">{student.document}</span>

          <span className="text-[16px] font-semibold leading-none text-[#4B5563]">Correo</span>
          <span className="text-[18px] font-normal leading-none text-[#1F2A37] ">{student.email}</span>

          <span className="text-[16px] font-semibold leading-none text-[#4B5563]">Área</span>
          <span className="text-[18px] font-normal leading-none text-[#1F2A37] ">{student.area}</span>

          <span className="text-[16px] font-semibold leading-none text-[#4B5563]">Cargo</span>
          <span className="text-[18px] font-normal leading-none text-[#1F2A37] ">{student.role}</span>
        </div>
      </CardContent>
    </Card>
  );
}
