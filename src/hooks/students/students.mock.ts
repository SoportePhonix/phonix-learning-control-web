export type Student = {
  id: string;
  document: string;
  name: string;
  email: string;
  area: string;
  role: string;
};

export const studentsMock: Student[] = [
  {
    id: '1',
    document: '1023456789',
    name: 'Ana Morales',
    email: 'ana.morales@gmail.com',
    area: 'Recursos Humanos',
    role: 'Reclutador',
  },
  {
    id: '2',
    document: '1034567890',
    name: 'Luis Fernández',
    email: 'luis.fernandez@gmail.com',
    area: 'Contabilidad',
    role: 'Tesorero',
  },
  {
    id: '3',
    document: '1045678901',
    name: 'Camila Rojas',
    email: 'camila.rojas@gmail.com',
    area: 'Marketing',
    role: 'Gerente de Ventas',
  },
  {
    id: '4',
    document: '1056789012',
    name: 'Pedro Castillo',
    email: 'pedro.castillo@gmail.com',
    area: 'Tecnología',
    role: 'Soporte Técnico',
  },
];
