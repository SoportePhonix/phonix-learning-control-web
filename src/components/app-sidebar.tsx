'use client';

import * as React from 'react';

import { TrainingPathwaysIcon } from '@/app/(users)/trainingPathways/components/icons/TrainingPathwaysIcon';
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
import { CompanyIcon } from '@/features/companies/componentes/icons/CompanyIcon';
import { CourseIcon } from '@/features/courses/componentes/icons/CourseIcon';
import { HomeIcon } from '@/features/home/components/icons/HomeIcon';
import { StudentsIcon } from '@/features/students/componentes/icons/StudentIcon';
import { UserIcon } from '@/features/users/componentes/icons/UserIcon';
import { useTranslation } from '@/i18n';
import { useSessionContext } from '@/utils/context/sessionContext';
import { useTheme } from 'next-themes';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { session } = useSessionContext();
  const { theme } = useTheme();
  const { t } = useTranslation();

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
      //   name: t('h.home'),
      //   url: '/home',
      //   icon: (props: React.JSX.IntrinsicAttributes & React.RefAttributes<SVGSVGElement>) => <HomeIcon {...props} />,
      // },
      {
        name: t('u.users'),
        url: '/users',
        icon: (props: React.JSX.IntrinsicAttributes & React.RefAttributes<SVGSVGElement>) => <UserIcon {...props} />,
      },
      {
        name: t('c.companies'),
        url: '/companies',
        icon: (props: React.JSX.IntrinsicAttributes & React.RefAttributes<SVGSVGElement>) => <CompanyIcon {...props} />,
      },
      {
        name: t('s.students'),
        url: '/students',
        icon: (props: React.JSX.IntrinsicAttributes & React.RefAttributes<SVGSVGElement>) => (
          <StudentsIcon {...props} />
        ),
      },
      {
        name: t('c.courses'),
        url: '/courses',
        icon: (props: React.JSX.IntrinsicAttributes & React.RefAttributes<SVGSVGElement>) => <CourseIcon {...props} />,
      },
      // {
      //   name: t('t.trainingPathways'),
      //   url: '/trainingPathways',
      //   icon: (props: React.JSX.IntrinsicAttributes & React.RefAttributes<SVGSVGElement>) => (
      //     <TrainingPathwaysIcon {...props} />
      //   ),
      // },
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
