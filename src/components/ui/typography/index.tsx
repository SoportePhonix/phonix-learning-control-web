import cs from 'classnames';

import styles from './styles.module.css';
import { TypographyProps } from './types';

export const Typography = ({ children, tag, variant, className }: TypographyProps) => {
  const Tag = tag || ('h1' as React.ElementType);

  return (
    <Tag
      className={cs(
        {
          [styles['typography--titulo_pequeno']]: variant === 'titulo_pequeno',
          [styles['typography--titulo_base']]: variant === 'titulo_base',
          [styles['typography--titulo_medio']]: variant === 'titulo_medio',
          [styles['typography--titulo_grande']]: variant === 'titulo_grande',
          [styles['typography--parrafo-pequeno']]: variant === 'parrafo-pequeno',
          [styles['typography--parrafo']]: variant === 'parrafo',
          [styles['typography--parrafo_medio']]: variant === 'parrafo_medio',
          [styles['typography--parrafo_base']]: variant === 'parrafo_base',
          [styles['typography--subtitulo']]: variant === 'subtitulo',
          [styles['typography--subtitulo_pequeno']]: variant === 'subtitulo_pequeno',
        },
        className
      )}
    >
      {children}
    </Tag>
  );
};
