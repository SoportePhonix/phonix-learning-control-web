'use client';

import * as React from 'react';

import { SidebarMenu, SidebarMenuItem } from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';

export function LogoSwitcher({
  logos,
  isDarkMode,
}: {
  logos: {
    expandedLogo: {
      light: React.ReactNode;
      dark: React.ReactNode;
    };
    collapsedLogo: {
      light: React.ReactNode;
      dark: React.ReactNode;
    };
  }[];
  isDarkMode: boolean;
}) {
  const [activeLogo] = React.useState(logos[0]);
  const [sidebarWidth, setSidebarWidth] = React.useState<number | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setSidebarWidth(containerRef.current.offsetWidth);
      }
    };

    const resizeObserver = new ResizeObserver(updateWidth);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Cleanup del observer
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div
          ref={containerRef}
          className={`flex gap-4 h-20 justify-center items-center ${sidebarWidth === null ? '' : sidebarWidth < 110 ? 'pt-10' : 'px-8 pt-10'}`}
        >
          {sidebarWidth === null ? (
            <Skeleton className="w-full h-16 rounded-none" />
          ) : sidebarWidth < 110 ? (
            isDarkMode ? (
              activeLogo.collapsedLogo.dark
            ) : (
              activeLogo.collapsedLogo.light
            )
          ) : isDarkMode ? (
            activeLogo.expandedLogo.dark
          ) : (
            activeLogo.expandedLogo.light
          )}
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
