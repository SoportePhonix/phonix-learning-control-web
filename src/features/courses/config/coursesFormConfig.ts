import { FormConfig } from '@/components/forms/DynamicForm/types';

export const coursesFormConfig: FormConfig = {
  fields: [
    {
      name: 'fullName',
      label: 'f.fullName',
      type: 'text',
      placeholder: 'e.enterAValue',
      required: true,
    },
    {
      name: 'shortName',
      label: 's.shortName',
      type: 'text',
      placeholder: 'e.enterAValue',
      required: true,
    },
    {
      name: 'categoryId',
      label: 'c.categoryId',
      type: 'number',
      placeholder: 'e.enterAValue',
      required: true,
    },
    {
      name: 'summary',
      label: 's.summary',
      type: 'text',
      placeholder: 'e.enterAValue',
      required: true,
    },
    {
      name: 'visible',
      label: 'v.visible',
      type: 'select',
      placeholder: 'e.enterAValue',
      required: true,
    },
    {
      name: 'starDate',
      label: 's.startDate',
      type: 'select',
      placeholder: 'e.enterAValue',
      required: true,
    },
    {
      name: 'endDate',
      label: 'e.endDate',
      type: 'select',
      placeholder: 'e.enterAValue',
      required: true,
    },
  ],
  columns: 2,
};
