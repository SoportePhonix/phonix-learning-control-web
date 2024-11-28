'use client';

import * as React from 'react';

import { CollapsedLogo, ExpandedLogoDark, ExpandedLogoLight, LogoSwitcher, NavSections } from '@/components';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
import { useSessionContext } from '@/utils/context/sessionContext';
import { useTheme } from 'next-themes';

import { DashboardSection } from './logo-section-icons';

const data = {
  logos: [
    {
      expandedLogo: {
        light: <ExpandedLogoLight />,
        dark: <ExpandedLogoDark />,
      },
      collapsedLogo: {
        light: <CollapsedLogo />,
        dark: <CollapsedLogo />,
      },
    },
  ],
  sections: [
    {
      name: 'Casa',
      url: '/dashboard',
      icon: (props: React.JSX.IntrinsicAttributes & React.RefAttributes<SVGSVGElement>) => (
        <DashboardSection {...props} />
      ),
    },
    {
      name: 'Menu',
      url: '/Menu',
      icon: (props: React.JSX.IntrinsicAttributes & React.RefAttributes<SVGSVGElement>) => (
        <DashboardSection {...props} />
      ),
    },
  ],
  // navMain: [
  //   {
  //     title: 'Dashboard',
  //     url: '/dasboard',
  //     icon: (props: React.JSX.IntrinsicAttributes & React.RefAttributes<SVGSVGElement>) => (
  //       <DashboardSection {...props} />
  //     ),
  //     isActive: true,
  //     items: [
  //       {
  //         title: 'Vista principal',
  //         url: '/dashboard',
  //       },
  //       {
  //         title: 'Base diseño 1',
  //         url: '#',
  //       },
  //       {
  //         title: 'Base diseño 2',
  //         url: '#',
  //       },
  //     ],
  //   },
  //   {
  //     title: 'Dashboard2',
  //     url: '/dasboard/2',
  //     icon: (props: React.JSX.IntrinsicAttributes & React.RefAttributes<SVGSVGElement>) => (
  //       <DashboardSection {...props} />
  //     ),
  //     isActive: true,
  //     items: [
  //       {
  //         title: 'Vista principal',
  //         url: '/dashboard',
  //       },
  //       {
  //         title: 'Base diseño 1',
  //         url: '#',
  //       },
  //       {
  //         title: 'Base diseño 2',
  //         url: '#',
  //       },
  //     ],
  //   },
  // ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { session } = useSessionContext();
  const { theme } = useTheme();

  const isDarkMode = theme === 'dark';

  const userSession = {
    name: `${session?.user?.name} ${session?.user?.last_name}`,
    email: `${session?.user?.email}`,
    avatar: `${session?.user?.name?.charAt(0) || ''} ${session?.user?.last_name?.charAt(0) || ''}`.trim(),
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <LogoSwitcher logos={data.logos} isDarkMode={isDarkMode} />
      </SidebarHeader>
      <SidebarContent>
        <NavSections sections={data.sections} />
        {/* <NavMain items={data.navMain} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userSession} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
