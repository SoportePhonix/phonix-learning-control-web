import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Pen } from 'lucide-react';

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
    <Card className="max-w-[505px] max-h-[582px] p-8 flex flex-col gap-1 rounded-[8px] border-[#3A5761]/35">
      <CardHeader className="py-4 flex flex-col items-center gap-2">
        <Avatar className="h-14 w-14">
          <AvatarFallback className="text-sm font-normal bg-red-300 text-white ">{initials}</AvatarFallback>
        </Avatar>
        <p className="text-[18px] font-semibold leading-none text-[#3A484C]">{student.name}</p>
        <div className="flex text-[14px] font-normal leading-none text-[#0067D7] pt-4 cursor-not-allowed">
          <Pen size={16} />
          <span className="mt-0.5 mx-2 border-b-[1px] border-[#0067D7]">Editar información del estudiante</span>
        </div>
      </CardHeader>

      <CardContent className="w-full flex flex-col gap-6 p-0">
        <div className="relative grid grid-cols-3 items-center justify-center py-2 w-full border-y border-[#3A5761]/35">
          <div className="flex flex-col items-center relative">
            <p className="text-[32px] font-light leading-none text-[#0B262E] py-5">4</p>
            <p className="text-[18px] font-semibold leading-none text-[#3A484C]">Rutas</p>
          </div>

          <div className="flex flex-col items-center text-center border-[#3A5761]/35 border-x py-6">
            <p className="text-[32px] font-light leading-none text-[#0B262E] py-5">15</p>
            <p className="text-[18px] font-semibold leading-none text-[#3A484C]">Cursos</p>
          </div>

          <div className="flex items-center justify-center ">
            <CircularProgress value={stats.progress} />
          </div>
        </div>

        <div className="grid grid-cols-[1fr_auto] gap-y-7 w-full">
          <span className="text-[16px] font-bold leading-none text-[#3A484C]">Documento</span>
          <span className="text-[18px] font-normal leading-none text-[#0B262E] ">{student.document}</span>

          <span className="text-[16px] font-bold leading-none text-[#3A484C]">Correo</span>
          <span className="text-[18px] font-normal leading-none text-[#0B262E] ">{student.email}</span>

          <span className="text-[16px] font-bold leading-none text-[#3A484C]">Área</span>
          <span className="text-[18px] font-normal leading-none text-[#0B262E] ">{student.area}</span>

          <span className="text-[16px] font-bold leading-none text-[#3A484C]">Cargo</span>
          <span className="text-[18px] font-normal leading-none text-[#0B262E] ">{student.role}</span>
        </div>
      </CardContent>
    </Card>
  );
}
