'use client';

import React, { useEffect, useState } from 'react';

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNavigation = (url: string, e?: React.MouseEvent<HTMLButtonElement>) => {
    if (pathname !== url) {
      router.push(url);
    }
    e?.currentTarget.blur();
  };

  const isActive = (url: string) => {
    if (!mounted) return false;
    const normalizedPathname = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;
    const normalizedUrl = url.endsWith('/') && url !== '/' ? url.slice(0, -1) : url;
    return normalizedPathname === normalizedUrl || normalizedPathname.startsWith(normalizedUrl + '/');
  };

  return (
    <SidebarGroup className="mt-8">
      {showLabel && <SidebarGroupLabel>sections</SidebarGroupLabel>}
      <SidebarMenu>
        {sections.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton
              tooltip={item.name}
              onClick={(e) => handleNavigation(item.url, e)}
              style={{
                clipPath: 'polygon(0.8rem 0, 100% 0, 100% 100%, 0 100%, 0 0.8rem)',
              }}
              className={`py-4.5 ml-4.5 rounded-none transition-colors cursor-pointer ${
                isActive(item.url)
                  ? 'bg-nav-item-active-bg text-nav-item-active-text hover:bg-nav-item-active-hover-bg hover:text-nav-item-active-hover-text active:bg-nav-item-active-bg active:text-nav-item-active-text group-data-[state=collapsed]:bg-nav-item-active-collapsed-bg group-data-[state=collapsed]:text-nav-item-active-collapsed-text group-data-[state=collapsed]:hover:text-nav-item-active-collapsed-text group-data-[state=collapsed]:hover:bg-nav-item-active-collapsed-hover-bg group-data-[state=collapsed]:active:bg-nav-item-active-collapsed-bg'
                  : 'text-nav-item-inactive-text hover:bg-nav-item-inactive-hover-bg group-data-[state=collapsed]:hover:bg-nav-item-inactive-collapsed-hover-bg hover:text-nav-item-inactive-hover-text active:bg-nav-item-inactive-hover-bg active:text-nav-item-inactive-text'
              } group-data-[state=collapsed]:mx-auto group-data-[state=collapsed]:w-23!`}
            >
              <div className="flex items-center gap-2 w-full relative whitespace-nowrap overflow-hidden group-data-[state=collapsed]:justify-center group-data-[state=collapsed]:items-center group-data-[state=collapsed]:gap-0">
                <div className="ml-7 shrink-0 group-data-[state=collapsed]:ml-0 group-data-[state=collapsed]:flex group-data-[state=collapsed]:justify-center group-data-[state=collapsed]:w-full">
                  <item.icon
                    className={`${
                      isActive(item.url)
                        ? 'stroke-nav-icon-active group-data-[state=collapsed]:stroke-nav-icon-active-collapsed'
                        : 'stroke-nav-icon-inactive'
                    } w-4 h-4 ml-1 group-data-[state=collapsed]:ml-0`}
                  />
                </div>
                <Typography
                  variant="parrafo-pequeno"
                  className="group-data-[state=collapsed]:hidden whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  {item.name}
                </Typography>

                <span
                  className={`absolute left-1 text-nav-badge-text bg-nav-badge-bg group-data-[state=collapsed]:-top-0.5 ${
                    !item.notificationCount ? 'hidden' : ''
                  } text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center transition-all duration-300 ease-in-out`}
                >
                  {item.notificationCount && item.notificationCount > 99 ? '99+' : item.notificationCount}
                </span>
              </div>
            </SidebarMenuButton>
            <Separator className="bg-nav-separator-bg h-[0.05rem] ml-4 group-data-[state=collapsed]:mx-auto my-2 w-10/12 group-data-[state=collapsed]:w-14" />
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
