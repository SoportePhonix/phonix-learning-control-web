import { FormConfig } from '@/components/forms/DynamicForm/types';

export const coursesFormConfig: FormConfig = {
  columns: 2,
  fields: [
    {
      name: 'shortName',
      label: 's.shortName',
      type: 'text',
      placeholder: 'e.enterAValue',
      required: true,
    },
    {
      name: 'fullName',
      label: 'f.fullName',
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
      name: 'visible',
      label: 'v.visible',
      type: 'select',
      required: true,
    },
    {
      name: 'summary',
      label: 's.summary',
      type: 'textarea',
      placeholder: 'e.enterAValue',
      required: true,
      colSpan: 2,
    },
    {
      name: 'startDate',
      label: 's.startDate',
      type: 'date',
      required: true,
    },
    {
      name: 'endDate',
      label: 'e.endDate',
      type: 'date',
      required: true,
    },
  ],
};
