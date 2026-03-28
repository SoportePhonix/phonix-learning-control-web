import React from 'react';

interface TrainingRoutesIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const TrainingRoutesIcon = ({ className, ...props }: TrainingRoutesIconProps) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 12 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M5.75 13.5C6.85457 13.5 7.75 12.6046 7.75 11.5C7.75 10.3954 6.85457 9.5 5.75 9.5C4.64543 9.5 3.75 10.3954 3.75 11.5C3.75 12.6046 4.64543 13.5 5.75 13.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M5.75 9.5V0.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M4.25 2L5.75 0.5L7.25 2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.78 9.77999C4.20693 9.60875 3.67776 9.31538 3.22892 8.92006C2.78009 8.52473 2.42224 8.03685 2.18 7.48999"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 7.5C2.69036 7.5 3.25 6.94036 3.25 6.25C3.25 5.55964 2.69036 5 2 5C1.30964 5 0.75 5.55964 0.75 6.25C0.75 6.94036 1.30964 7.5 2 7.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.78 8.60003C6.54762 8.36803 7.25645 7.97387 7.85856 7.44422C8.46067 6.91458 8.942 6.26179 9.27 5.53003"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.56 5.57007C10.2504 5.57007 10.81 5.01042 10.81 4.32007C10.81 3.62971 10.2504 3.07007 9.56 3.07007C8.86964 3.07007 8.31 3.62971 8.31 4.32007C8.31 5.01042 8.86964 5.57007 9.56 5.57007Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
