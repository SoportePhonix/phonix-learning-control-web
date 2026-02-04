import { AlertConfirmDialogDestructive } from '@/components/AlertConfirmDialogDestructive';
import { useTranslation } from '@/i18n';

import { useDeleteArea } from '../hooks/useDeleteArea';

export const DeleteArea = ({ areaId }: { areaId: number }) => {
  const { t } = useTranslation();
  const { deleteArea, isLoading } = useDeleteArea();

  return (
    <AlertConfirmDialogDestructive
      tooltipText={t('d.deleteArea')}
      title={t('d.deleteArea')}
      description={t('a.areSureWantToDeleteThisArea')}
      onConfirm={async () => await deleteArea(areaId)}
      confirmText={t('d.delete')}
      cancelText={t('c.cancel')}
      variant="destructive"
      isLoading={isLoading}
    />
  );
};
