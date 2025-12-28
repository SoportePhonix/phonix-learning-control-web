import { TrainingPathwayCourse } from './courses.types';

export const coursesByTrainingPathway: Record<string, TrainingPathwayCourse[]> = {
  '1': [
    // Fundamentos de reclutamiento y selección
    {
      code: 'N001',
      name: 'Introducción al Reclutamiento y Selección de Personal',
      startDate: '15/01/2025',
      endDate: '---',
      status: 'Activo',
    },
    {
      code: 'N002',
      name: 'Rol del Reclutador en la Organización',
      startDate: '03/02/2025',
      endDate: '---',
      status: 'Activo',
    },
    {
      code: 'N003',
      name: 'Tipos de Contratación y Modalidades Laborales',
      startDate: '28/01/2025',
      endDate: '---',
      status: 'Activo',
    },
    {
      code: 'N004',
      name: 'Ética y Confidencialidad en Procesos de Selección',
      startDate: '10/02/2025',
      endDate: '---',
      status: 'Inactivo',
    },
    {
      code: 'N006',
      name: 'Evaluación por Competencias',
      startDate: '05/02/2025',
      endDate: '---',
      status: 'Activo',
    },
  ],

  '2': [
    // Atracción de talento y employer branding
    {
      code: 'N005',
      name: 'Employer Branding: Conceptos y Estrategias',
      startDate: '20/01/2025',
      endDate: '---',
      status: 'Activo',
    },
    {
      code: 'N006',
      name: 'Evaluación por Competencias',
      startDate: '05/02/2025',
      endDate: '---',
      status: 'Activo',
    },
    {
      code: 'N008',
      name: 'Reclutamiento apoyado en Inteligencia Artificial',
      startDate: '12/02/2025',
      endDate: '---',
      status: 'Activo',
    },
    {
      code: 'N009',
      name: 'Marketing Digital para RRHH',
      startDate: '18/02/2025',
      endDate: '---',
      status: 'Activo',
    },
    {
      code: 'N010',
      name: 'Estrategias de Comunicación Organizacional',
      startDate: '25/02/2025',
      endDate: '---',
      status: 'Activo',
    },
    {
      code: 'N011',
      name: 'Cultura Organizacional y Valores',
      startDate: '---',
      endDate: '---',
      status: 'Inactivo',
    },
  ],

  '3': [
    // Evaluación y entrevista de candidatos
    {
      code: 'N006',
      name: 'Evaluación por Competencias',
      startDate: '05/02/2025',
      endDate: '---',
      status: 'Activo',
    },
    {
      code: 'N012',
      name: 'Técnicas de Entrevista Efectiva',
      startDate: '15/02/2025',
      endDate: '---',
      status: 'Activo',
    },
    {
      code: 'N013',
      name: 'Pruebas Psicométricas y de Personalidad',
      startDate: '---',
      endDate: '---',
      status: 'Inactivo',
    },
    {
      code: 'N014',
      name: 'Assessment Center y Dinámicas Grupales',
      startDate: '22/02/2025',
      endDate: '---',
      status: 'Activo',
    },
  ],

  '4': [
    // Herramientas digitales para reclutamiento
    {
      code: 'N007',
      name: 'Uso de Sistemas ATS (Applicant Tracking Systems)',
      startDate: '18/01/2025',
      endDate: '---',
      status: 'Activo',
    },
    {
      code: 'N008',
      name: 'Reclutamiento apoyado en Inteligencia Artificial',
      startDate: '12/02/2025',
      endDate: '---',
      status: 'Activo',
    },
    {
      code: 'N015',
      name: 'LinkedIn Recruiter y Redes Profesionales',
      startDate: '28/01/2025',
      endDate: '---',
      status: 'Activo',
    },
    {
      code: 'N016',
      name: 'Análisis de Datos y Métricas de Reclutamiento',
      startDate: '---',
      endDate: '---',
      status: 'Inactivo',
    },
    {
      code: 'N017',
      name: 'Automatización de Procesos de Selección',
      startDate: '05/02/2025',
      endDate: '---',
      status: 'Activo',
    },
    {
      code: 'N018',
      name: 'Plataformas de Video Entrevistas',
      startDate: '---',
      endDate: '---',
      status: 'Inactivo',
    },
    {
      code: 'N019',
      name: 'Big Data en Recursos Humanos',
      startDate: '15/02/2025',
      endDate: '---',
      status: 'Activo',
    },
  ],

  '5': [
    // Gestión de Procesos Operativos
    {
      code: 'N020',
      name: 'Introducción a la Gestión por Procesos',
      startDate: '10/01/2025',
      endDate: '---',
      status: 'Activo',
    },
    {
      code: 'N021',
      name: 'Optimización y Mejora Continua',
      startDate: '---',
      endDate: '---',
      status: 'Inactivo',
    },
    {
      code: 'N022',
      name: 'Lean Management y Six Sigma',
      startDate: '25/01/2025',
      endDate: '---',
      status: 'Activo',
    },
  ],

  '6': [
    // Estrategia de Marketing
    {
      code: 'N009',
      name: 'Marketing Digital para RRHH',
      startDate: '18/02/2025',
      endDate: '---',
      status: 'Activo',
    },
    {
      code: 'N023',
      name: 'Estrategias de Marketing Digital',
      startDate: '12/01/2025',
      endDate: '---',
      status: 'Activo',
    },
    {
      code: 'N024',
      name: 'Content Marketing y Storytelling',
      startDate: '20/01/2025',
      endDate: '---',
      status: 'Activo',
    },
    {
      code: 'N025',
      name: 'SEO y SEM',
      startDate: '28/01/2025',
      endDate: '---',
      status: 'Activo',
    },
    {
      code: 'N026',
      name: 'Social Media Marketing',
      startDate: '---',
      endDate: '---',
      status: 'Inactivo',
    },
    {
      code: 'N027',
      name: 'Email Marketing y Automatización',
      startDate: '05/02/2025',
      endDate: '---',
      status: 'Activo',
    },
    {
      code: 'N028',
      name: 'Analítica Web y Google Analytics',
      startDate: '12/02/2025',
      endDate: '---',
      status: 'Activo',
    },
    {
      code: 'N029',
      name: 'Publicidad Digital y Performance Marketing',
      startDate: '---',
      endDate: '---',
      status: 'Inactivo',
    },
  ],

  '7': [
    // Excelencia en Servicio al Cliente
    {
      code: 'N030',
      name: 'Fundamentos del Servicio al Cliente',
      startDate: '15/01/2025',
      endDate: '---',
      status: 'Activo',
    },
    {
      code: 'N031',
      name: 'Comunicación Efectiva con el Cliente',
      startDate: '22/01/2025',
      endDate: '---',
      status: 'Activo',
    },
    {
      code: 'N032',
      name: 'Manejo de Quejas y Conflictos',
      startDate: '---',
      endDate: '---',
      status: 'Inactivo',
    },
    {
      code: 'N033',
      name: 'Fidelización de Clientes',
      startDate: '05/02/2025',
      endDate: '---',
      status: 'Activo',
    },
  ],

  '8': [
    // Gestión de la Experiencia del Cliente
    {
      code: 'N034',
      name: 'Customer Experience Management',
      startDate: '08/01/2025',
      endDate: '---',
      status: 'Activo',
    },
    {
      code: 'N035',
      name: 'Diseño de Experiencias de Usuario',
      startDate: '15/01/2025',
      endDate: '---',
      status: 'Activo',
    },
    {
      code: 'N036',
      name: 'Journey Mapping y Touchpoints',
      startDate: '22/01/2025',
      endDate: '---',
      status: 'Activo',
    },
    {
      code: 'N037',
      name: 'Métricas de Satisfacción del Cliente',
      startDate: '---',
      endDate: '---',
      status: 'Inactivo',
    },
    {
      code: 'N038',
      name: 'Voice of Customer y Feedback Management',
      startDate: '05/02/2025',
      endDate: '---',
      status: 'Activo',
    },
    {
      code: 'N039',
      name: 'Omnicanalidad en la Experiencia del Cliente',
      startDate: '12/02/2025',
      endDate: '---',
      status: 'Activo',
    },
  ],
};
