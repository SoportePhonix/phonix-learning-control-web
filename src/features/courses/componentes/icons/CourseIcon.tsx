import React from 'react';

interface CourseIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const CourseIcon = ({ className, ...props }: CourseIconProps) => (
  <svg
    width="25"
    height="24"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M19.6071 23.0357H3.32143C2.63944 23.0357 1.98539 22.7648 1.50315 22.2826C1.02092 21.8003 0.75 21.1463 0.75 20.4643C0.75 19.7823 1.02092 19.1282 1.50315 18.646C1.98539 18.1638 2.63944 17.8929 3.32143 17.8929H17.8929C18.3475 17.8929 18.7835 17.7122 19.105 17.3908C19.4265 17.0693 19.6071 16.6332 19.6071 16.1786V2.46429C19.6071 2.00963 19.4265 1.57359 19.105 1.2521C18.7835 0.930612 18.3475 0.75 17.8929 0.75H3.32143C2.65116 0.749762 2.00729 1.01125 1.52697 1.47875C1.04666 1.94626 0.767874 2.58283 0.75 3.25286V20.3957"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.8928 17.8931V23.0359"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
