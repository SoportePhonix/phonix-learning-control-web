export type TrainingPathway = {
  id: string;
  code: string;
  name: string;
  company: string;
  area: string;
  role: string;
  courses: number;
  students: number;
};

export const trainingPathwaysMock: TrainingPathway[] = [
  {
    id: '1',
    code: 'N001',
    name: 'Fundamentos de reclutamiento y selección',
    company: 'Phonix Network',
    area: 'Recursos Humanos',
    role: 'Reclutador',
    courses: 5,
    students: 4,
  },
  {
    id: '2',
    code: 'N002',
    name: 'Atracción de talento y employer branding',
    company: 'Phonix Network',
    area: 'Marketing',
    role: 'Analista de Marketing',
    courses: 6,
    students: 5,
  },
  {
    id: '3',
    code: 'N003',
    name: 'Evaluación y entrevista de candidatos',
    company: 'Phonix Network',
    area: 'Recursos Humanos',
    role: 'Analista de Recursos Humanos',
    courses: 4,
    students: 3,
  },
  {
    id: '4',
    code: 'N004',
    name: 'Herramientas digitales para reclutamiento',
    company: 'Phonix Network',
    area: 'Operaciones',
    role: 'Analista de Operaciones',
    courses: 7,
    students: 6,
  },
  {
    id: '5',
    code: 'N005',
    name: 'Gestión de Procesos Operativos',
    company: 'Phonix Network',
    area: 'Operaciones',
    role: 'Analista de Operaciones',
    courses: 3,
    students: 2,
  },
  {
    id: '6',
    code: 'N006',
    name: 'Estrategia de Marketing',
    company: 'Phonix Network',
    area: 'Marketing',
    role: 'Analista de Marketing',
    courses: 8,
    students: 5,
  },
  {
    id: '7',
    code: 'N007',
    name: 'Excelencia en Servicio al Cliente',
    company: 'Phonix Network',
    area: 'Servicio al cliente',
    role: 'Agente de servicio al cliente',
    courses: 4,
    students: 3,
  },
  {
    id: '8',
    code: 'N008',
    name: 'Gestión de la Experiencia del Cliente',
    company: 'Phonix Network',
    area: 'Servicio al cliente',
    role: 'Coordinador de servicio al cliente',
    courses: 6,
    students: 6,
  },
];
