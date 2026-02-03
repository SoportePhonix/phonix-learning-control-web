import { FormConfig } from '@/components/forms/DynamicForm/types';

export const areasFormConfig: FormConfig = {
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
      required: true,
    },
    {
      name: 'status',
      label: 's.status',
      type: 'select',
      placeholder: 'e.enterAValue',
      required: false,
    },
    {
      name: 'companyId',
      label: 'c.company',
      type: 'select',
      placeholder: 'e.enterAValue',
      required: true,
    },
  ],
  columns: 2,
};
