export type CourseStatus = 'Activo' | 'Inactivo';

export type Course = {
  id: string;
  code: string;
  name: string;
  infoRoutes: number;
  students: number;
  startDate: string;
  endDate: string;
  status: CourseStatus;
};

export const coursesMock: Course[] = [
  {
    id: '1',
    code: 'N001',
    name: 'Introducción al Reclutamiento y Selección de Personal',
    infoRoutes: 2,
    students: 12,
    startDate: '2025-01-15',
    endDate: '---',
    status: 'Activo',
  },
  {
    id: '2',
    code: 'N002',
    name: 'Rol del Reclutador en la Organización',
    infoRoutes: 4,
    students: 8,
    startDate: '2025-02-03',
    endDate: '---',
    status: 'Inactivo',
  },
  {
    id: '3',
    code: 'N003',
    name: 'Tipos de Contratación y Modalidades Laborales',
    infoRoutes: 1,
    students: 15,
    startDate: '2025-01-28',
    endDate: '---',
    status: 'Activo',
  },
  {
    id: '4',
    code: 'N004',
    name: 'Ética y Confidencialidad en Procesos de Selección',
    infoRoutes: 3,
    students: 6,
    startDate: '2025-02-10',
    endDate: '---',
    status: 'Inactivo',
  },
  {
    id: '5',
    code: 'N005',
    name: 'Employer Branding: Conceptos y Estrategias',
    infoRoutes: 2,
    students: 9,
    startDate: '2025-01-20',
    endDate: '---',
    status: 'Activo',
  },
  {
    id: '6',
    code: 'N006',
    name: 'Evaluación por Competencias',
    infoRoutes: 4,
    students: 14,
    startDate: '2025-02-05',
    endDate: '---',
    status: 'Activo',
  },
  {
    id: '7',
    code: 'N007',
    name: 'Uso de Sistemas ATS (Applicant Tracking Systems)',
    infoRoutes: 1,
    students: 5,
    startDate: '2025-01-18',
    endDate: '---',
    status: 'Inactivo',
  },
  {
    id: '8',
    code: 'N008',
    name: 'Reclutamiento apoyado en Inteligencia Artificial',
    infoRoutes: 3,
    students: 11,
    startDate: '2025-02-12',
    endDate: '---',
    status: 'Activo',
  },
];
