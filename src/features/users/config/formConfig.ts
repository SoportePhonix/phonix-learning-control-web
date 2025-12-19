import { FormConfig } from '@/components/forms/DynamicForm/types';

export const userFormConfig: FormConfig = {
  fields: [
    {
      name: 'name',
      label: 'n.name',
      type: 'text',
      placeholder: 'e.enterAValue',
      required: true, // Obligatorio en ambos modos
    },
    {
      name: 'lastName',
      label: 'l.lastName',
      type: 'text',
      placeholder: 'e.enterAValue',
      required: true, // Obligatorio en ambos modos
    },
    {
      name: 'typeOfIdentificationDocument',
      label: 't.typeOfIdentificationDocument',
      type: 'select',
      placeholder: 's.selectAnOption',
      required: true, // Obligatorio en ambos modos
      options: [], // Se llenará dinámicamente desde la página
    },
    {
      name: 'identificationDocument',
      label: 'i.identificationDocument',
      type: 'text',
      placeholder: 'e.enterAValue',
      required: true, // Obligatorio en ambos modos
    },
    {
      name: 'email',
      label: 'e.email',
      type: 'email',
      placeholder: 'e.enterAValue',
      required: true, // Obligatorio en ambos modos
    },
    {
      name: 'password',
      label: 'p.password',
      type: 'password',
      placeholder: 'e.enterAValue',
      required: { create: true, edit: false }, // Obligatorio solo al crear
      validation: {
        minLength: 8,
        minLengthMessage: 'p.passwordValidationMessage',
        pattern:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~£!@#$%^&*()\-_=+{}\[\]\\|:;"'<>,.?/])[A-Za-z\d~£!@#$%^&*()\-_=+{}\[\]\\|:;"'<>,.?/]{8,}$/,
        patternMessage: 'p.passwordValidationMessage',
      },
    },
    {
      name: 'roleId',
      label: 'r.role',
      type: 'select',
      placeholder: 's.selectAnOption',
      required: true, // Obligatorio en ambos modos
      options: [], // Se llenará dinámicamente desde la página
    },
  ],
  columns: 2,
};
