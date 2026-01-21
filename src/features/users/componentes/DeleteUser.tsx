import { AlertConfirmDialogDestructive } from '@/components/AlertConfirmDialogDestructive';
import { useTranslation } from '@/i18n';

import { useDeleteUser } from '../hooks/useDeleteUser';

export const DeleteUser = ({ userId }: { userId: number }) => {
  const { t } = useTranslation();
  const { deleteUser, isLoading } = useDeleteUser();

  return (
    <AlertConfirmDialogDestructive
      tooltipText={t('d.deleteUser')}
      title={t('d.deleteUser')}
      description={t('a.areYouSureYouWantToDeleteThisUser')}
      onConfirm={async () => await deleteUser(userId)}
      confirmText={t('d.delete')}
      cancelText={t('c.cancel')}
      variant="destructive"
      isLoading={isLoading}
    />
  );
};
