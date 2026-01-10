import { FormConfig } from '@/components/forms/DynamicForm/types';

export const userFormConfig: FormConfig = {
  fields: [
    {
      name: 'name',
      label: 'n.name',
      type: 'text',
      placeholder: 'e.enterAValue',
      required: true,
    },
    {
      name: 'lastName',
      label: 'l.lastName',
      type: 'text',
      placeholder: 'e.enterAValue',
      required: true,
    },
    {
      name: 'typeOfIdentificationDocument',
      label: 't.typeOfIdentificationDocument',
      type: 'select',
      placeholder: 's.selectAnOption',
      required: true,
      options: [], // Se llenará dinámicamente desde la página
    },
    {
      name: 'identificationDocument',
      label: 'i.identificationDocument',
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
      name: 'password',
      label: 'p.password',
      type: 'password',
      placeholder: 'e.enterAValue',
      required: { create: true, edit: false },
      validation: {
        minLength: 8,
        minLengthMessage: 'p.passwordValidationMessage',
        pattern:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~£!@#$%^&*()\-_=+{}\[\]\\|:;"'<>,.?/])[A-Za-z\d~£!@#$%^&*()\-_=+{}\[\]\\|:;"'<>,.?/]{8,}$/,
        patternMessage: 'p.passwordValidationMessage',
      },
      errorTooltip: true,
      errorTooltipTrigger: 'r.reviewPassword',
    },
    {
      name: 'roleId',
      label: 'r.role',
      type: 'select',
      placeholder: 's.selectAnOption',
      required: true,
      options: [],
    },
    {
      name: 'companyId',
      type: 'select',
      label: 'c.company',
      required: false,
    },
  ],
  columns: 2,
};
