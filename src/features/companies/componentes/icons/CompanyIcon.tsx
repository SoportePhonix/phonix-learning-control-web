import React from 'react';

interface CompanyIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const CompanyIcon = ({ className, ...props }: CompanyIconProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <g clipPath="url(#clip0_529_5901)">
      <path
        d="M2.12549 11.2114L21.8398 2.24573"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.1543 0.857147L21.84 2.24572L20.4686 5.93143"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.7144 23.16H18.4286L18.4286 11.16C18.4286 10.9327 18.5189 10.7147 18.6797 10.5539C18.8404 10.3932 19.0585 10.3029 19.2858 10.3029L21.8572 10.3029C22.0845 10.3029 22.3026 10.3932 22.4633 10.5539C22.6241 10.7147 22.7144 10.9327 22.7144 11.16L22.7144 23.16Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.1426 23.16H9.85686L9.85686 13.7314C9.85686 13.5041 9.94717 13.2861 10.1079 13.1253C10.2687 12.9646 10.4867 12.8743 10.714 12.8743L13.2854 12.8743C13.5128 12.8743 13.7308 12.9646 13.8915 13.1253C14.0523 13.2861 14.1426 13.5041 14.1426 13.7314L14.1426 23.16Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.57129 23.16H1.28558L1.28558 16.3029C1.28558 16.0755 1.37588 15.8575 1.53663 15.6968C1.69737 15.536 1.91539 15.4457 2.14272 15.4457H4.71415C4.94147 15.4457 5.15949 15.536 5.32024 15.6968C5.48098 15.8575 5.57129 16.0755 5.57129 16.3029L5.57129 23.16Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_529_5901">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
