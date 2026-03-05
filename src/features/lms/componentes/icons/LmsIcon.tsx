import React from 'react';

interface LmsIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const LmsIcon = ({ className, ...props }: LmsIconProps) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <g clipPath="url(#clip0_4_1662)">
      <path
        d="M12.5 12.5C12.5 12.7652 12.3946 13.0196 12.2071 13.2071C12.0196 13.3946 11.7652 13.5 11.5 13.5H2.5C2.23478 13.5 1.98043 13.3946 1.79289 13.2071C1.60536 13.0196 1.5 12.7652 1.5 12.5V1.5C1.5 1.23478 1.60536 0.98043 1.79289 0.792893C1.98043 0.605357 2.23478 0.5 2.5 0.5H9L12.5 4V12.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 7.5L6 5.5L4 7.5V0.5H8V7.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_4_1662">
        <rect width="14" height="14" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
