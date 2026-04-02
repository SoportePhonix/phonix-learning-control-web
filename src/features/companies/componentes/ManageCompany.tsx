'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useTranslation } from '@/i18n';
import { useRBAC } from '@/rbac';
import { Role } from '@/rbac/config/roles';
import { useSelectedCompany } from '@/utils/context/selectedCompanyContext';
import { useSessionContext } from '@/utils/context/sessionContext';
import { Bolt } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { ManageCompaniesIcon } from './icons/ManageCompaniesIcon';

interface ManageCompanyProps {
  companyId: number;
  companyName?: string;
}

export const ManageCompany = ({ companyId, companyName }: ManageCompanyProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const { setSelectedCompany } = useSelectedCompany();
  const { session } = useSessionContext();
  const { hasRole } = useRBAC();

  const isSuperAdmin = hasRole(Role.SUPERADMIN);
  const isAdministrator = hasRole(Role.ADMIN);

  const handleClick = () => {
    const isAllowed = isSuperAdmin || (isAdministrator && !!session?.user?.instanceId);
    if (!isAllowed) {
      throw new Error('Empresa no permitida');
    }

    // Guardar la empresa en el contexto antes de navegar
    setSelectedCompany({ id: companyId, name: companyName });
    // Navegar al dashboard
    router.push(`/manage-companies/students?companyId=${companyId}`);
  };
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 cursor-pointer"
            onClick={handleClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <ManageCompaniesIcon className="h-4 w-4" strokeWidth={hovered ? 2.3 : 1.7} />
            <span className="sr-only">{t('m.manageCompanies')}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t('m.manageCompanies')}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
