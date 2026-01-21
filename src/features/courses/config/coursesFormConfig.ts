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
      name: 'status',
      label: 's.status',
      type: 'select',
      required: true,
    },
    {
      name: 'summary',
      label: 's.summary',
      type: 'textarea',
      placeholder: 'e.enterAValue',
      required: false,
      colSpan: 2,
    },
    {
      name: 'startDate',
      label: 's.startDate',
      type: 'date',
      required: false,
    },
    {
      name: 'endDate',
      label: 'e.endDate',
      type: 'date',
      required: false,
    },
    {
      name: 'companyId',
      label: 'c.company',
      type: 'select',
      placeholder: 's.selectAnOption',
      required: true,
      options: [],
    },
  ],
};
