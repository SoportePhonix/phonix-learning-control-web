import { FormConfig } from '@/components/forms/DynamicForm/types';

export const loginFormConfig: FormConfig = {
  columns: 1,
  fields: [
    {
      name: 'email',
      label: 'e.emailAddress',
      type: 'email',
      placeholder: 'e.emailAddress',
      required: true,
      validation: {
        pattern: /\S+@\S+\.\S+/,
        patternMessage: 'i.invalid',
      },
    },
    {
      name: 'password',
      label: 'p.password',
      type: 'password',
      placeholder: 'p.password',
      required: true,
      validation: {
        patternMessage: 'c.correctEmailAndOrPassword',
      },
    },
  ],
};
