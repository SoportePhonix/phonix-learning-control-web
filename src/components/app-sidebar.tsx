'use client';

import * as React from 'react';

import { CollapsedLogo, ExpandedLogoDark, ExpandedLogoLight, LogoSwitcher, NavSections } from '@/components';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { useSessionContext } from '@/utils/context/sessionContext';
import { ShieldPlus, ShieldUser } from 'lucide-react';
import { UserRound } from 'lucide-react';
import { Book } from 'lucide-react';
import { Library } from 'lucide-react';
import { useTheme } from 'next-themes';
import { IoHomeOutline } from 'react-icons/io5';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { session } = useSessionContext();
  const { theme } = useTheme();

  const isDarkMode = theme === 'dark';

  const userSession = {
    name: `${session?.user?.name} ${session?.user?.lastName}`,
    email: `${session?.user?.email}`,
    avatar: `${session?.user?.name?.charAt(0) || ''} ${session?.user?.lastName?.charAt(0) || ''}`.trim(),
  };

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
      // {
      //   name: 'Dashboard',
      //   url: '/dashboard',
      //   icon: (props: React.JSX.IntrinsicAttributes & React.RefAttributes<SVGSVGElement>) => (
      //     <IoHomeOutline {...props} />
      //   ),
      // },
      {
        name: 'Usuarios',
        url: '/users',
        icon: (props: React.JSX.IntrinsicAttributes & React.RefAttributes<SVGSVGElement>) => <ShieldUser {...props} />,
      },
      {
        name: 'Estudiantes',
        url: '/students',
        icon: (props: React.JSX.IntrinsicAttributes & React.RefAttributes<SVGSVGElement>) => <UserRound {...props} />,
      },
      {
        name: 'Cursos',
        url: '/courses',
        icon: (props: React.JSX.IntrinsicAttributes & React.RefAttributes<SVGSVGElement>) => <Book {...props} />,
      },
      {
        name: 'Rutas de formación',
        url: '/trainingPathways',
        icon: (props: React.JSX.IntrinsicAttributes & React.RefAttributes<SVGSVGElement>) => <Library {...props} />,
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <div className="absolute top-0 right-0 z-50">
        {/* <ModeToggle /> */}
        <SidebarTrigger />
      </div>
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
