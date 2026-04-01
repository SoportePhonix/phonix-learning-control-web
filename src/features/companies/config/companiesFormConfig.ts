import { FormConfig } from '@/components/forms/DynamicForm/types';

export const companiesFormConfig: FormConfig = {
  fields: [
    {
      name: 'name',
      label: 'n.name',
      type: 'text',
      placeholder: 'e.enterAValue',
      required: true,
    },
    {
      name: 'nit',
      label: 'n.nit',
      type: 'text',
      placeholder: 'e.enterAValue',
      required: true,
    },
    {
      name: 'email',
      label: 'e.email',
      type: 'email',
      placeholder: 'e.enterAValue',
      required: true,
    },
    {
      name: 'status',
      label: 's.status',
      type: 'select',
      placeholder: 'e.enterAValue',
      required: true,
    },
  ],
  columns: 2,
};
