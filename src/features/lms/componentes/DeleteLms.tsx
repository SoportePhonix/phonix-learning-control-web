import { AlertConfirmDialogDestructive } from '@/components/AlertConfirmDialogDestructive';
import { useTranslation } from '@/i18n';

import { useDeleteLms } from '../hooks/useDeleteLms';

export const DeleteLms = ({ lmsId }: { lmsId: number }) => {
  const { t } = useTranslation();
  const { deleteLms, isLoading } = useDeleteLms();

  return (
    <AlertConfirmDialogDestructive
      tooltipText={t('d.deleteLms')}
      title={t('d.deleteLms')}
      description={t('a.areSureWantToDeleteThisLms')}
      onConfirm={async () => await deleteLms(lmsId)}
      confirmText={t('d.delete')}
      cancelText={t('c.cancel')}
      variant="destructive"
      isLoading={isLoading}
    />
  );
};
