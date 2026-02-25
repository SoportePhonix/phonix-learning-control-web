import * as React from 'react';

import { TrainingPathwaysIcon } from '@/app/(users)/trainingPathways/components/icons/TrainingPathwaysIcon';
import { CompanyIcon } from '@/features/companies/componentes/icons/CompanyIcon';
import { CourseIcon } from '@/features/courses/componentes/icons/CourseIcon';
import { StudentsIcon } from '@/features/students/componentes/icons/StudentIcon';
import { UserIcon } from '@/features/users/componentes/icons/UserIcon';
import { useTranslation } from '@/i18n';
import { LayoutDashboard } from 'lucide-react';

interface SidebarSection {
  name: string;
  url: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
  notificationCount?: number;
}

interface UseSidebarDataProps {
  isPresentationMode: boolean;
}

interface NavMainItem {
  title: string;
  url?: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
  items: {
    title: string;
    url: string;
    icon?: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
  }[];
}

export function useSidebarData({ isPresentationMode }: UseSidebarDataProps) {
  const { t } = useTranslation();

  const sections = React.useMemo<SidebarSection[]>(() => {
    const baseSections: SidebarSection[] = [
      {
        name: t('u.users'),
        url: '/users',
        icon: (props) => <UserIcon {...props} />,
      },
      {
        name: t('c.companies'),
        url: '/companies',
        icon: (props) => <CompanyIcon {...props} />,
      },
    ];

    const presentationModeSections: SidebarSection[] = [
      {
        name: t('s.students'),
        url: '/students-app',
        icon: (props) => <StudentsIcon {...props} />,
      },
      {
        name: t('t.trainingPathways'),
        url: '/trainingPathways',
        icon: (props) => <TrainingPathwaysIcon {...props} />,
      },
      {
        name: t('c.courses'),
        url: '/courses-app',
        icon: (props) => <CourseIcon {...props} />,
      },
    ];

    return [...baseSections, ...(isPresentationMode ? presentationModeSections : [])];
  }, [isPresentationMode, t]);

  const navMainItems = React.useMemo<NavMainItem[]>(() => {
    return [
      {
        title: t('m.manageCompanies'),
        icon: (props) => <LayoutDashboard {...props} />,
        items: [
          {
            title: t('s.students'),
            url: '/manage-companies/students',
          },
          {
            title: t('c.courses'),
            url: '/manage-companies/courses',
          },
          {
            title: t('a.areas'),
            url: '/manage-companies/areas',
          },
          {
            title: t('p.post'),
            url: '/manage-companies/positions',
          },
        ],
      },
    ];
  }, [t]);

  return { sections, navMainItems };
}
