import React from 'react';

interface InstanceIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const InstanceIcon = ({ className, ...props }: InstanceIconProps) => (
  <svg width="18" height="16" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2.5 6.75L0.72 9.3C0.639708 9.45637 0.602054 9.63115 0.610832 9.80671C0.61961 9.98227 0.67451 10.1524 0.77 10.3C0.86007 10.4441 0.985382 10.5629 1.1341 10.6451C1.28283 10.7274 1.45006 10.7703 1.62 10.77H12.38C12.5499 10.7703 12.7172 10.7274 12.8659 10.6451C13.0146 10.5629 13.1399 10.4441 13.23 10.3C13.3178 10.148 13.364 9.97554 13.364 9.8C13.364 9.62446 13.3178 9.45202 13.23 9.3L11.5 6.75"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.5 0.75C3.23478 0.75 2.98043 0.855357 2.79289 1.04289C2.60536 1.23043 2.5 1.48478 2.5 1.75V6.75H11.5V1.75C11.5 1.48478 11.3946 1.23043 11.2071 1.04289C11.0196 0.855357 10.7652 0.75 10.5 0.75H3.5Z"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
