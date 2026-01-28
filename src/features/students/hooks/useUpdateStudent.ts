import { useTranslation } from '@/i18n';
import { useUpdateStudentMutation } from '@/lib/services/api/studentsApi/studentsApi';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useUpdateStudent(userId: string) {
  const { t } = useTranslation();
  const router = useRouter();
  const [updateStudentMutation, { isLoading, error }] = useUpdateStudentMutation();

  const updateStudent = async (values: Record<string, any>) => {
    const payload = {
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
      username: values.username,
      password: values.password,
      documentTypeId: Number(values.documentTypeId),
      documentNumber: values.documentNumber,
      description: values.description,
      city: values.city,
      country: values.country,
      institution: values.institution,
      department: values.department,
      phone: values.phone,
      address: values.address,
      status: values.status ?? 'active',
      ...(values.companyId && { companyId: Number(values.companyId) }),
      ...(values.areaId ? { areaId: Number(values.areaId) } : {}),
      ...(values.positionId ? { positionId: Number(values.positionId) } : {}),
    };

    try {
      await updateStudentMutation({
        id: Number(userId),
        ...payload,
      }).unwrap();

      toast.success(`${values.firstname ?? ''} ${values.lastname ?? ''} ${t('u.updatedSuccessfully')}`, {
        id: 'student-updated-success',
      });

      router.push('/students');
    } catch (err: any) {
      const status = err?.status ?? 500;
      const message = (err?.data?.message || '').toString().toLowerCase();

      if (status === 409) {
        if (message.includes('email')) {
          toast.error(t('e.existingEmail'));
          return;
        }

        if (
          message.includes('Ya existe un estudiante con este correo en la empresa') ||
          message.includes('document') ||
          message.includes('documentnumber')
        ) {
          toast.error(t('e.existingIdentificationDocument'));
          return;
        }
      }

      toast.error(t('e.errorUpdatingStudent'));
    }
  };

  return {
    updateStudent,
    isLoading,
    apiError: (error as any)?.status ?? null,
  };
}
