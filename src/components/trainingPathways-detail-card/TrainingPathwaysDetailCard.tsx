import { Card, CardContent, CardHeader } from '@/components/ui/card';

type Props = {
  trainingPathway: {
    name: string;
    code: string;
    company: string;
    area: string;
    role: string;
  };
  stats: {
    courses: number;
    students: number;
  };
};

export function TrainingPathwayDetailCard({ trainingPathway, stats }: Props) {
  const initials = trainingPathway.name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('');

  return (
    <Card className="max-w-126.25 max-h-145.5 p-8 flex flex-col gap-1 rounded-[8px] border-[#3A5761]/35 bg-[#F6F9FB]">
      <CardHeader className="py-4 flex flex-col items-center gap-2">
        <p className="text-[25px] font-semibold leading-none text-[#3A484C] text-center">{trainingPathway.name}</p>

        <span className="text-[16px] font-bold text-[#3A484C]"></span>
        <span className="text-[18px] text-[#0B262E]">{trainingPathway.code}</span>
      </CardHeader>

      <CardContent className="w-full flex flex-col gap-6 p-0">
        {/* Métricas */}
        <div className="text-center relative grid grid-cols-1 items-center justify-center py-2 w-full border-y border-[#3A5761]/35">
          <div className="flex flex-col items-center py-6">
            <p className="text-[32px] font-light leading-none text-[#0B262E]">{stats.courses}</p>
            <p className="text-[18px] font-semibold leading-none text-[#3A484C]">Cursos</p>
          </div>
        </div>

        {/* Información */}
        <div className="grid grid-cols-[1fr_auto] gap-y-7 w-full">
          <span className="text-[16px] font-bold text-[#3A484C]">Estudiantes</span>
          <span className="text-[18px] text-[#0B262E]">{stats.students}</span>

          <span className="text-[16px] font-bold text-[#3A484C]">Empresa</span>
          <span className="text-[18px] text-[#0B262E]">{trainingPathway.company}</span>

          <span className="text-[16px] font-bold text-[#3A484C]">Área</span>
          <span className="text-[18px] text-[#0B262E]">{trainingPathway.area}</span>

          <span className="text-[16px] font-bold text-[#3A484C]">Cargo</span>
          <span className="text-[18px] text-[#0B262E]">{trainingPathway.role}</span>
        </div>
      </CardContent>
    </Card>
  );
}
