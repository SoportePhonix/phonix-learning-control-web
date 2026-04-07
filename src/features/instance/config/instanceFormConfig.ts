import { FormConfig } from '@/components/forms/DynamicForm/types';

export const instanceFormConfig: FormConfig = {
  fields: [
    {
      name: 'nit',
      label: 'n.nit',
      type: 'text',
      placeholder: 'e.enterAValue',
      required: true,
      validation: {
        pattern: /^\S+$/,
        patternMessage: 'n.nitCannotContainSpaces',
      },
    },
    {
      name: 'name',
      label: 'n.name',
      type: 'text',
      placeholder: 'e.enterAValue',
      required: true,
    },
    {
      name: 'description',
      label: 'd.description',
      type: 'text',
      placeholder: 'e.enterAValue',
      required: true,
    },
    {
      name: 'status',
      label: 's.status',
      type: 'select',
      placeholder: 'e.enterAValue',
      required: false,
    },
  ],
  columns: 2,
};
