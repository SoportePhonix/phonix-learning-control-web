'use client';

import { useState } from 'react';

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
import { useGetCoursesQuery } from '@/lib/services/api/coursesApi/coursesApi';
import { GraduationCap, Lock } from 'lucide-react';

import { useEnrollStudent } from '../hooks/useEnrollStudent';

interface EnrollStudentModalProps {
  studentId: number;
}

export const EnrollStudentModal = ({ studentId }: EnrollStudentModalProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | undefined>(undefined);

  const { data: coursesData, isLoading: isLoadingCourses } = useGetCoursesQuery();
  const { enrollStudent, isLoading: isEnrolling } = useEnrollStudent();
  const [hovered, setHovered] = useState(false);

  const courseOptions =
    coursesData?.data.map((course) => ({
      value: course.id,
      label: course.fullName,
    })) ?? [];

  const handleEnroll = async () => {
    if (!selectedCourseId) return;
    await enrollStudent(studentId, Number(selectedCourseId), () => {
      setOpen(false);
      setSelectedCourseId(undefined);
    });
  };

  const handleOpenChange = (value: boolean) => {
    setOpen(value);
    if (!value) setSelectedCourseId(undefined);
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
            placeholder={isLoadingCourses ? '...' : t('s.selectAnOption')}
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
