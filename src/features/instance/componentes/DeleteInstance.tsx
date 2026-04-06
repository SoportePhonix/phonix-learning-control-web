import { AlertConfirmDialogDestructive } from '@/components/AlertConfirmDialogDestructive';
import { useTranslation } from '@/i18n';

import { useDeleteInstance } from '../hooks/useDeleteInstance';

export const DeleteInstance = ({ instanceId }: { instanceId: string }) => {
  const { t } = useTranslation();
  const { deleteInstance, isLoading } = useDeleteInstance();

  return (
    <AlertConfirmDialogDestructive
      tooltipText={t('d.deleteInstance')}
      title={t('d.deleteInstance')}
      description={t('a.areYouSureYouWantToDeleteThisInstance')}
      onConfirm={async () => await deleteInstance(instanceId)}
      confirmText={t('d.delete')}
      cancelText={t('c.cancel')}
      variant="destructive"
      isLoading={isLoading}
    />
  );
};
