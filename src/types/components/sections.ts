export type SectionTitleProps =
  | { title: string; buttonLabel: string; buttonHref: string }
  | { title: string; buttonLabel?: never; buttonHref?: never };

export interface SectionSubTitleProps {
  subtitle: string;
}
