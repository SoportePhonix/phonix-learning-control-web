import { a } from './a';
import { b } from './b';
import { c } from './c';
import { d } from './d';
import { e } from './e';
import { f } from './f';
import { g } from './g';
import { h } from './h';
import { i } from './i';
import { l } from './l';
import { m } from './m';
import { n } from './n';
import { o } from './o';
import { p } from './p';
import { q } from './q';
import { r } from './r';
import { s } from './s';
import { t } from './t';
import { u } from './u';
import { v } from './v';
import { w } from './w';
import { y } from './y';

export const es = {
  a,
  b,
  c,
  d,
  e,
  f,
  g,
  h,
  i,
  l,
  m,
  n,
  o,
  p,
  q,
  r,
  s,
  t,
  u,
  v,
  w,
  y,
};

export type TranslationKeys = {
  [K in keyof typeof es]: {
    [P in keyof (typeof es)[K]]: string;
  };
};
