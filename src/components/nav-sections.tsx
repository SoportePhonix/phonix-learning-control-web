'use client';

import React from 'react';

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { usePathname, useRouter } from 'next/navigation';

import { Separator } from './ui';
import { Typography } from './ui/typography';

export function NavSections({
  sections,
  showLabel = false,
}: {
  sections: {
    name: string;
    url: string;
    icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
    notificationCount?: number;
  }[];
  showLabel?: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigation = (url: string) => {
    if (pathname !== url) {
      router.push(url);
    }
  };

  return (
    <SidebarGroup className="mt-8">
      {showLabel && <SidebarGroupLabel>sections</SidebarGroupLabel>}
      <SidebarMenu>
        {sections.map((item) => (
          <div key={item.name}>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip={item.name}
                onClick={() => handleNavigation(item.url)}
                style={{
                  clipPath: 'polygon(0.8rem 0, 100% 0, 100% 100%, 0 100%, 0 0.8rem)',
                }}
                className={`p-4 ml-4 rounded-none hover:bg-brand ${
                  pathname === item.url
                    ? 'bg-brand hover:text-primary-100 text-primary-100'
                    : 'hover:bg-primary-50 text-brand hover:text-brand'
                  // ? 'bg-brand hover:text-primary-100 text-primary-100 dark:bg-brand-dark dark:hover:bg-brand-dark dark:text-brand'
                  // : 'hover:bg-primary-50 text-brand dark:hover:bg-brand-dark hover:text-brand dark:text-brand '
                } group-data-[state=collapsed]:w-24!`}
              >
                <div className="flex items-center gap-2 w-full cursor-pointer relative">
                  <div className="ml-7">
                    <item.icon
                      className={`${
                        pathname === item.url ? 'stroke-primary-100 hover:stroke-brand' : 'stroke-light_blue'
                      } w-4 h-4`}
                    />
                  </div>
                  <Typography variant="parrafo-pequeno" className="group-data-[state=collapsed]:hidden">
                    {item.name}
                  </Typography>

                  <span
                    className={`absolute left-1 text-white bg-red-error group-data-[state=collapsed]:-top-0.5 ${item.notificationCount === 0 || !item.notificationCount ? 'hidden' : ''} text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center transition-all duration-300 ease-in-out`}
                  >
                    {item.notificationCount && item.notificationCount > 99 ? '99+' : item.notificationCount}
                  </span>
                </div>
              </SidebarMenuButton>
              <Separator className="bg-primary-50 opacity-50 h-[0.05rem] ml-4 my-2 w-10/12" />
            </SidebarMenuItem>
          </div>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
