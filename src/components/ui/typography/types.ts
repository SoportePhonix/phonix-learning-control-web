import React, { ReactNode } from 'react';

type TypographyVariant =
  | 'titulo_pequeno'
  | 'titulo_base'
  | 'titulo_medio'
  | 'titulo_grande'
  | 'parrafo-pequeno'
  | 'parrafo'
  | 'parrafo_base'
  | 'parrafo_medio'
  | 'subtitulo'
  | 'subtitulo_pequeno';

export interface TypographyProps {
  children: ReactNode;
  className?: string;
  tag?: React.ElementType;
  variant?: TypographyVariant;
}
