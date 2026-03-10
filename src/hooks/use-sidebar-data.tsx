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
import { useRBAC } from '@/rbac';
import type { Permission } from '@/rbac';
import { SelectedCompany } from '@/utils/context/selectedCompanyContext';

interface SidebarSection {
  name: string;
  url: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
  notificationCount?: number;
  /** Permiso requerido para mostrar esta sección. Si es undefined, siempre visible. */
  permission?: Permission;
}

interface UseSidebarDataProps {
  isPresentationMode: boolean;
  selectedCompany?: SelectedCompany | null;
}

interface NavMainSubItem {
  title: string;
  url: string;
  icon?: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
  permission?: Permission;
}

interface NavMainItem {
  title: string;
  url?: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
  permission?: Permission;
  items: NavMainSubItem[];
}

export function useSidebarData({ isPresentationMode, selectedCompany }: UseSidebarDataProps) {
  const { t } = useTranslation();
  const { can } = useRBAC();

  const sections = React.useMemo<SidebarSection[]>(() => {
    const allSections: SidebarSection[] = [
      {
        name: t('u.users'),
        url: '/users',
        icon: (props) => <UserIcon {...props} />,
        permission: 'users.view',
      },
      {
        name: t('i.instances'),
        url: '/instances',
        icon: (props) => <InstanceIcon {...props} />,
        permission: 'instances.view',
      },
      {
        name: t('c.companies'),
        url: '/companies',
        icon: (props) => <CompanyIcon {...props} />,
        permission: 'companies.view',
      },
      {
        name: t('l.lms'),
        url: '/lms',
        icon: (props) => <LmsIcon {...props} />,
        permission: 'lms.view',
      },
      // Secciones de presentation mode
      ...(isPresentationMode
        ? [
            {
              name: t('s.students'),
              url: '/students-app',
              icon: (props: React.SVGProps<SVGSVGElement>) => <StudentsIcon {...props} />,
              permission: 'students.view' as Permission,
            },
            {
              name: t('t.trainingPathways'),
              url: '/trainingPathways',
              icon: (props: React.SVGProps<SVGSVGElement>) => <TrainingPathwaysIcon {...props} />,
              permission: 'trainingPathways.view' as Permission,
            },
            {
              name: t('c.courses'),
              url: '/courses-app',
              icon: (props: React.SVGProps<SVGSVGElement>) => <CourseIcon {...props} />,
              permission: 'courses.view' as Permission,
            },
          ]
        : []),
    ];

    return allSections.filter((section) => !section.permission || can(section.permission));
  }, [isPresentationMode, t, can]);

  const navMainItems = React.useMemo<NavMainItem[]>(() => {
    if (!selectedCompany) {
      return [];
    }

    const companyId = selectedCompany.id;
    const companyName = selectedCompany.name;

    const allItems: NavMainItem[] = [
      {
        title: companyName ? `${t('m.manageCompanies')} - ${companyName}` : t('m.manageCompanies'),
        url: `/manage-companies/dashboard?companyId=${companyId}`,
        icon: (props) => <ManageCompaniesIcon {...props} />,
        permission: 'manageCompanies.view',
        items: [
          {
            title: t('d.dashboard'),
            url: `/manage-companies/dashboard?companyId=${companyId}`,
            permission: 'dashboard.view',
          },
          {
            title: t('s.students'),
            url: `/manage-companies/students?companyId=${companyId}`,
            permission: 'students.view',
          },
          {
            title: t('c.courses'),
            url: `/manage-companies/courses?companyId=${companyId}`,
            permission: 'courses.view',
          },
          {
            title: t('a.areas'),
            url: `/manage-companies/areas?companyId=${companyId}`,
            permission: 'areas.view',
          },
          {
            title: t('p.post'),
            url: `/manage-companies/positions?companyId=${companyId}`,
            permission: 'positions.view',
          },
        ],
      },
    ];

    return allItems
      .filter((item) => !item.permission || can(item.permission))
      .map((item) => ({
        ...item,
        items: item.items.filter((sub) => !sub.permission || can(sub.permission)),
      }));
  }, [t, selectedCompany, can]);

  return { sections, navMainItems };
}
