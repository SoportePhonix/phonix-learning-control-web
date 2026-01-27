import { AlertConfirmDialogDestructive } from '@/components/AlertConfirmDialogDestructive';
import { useTranslation } from '@/i18n';
import { useDeleteStudentMutation } from '@/lib/services/api/studentsApi/studentsApi';

import { useDeleteStudent } from '../hooks/useDeleteStudent';

export const DeleteStudent = ({ studentId }: { studentId: number }) => {
  const { t } = useTranslation();
  const { deleteStudent, isLoading } = useDeleteStudent();

  return (
    <AlertConfirmDialogDestructive
      tooltipText={t('d.deleteStudent')}
      title={t('d.deleteStudent')}
      description={t('a.areYouSureYouWantToDeleteThisStudent')}
      onConfirm={async () => await deleteStudent(studentId)}
      confirmText={t('d.delete')}
      cancelText={t('c.cancel')}
      variant="destructive"
      isLoading={isLoading}
    />
  );
};
