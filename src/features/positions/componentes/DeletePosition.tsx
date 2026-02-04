import { AlertConfirmDialogDestructive } from '@/components/AlertConfirmDialogDestructive';
import { useTranslation } from '@/i18n';

import { useDeletePosition } from '../hooks/useDeletePosition';

export const DeletePosition = ({ positionId }: { positionId: number }) => {
  const { t } = useTranslation();
  const { deletePosition, isLoading } = useDeletePosition();
  return (
    <AlertConfirmDialogDestructive
      tooltipText={t('d.deletePosition')}
      title={t('d.deletePosition')}
      description={t('a.areYouSureYouWantToDeleteThisPosition')}
      onConfirm={async () => await deletePosition(positionId)}
      confirmText={t('d.delete')}
      cancelText={t('c.cancel')}
      variant="destructive"
      isLoading={isLoading}
    />
  );
};
