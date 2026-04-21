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
import { useAddEnrollmentMutation, useGetAvailableCoursesQuery } from '@/lib/services/api/enrollmentApi/enrollmentApi';
import { Lock } from 'lucide-react';
import { toast } from 'sonner';

interface EnrollStudentModalProps {
  studentId: number;
}

export const EnrollStudentModal = ({ studentId }: EnrollStudentModalProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');

  const { data: coursesData, isLoading: isLoadingCourses } = useGetAvailableCoursesQuery(studentId, {
    skip: !open,
  });
  const [addEnrollmentMutation, { isLoading: isEnrolling }] = useAddEnrollmentMutation();
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    setSelectedCourseId('');
  }, [studentId]);

  const courseOptions =
    coursesData?.data.map((course) => ({
      value: course.id,
      label: course.fullName,
    })) ?? [];

  const handleEnroll = async () => {
    if (!selectedCourseId) return;
    try {
      await addEnrollmentMutation({
        studentId,
        courseId: Number(selectedCourseId),
      }).unwrap();
      toast.success(t('e.enrollmentSuccessful'));
      setOpen(false);
      setSelectedCourseId('');
    } catch (err: unknown) {
      const status =
        typeof err === 'object' && err !== null && 'status' in err ? (err as { status?: number }).status : undefined;
      if (status === 409) {
        toast.error(t('e.enrollmentAlreadyExists'));
      } else {
        toast.error(t('e.enrollmentFailed'));
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
                className="cursor-pointer inline-flex items-center justify-center rounded-md py-1 px-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <Lock className="h-4.5 w-4.5" strokeWidth={hovered ? 2.5 : 2} />
                <span className="sr-only">{t('e.enrollStudent')}</span>
              </button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t('e.enrollStudent')}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent className="sm:max-w-md bg-background-primary">
        <DialogHeader>
          <DialogTitle>{t('e.enrollStudent')}</DialogTitle>
          <DialogDescription>{t('e.enrollStudentInCourse')}</DialogDescription>
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
          <Button variant="primary" onClick={() => handleOpenChange(false)} disabled={isEnrolling}>
            {t('c.cancel')}
          </Button>
          <Button variant="secondary" onClick={handleEnroll} disabled={!selectedCourseId || isEnrolling}>
            {t('e.enroll')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
