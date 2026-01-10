export type TrainingRoute = {
  id: string;
  name: string;
  courses: number;
  progress: number;
};

export const trainingRoutesMock: TrainingRoute[] = [
  {
    id: '1',
    name: 'Fundamentos del Reclutamiento y Selección',
    courses: 4,
    progress: 30,
  },
  {
    id: '2',
    name: 'Atracción de Talento y Employer Branding',
    courses: 3,
    progress: 15,
  },
  {
    id: '3',
    name: 'Evaluación y Entrevista de Candidatos',
    courses: 5,
    progress: 5,
  },
  {
    id: '4',
    name: 'Herramientas Digitales para Reclutamiento',
    courses: 3,
    progress: 0,
  },
];
