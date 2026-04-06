import { FormConfig } from '@/components/forms/DynamicForm/types';

export const lmsFormConfig: FormConfig = {
  fields: [
    {
      name: 'name',
      label: 'n.name',
      type: 'text',
      placeholder: 'e.enterAValue',
      required: true,
    },
    {
      name: 'type',
      label: 't.type',
      type: 'select',
      placeholder: 'e.enterAValue',
      required: true,
      options: [
        { value: 'moodle', label: 'Moodle' },
        { value: 'canvas', label: 'Canvas' },
      ],
    },
    {
      name: 'url',
      label: 'u.url',
      type: 'text',
      placeholder: 'u.urlPlaceholder',
      required: true,
    },
    {
      name: 'token',
      label: 't.token',
      type: 'text',
      placeholder: 'e.enterAValue',
      required: true,
    },
    {
      name: 'lmsIdExternal',
      label: 'l.lmsIdExternal',
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
      type: 'select-search',
      placeholder: 'e.enterAValue',
      required: true,
    },
  ],
  columns: 2,
};
