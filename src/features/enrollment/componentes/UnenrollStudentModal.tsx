'use client';

import { useEffect, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useTranslation } from '@/i18n';
import { Button, SelectSearch } from '@/lib/phonix-ui';
import {
  useDeleteEnrollmentMutation,
  useGetStudentEnrollmentsQuery,
} from '@/lib/services/api/enrollmentApi/enrollmentApi';
import { LockOpen } from 'lucide-react';
import { toast } from 'sonner';

interface UnenrollStudentModalProps {
  studentId: number;
}

export const UnenrollStudentModal = ({ studentId }: UnenrollStudentModalProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const [hovered, setHovered] = useState(false);

  const { data: coursesData, isLoading: isLoadingCourses } = useGetStudentEnrollmentsQuery(studentId, {
    skip: !open,
  });
  const [deleteEnrollmentMutation, { isLoading: isUnenrolling }] = useDeleteEnrollmentMutation();

  useEffect(() => {
    setSelectedCourseId('');
  }, [studentId]);

  const courseOptions =
    coursesData?.data.enrollments.map((enrollment) => ({
      value: enrollment.course.id,
      label: enrollment.course.fullName,
    })) ?? [];

  const handleUnenroll = async () => {
    if (!selectedCourseId) return;
    try {
      await deleteEnrollmentMutation({
        studentId,
        courseId: Number(selectedCourseId),
      }).unwrap();
      toast.success(t('e.unenrollmentSuccessful'));
      setOpen(false);
      setSelectedCourseId('');
    } catch (err: unknown) {
      const status =
        typeof err === 'object' && err !== null && 'status' in err ? (err as { status?: number }).status : undefined;
      if (status === 404) {
        toast.error(t('e.unenrollmentNotFound'));
      } else {
        toast.error(t('e.unenrollmentFailed'));
      }
    }
  };

  const handleOpenChange = (value: boolean) => {
    setOpen(value);
    if (!value) setSelectedCourseId('');
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <button
                className="cursor-pointer inline-flex items-center justify-center rounded-md py-1 px-2 text-muted-foreground transition-colors hover:bg-accent hover:text-warning"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <LockOpen className="h-4.5 w-4.5" strokeWidth={hovered ? 2.5 : 2} />
                <span className="sr-only">{t('e.unenrollStudent')}</span>
              </button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t('e.unenrollStudent')}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent className="sm:max-w-md bg-background-primary">
        <DialogHeader>
          <DialogTitle>{t('e.unenrollStudent')}</DialogTitle>
          <DialogDescription>{t('e.unenrollStudentFromCourse')}</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <SelectSearch
            data={courseOptions}
            valueKey="value"
            labelKey="label"
            selectedValue={selectedCourseId}
            onSelect={(value) => setSelectedCourseId(String(value))}
            label={t('c.courses')}
            placeholder={isLoadingCourses ? 'Cargando cursos...' : t('s.selectAnOption')}
          />
        </div>

        <DialogFooter>
          <Button variant="primary" onClick={() => handleOpenChange(false)} disabled={isUnenrolling}>
            {t('c.cancel')}
          </Button>
          <Button variant="secondary" onClick={handleUnenroll} disabled={!selectedCourseId || isUnenrolling}>
            {t('e.unenroll')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
