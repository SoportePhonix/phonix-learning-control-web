'use client';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useTranslation } from '@/i18n';
import { useSelectedCompany } from '@/utils/context/selectedCompanyContext';
import { Bolt } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ManageCompanyProps {
  companyId: number;
  companyName?: string;
}

export const ManageCompany = ({ companyId, companyName }: ManageCompanyProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { setSelectedCompany } = useSelectedCompany();

  const handleClick = () => {
    // Guardar la empresa en el contexto antes de navegar
    setSelectedCompany({ id: companyId, name: companyName });
    // Navegar al dashboard con el companyId como query param
    router.push(`/manage-companies/dashboard?companyId=${companyId}`);
  };

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={handleClick}>
            <Bolt className="h-4 w-4" />
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
