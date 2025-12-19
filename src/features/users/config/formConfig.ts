import { FormConfig } from '@/components/forms/DynamicForm/types';

export const userFormConfig: FormConfig = {
  fields: [
    {
      name: 'name',
      label: 'n.name',
      type: 'text',
      placeholder: 'e.enterAValue',
      required: { create: true, edit: false },
    },
    {
      name: 'lastName',
      label: 'l.lastName',
      type: 'text',
      placeholder: 'e.enterAValue',
      required: { create: true, edit: false },
    },
    {
      name: 'typeOfIdentificationDocument',
      label: 't.typeOfIdentificationDocument',
      type: 'select',
      placeholder: 's.selectAnOption',
      required: { create: true, edit: false },
      options: [], // Se llenará dinámicamente desde la página
    },
    {
      name: 'identificationDocument',
      label: 'i.identificationDocument',
      type: 'text',
      placeholder: 'e.enterAValue',
      required: { create: true, edit: false },
    },
    {
      name: 'email',
      label: 'e.email',
      type: 'email',
      placeholder: 'e.enterAValue',
      required: { create: true, edit: false },
    },
    {
      name: 'password',
      label: 'p.password',
      type: 'password',
      placeholder: 'e.enterAValue',
      required: { create: true, edit: false },
    },
    {
      name: 'roleId',
      label: 'r.role',
      type: 'select',
      placeholder: 's.selectAnOption',
      required: { create: true, edit: false },
      options: [], // Se llenará dinámicamente desde la página
    },
  ],
  columns: 2,
};
