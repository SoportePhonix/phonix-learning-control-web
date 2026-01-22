import { AlertConfirmDialogDestructive } from '@/components/AlertConfirmDialogDestructive';
import { useTranslation } from '@/i18n';

import { useDeleteCompany } from '../hooks/useDeleteCompany';

export const DeleteCompany = ({ companyId }: { companyId: number }) => {
  const { t } = useTranslation();
  const { deleteCompany, isLoading } = useDeleteCompany();

  return (
    <AlertConfirmDialogDestructive
      tooltipText={t('d.deleteCompany')}
      title={t('d.deleteCompany')}
      description={t('a.areYouSureYouWantToDeleteThisCompany')}
      onConfirm={async () => await deleteCompany(companyId)}
      confirmText={t('d.delete')}
      cancelText={t('c.cancel')}
      variant="destructive"
      isLoading={isLoading}
    />
  );
};
