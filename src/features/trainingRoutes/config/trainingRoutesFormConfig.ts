import { FormConfig } from '@/components/forms/DynamicForm/types';

export const trainingRoutesFormConfig: FormConfig = {
  fields: [
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
      required: false,
    },
    {
      name: 'companyId',
      label: 'c.company',
      type: 'select-search',
      placeholder: 'e.enterAValue',
      required: true,
    },
    {
      name: 'areaId',
      label: 'a.area',
      type: 'select-search',
      placeholder: 'e.enterAValue',
      required: false,
    },
    {
      name: 'positionId',
      label: 'p.post',
      type: 'select-search',
      placeholder: 'e.enterAValue',
      required: false,
    },
  ],
  columns: 2,
};
