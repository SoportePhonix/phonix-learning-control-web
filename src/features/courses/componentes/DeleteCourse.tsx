import { AlertConfirmDialogDestructive } from '@/components/AlertConfirmDialogDestructive';
import { useTranslation } from '@/i18n';

import { useDeleteCourse } from '../hooks/useDeleteCourse';

export const DeleteCourse = ({ courseId }: { courseId: number }) => {
  const { t } = useTranslation();
  const { deleteCourse, isLoading } = useDeleteCourse();

  return (
    <AlertConfirmDialogDestructive
      tooltipText={t('d.deleteCourse')}
      title={t('d.deleteCourse')}
      description={t('a.areYouSureYouWantToDeleteThisCourse')}
      onConfirm={async () => await deleteCourse(courseId)}
      confirmText={t('d.delete')}
      cancelText={t('c.cancel')}
      variant="destructive"
      isLoading={isLoading}
    />
  );
};
