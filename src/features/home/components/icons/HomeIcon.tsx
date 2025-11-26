import React from 'react';

interface HomeIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const HomeIcon = ({ className, ...props }: HomeIconProps) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#clip0_103_5557)">
      <path
        d="M23.1427 11.8971C23.1443 11.6592 23.0964 11.4235 23.0019 11.2051C22.9075 10.9867 22.7686 10.7904 22.5941 10.6286L11.9998 0.857147L1.40554 10.6286C1.23107 10.7904 1.09219 10.9867 0.99775 11.2051C0.903306 11.4235 0.855363 11.6592 0.856973 11.8971L0.856973 21.4286C0.856973 21.8832 1.03758 22.3193 1.35908 22.6408C1.68057 22.9622 2.1166 23.1429 2.57126 23.1429L21.4284 23.1429C21.8831 23.1429 22.3191 22.9622 22.6406 22.6408C22.9621 22.3193 23.1427 21.8832 23.1427 21.4286L23.1427 11.8971Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_103_5557">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
