import React from 'react';

interface TrainingPathwaysIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const TrainingPathwaysIcon = ({ className, ...props }: TrainingPathwaysIconProps) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    <path
      d="M5.89286 0.75H1.60714C1.13376 0.75 0.75 1.13376 0.75 1.60714V22.1786C0.75 22.652 1.13376 23.0357 1.60714 23.0357H5.89286C6.36624 23.0357 6.75 22.652 6.75 22.1786V1.60714C6.75 1.13376 6.36624 0.75 5.89286 0.75Z"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.8929 4.17847H7.60714C7.13376 4.17847 6.75 4.56222 6.75 5.03561V22.1785C6.75 22.6519 7.13376 23.0356 7.60714 23.0356H11.8929C12.3662 23.0356 12.75 22.6519 12.75 22.1785V5.03561C12.75 4.56222 12.3662 4.17847 11.8929 4.17847Z"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.6299 3.70932L14.3039 4.54167C13.8447 4.65659 13.5656 5.12203 13.6805 5.58126L17.8422 22.2113C17.9572 22.6705 18.4226 22.9496 18.8818 22.8347L22.2078 22.0023C22.6671 21.8874 22.9462 21.422 22.8313 20.9627L18.6695 4.33273C18.5546 3.87351 18.0891 3.5944 17.6299 3.70932Z"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M0.75 17.0356H6.75" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M6.75 15.3215H12.75"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.0356 18.7499L21.9728 17.5156"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
