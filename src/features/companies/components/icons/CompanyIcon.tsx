import React from 'react';

interface CompanyIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const CompanyIcon = ({ className, ...props }: CompanyIconProps) => (
  <svg width="18" height="18" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M0.5 13.5H13.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M4.5 13.5V0.5H0.5V13.5"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.5 13.5V6.5H4.5V13.5"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.5 13.5V3.5H8.5V13.5"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
