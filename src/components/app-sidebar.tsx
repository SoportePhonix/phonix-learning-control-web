'use client';

import * as React from 'react';

import { LogoSwitcher, NavSections } from '@/components';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { sidebarLogos } from '@/config/sidebar-logos.config';
import { useSidebarData } from '@/hooks';
import { useConfigWithLoading, useSelectedCompany } from '@/utils/context';
import { useSessionContext } from '@/utils/context/sessionContext';
import { useTheme } from 'next-themes';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { theme } = useTheme();
  const { config, isLoading } = useConfigWithLoading();
  const { selectedCompany } = useSelectedCompany();

  const isDarkMode = theme === 'dark';
  const isPresentationMode = React.useMemo(
    () => !isLoading && config.presentationMode,
    [isLoading, config.presentationMode]
  );

  const { sections, navMainItems } = useSidebarData({ isPresentationMode, selectedCompany });

  return (
    <Sidebar collapsible="icon" {...props}>
      <div className="absolute top-0 right-0 z-50">
        <SidebarTrigger />
      </div>
      <SidebarHeader>
        <LogoSwitcher logos={sidebarLogos} isDarkMode={isDarkMode} />
      </SidebarHeader>
      <SidebarContent className="overflow-x-hidden overflow-y-auto">
        <NavSections sections={sections} />
        <NavMain items={navMainItems} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
