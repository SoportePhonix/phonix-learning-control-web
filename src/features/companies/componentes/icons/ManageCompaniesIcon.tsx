import React from 'react';

interface CompanyIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const ManageCompaniesIcon = ({ className, ...props }: CompanyIconProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <g clipPath="url(#clip0_529_5990)">
      <path
        d="M11.9998 23.1429C18.1538 23.1429 23.1426 18.154 23.1426 12C23.1426 5.84597 18.1538 0.857147 11.9998 0.857147C5.84576 0.857147 0.856934 5.84597 0.856934 12C0.856934 18.154 5.84576 23.1429 11.9998 23.1429Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M0.856934 12L23.1426 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.2853 12C16.0748 16.0748 14.5739 19.9772 11.9996 23.1429C9.42527 19.9772 7.92438 16.0748 7.71387 12C7.92438 7.92516 9.42527 4.02284 11.9996 0.857147C14.5739 4.02284 16.0748 7.92516 16.2853 12V12Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_529_5990">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
