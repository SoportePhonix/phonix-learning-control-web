import React from 'react';

interface StudentsIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const StudentsIcon = ({ className, ...props }: StudentsIconProps) => (
  <svg
    width="22"
    height="23"
    viewBox="1 0 23 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M11.3444 11.8929C14.4214 11.8929 16.9158 9.39844 16.9158 6.32143C16.9158 3.24441 14.4214 0.75 11.3444 0.75C8.26736 0.75 5.77295 3.24441 5.77295 6.32143C5.77295 9.39844 8.26736 11.8929 11.3444 11.8929Z"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21.9386 23.0358C21.2189 20.7915 19.8051 18.8338 17.9011 17.4449C15.997 16.0559 13.7011 15.3075 11.3443 15.3075C8.98748 15.3075 6.69155 16.0559 4.78751 17.4449C2.88347 18.8338 1.4697 20.7915 0.75 23.0358H21.9386Z"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
