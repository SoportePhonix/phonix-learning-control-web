import { HTMLProps } from 'react';

export interface Inputs {
  email: string;
  password: string;
}

export interface InputProps extends HTMLProps<HTMLInputElement> {
  label?: string;
  error?: string;
}
