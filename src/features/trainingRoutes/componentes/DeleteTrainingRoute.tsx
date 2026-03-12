import { AlertConfirmDialogDestructive } from '@/components/AlertConfirmDialogDestructive';
import { useTranslation } from '@/i18n';

import { useDeleteTrainingRoute } from '../hooks/useDeleteTrainingRoute';

export const DeleteTrainingRoute = ({ id }: { id: number }) => {
  const { t } = useTranslation();
  const { deleteTrainingRoute, isLoading } = useDeleteTrainingRoute();

  return (
    <AlertConfirmDialogDestructive
      tooltipText={t('d.deleteTrainingRoute')}
      title={t('d.deleteTrainingRoute')}
      description={t('a.areSureWantToDeleteThisTrainingRoute')}
      onConfirm={async () => await deleteTrainingRoute(id)}
      confirmText={t('d.delete')}
      cancelText={t('c.cancel')}
      variant="destructive"
      isLoading={isLoading}
    />
  );
};
