import { AlertConfirmDialogDestructive } from '@/components/AlertConfirmDialogDestructive';
import { useTranslation } from '@/i18n';
import { useDeleteStudentMutation } from '@/lib/services/api/studentsApi/studentsApi';

import { useDeleteStudent } from '../hooks/useDeleteStudent';
import { useDeleteUser } from '../hooks/useDeleteUser';

export const DeleteStudent = ({ studentId }: { studentId: number }) => {
  const { t } = useTranslation();
  const { deleteStudent, isLoading } = useDeleteStudent();

  return (
    <AlertConfirmDialogDestructive
      tooltipText={t('d.deleteUser')}
      title={t('d.deleteUser')}
      description={t('a.areYouSureYouWantToDeleteThisUser')}
      onConfirm={async () => await deleteStudent(studentId)}
      confirmText={t('d.delete')}
      cancelText={t('c.cancel')}
      variant="destructive"
      isLoading={isLoading}
    />
  );
};
