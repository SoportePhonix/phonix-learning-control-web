import * as React from 'react';

import { TrainingPathwaysIcon } from '@/app/(users)/trainingPathways/components/icons/TrainingPathwaysIcon';
import { CompanyIcon } from '@/features/companies/componentes/icons/CompanyIcon';
import { ManageCompaniesIcon } from '@/features/companies/componentes/icons/ManageCompaniesIcon';
import { CourseIcon } from '@/features/courses/componentes/icons/CourseIcon';
import { InstanceIcon } from '@/features/instance/componentes/icons/InstanceIcon';
import { LmsIcon } from '@/features/lms/componentes/icons/LmsIcon';
import { StudentsIcon } from '@/features/students/componentes/icons/StudentIcon';
import { UserIcon } from '@/features/users/componentes/icons/UserIcon';
import { useTranslation } from '@/i18n';
import { SelectedCompany } from '@/utils/context/selectedCompanyContext';

interface SidebarSection {
  name: string;
  url: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
  notificationCount?: number;
}

interface UseSidebarDataProps {
  isPresentationMode: boolean;
  selectedCompany?: SelectedCompany | null;
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

export function useSidebarData({ isPresentationMode, selectedCompany }: UseSidebarDataProps) {
  const { t } = useTranslation();

  const sections = React.useMemo<SidebarSection[]>(() => {
    const baseSections: SidebarSection[] = [
      {
        name: t('u.users'),
        url: '/users',
        icon: (props) => <UserIcon {...props} />,
      },
      {
        name: t('i.instances'),
        url: '/instances',
        icon: (props) => <InstanceIcon {...props} />,
      },
      {
        name: t('c.companies'),
        url: '/companies',
        icon: (props) => <CompanyIcon {...props} />,
      },
      {
        name: t('l.lms'),
        url: '/lms',
        icon: (props) => <LmsIcon {...props} />,
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
    if (!selectedCompany) {
      return [];
    }

    const companyId = selectedCompany.id;
    const companyName = selectedCompany.name;

    return [
      {
        title: companyName ? `${t('m.manageCompanies')} - ${companyName}` : t('m.manageCompanies'),
        url: `/manage-companies/dashboard?companyId=${companyId}`,
        icon: (props) => <ManageCompaniesIcon {...props} />,
        items: [
          {
            title: t('d.dashboard'),
            url: `/manage-companies/dashboard?companyId=${companyId}`,
          },
          {
            title: t('s.students'),
            url: `/manage-companies/students?companyId=${companyId}`,
          },
          {
            title: t('c.courses'),
            url: `/manage-companies/courses?companyId=${companyId}`,
          },
          {
            title: t('a.areas'),
            url: `/manage-companies/areas?companyId=${companyId}`,
          },
          {
            title: t('p.post'),
            url: `/manage-companies/positions?companyId=${companyId}`,
          },
        ],
      },
    ];
  }, [t, selectedCompany]);

  return { sections, navMainItems };
}
