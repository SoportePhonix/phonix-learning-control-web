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
                className={`p-[1rem] rounded-none hover:bg-var--brand ${
                  pathname === item.url
                    ? 'bg-var--brand hover:text-var--primary-100 text-var--primary-100'
                    : 'hover:bg-var--primary-50 text-var--brand hover:text-var--brand  '
                  // ? 'bg-var--brand hover:text-var--primary-100 text-var--primary-100 dark:bg-var--brand-dark dark:hover:bg-var--brand-dark dark:text-var--brand'
                  // : 'hover:bg-var--primary-50 text-var--brand dark:hover:bg-var--brand-dark hover:text-var--brand dark:text-var--brand '
                } group-data-[state=collapsed]:!w-24`}
              >
                <div className="flex items-center gap-2 w-full cursor-pointer relative">
                  <div className="ml-7">
                    <item.icon
                      className={`${
                        pathname === item.url
                          ? 'stroke-var--primary-100 hover:stroke-var--brand'
                          : 'stroke-var--light_blue'
                      } w-4 h-4`}
                    />
                  </div>
                  <Typography variant="parrafo-pequeno" className="group-data-[state=collapsed]:hidden">
                    {item.name}
                  </Typography>

                  <span
                    className={`absolute left-1 text-white bg-var--red-error group-data-[state=collapsed]:-top-0.5 ${item.notificationCount === 0 || !item.notificationCount ? 'hidden' : ''} text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center transition-all duration-300 ease-in-out`}
                  >
                    {item.notificationCount && item.notificationCount > 99 ? '99+' : item.notificationCount}
                  </span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <div className="py-3 pr-20 group-data-[state=collapsed]:pr-4">
              <Separator className="bg-var--primary-50 opacity-50 h-[0.1rem]" />
            </div>
          </div>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
