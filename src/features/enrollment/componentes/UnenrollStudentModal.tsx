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
import { LockOpen, UserMinus } from 'lucide-react';

import { useUnenrollStudent } from '../hooks/useUnenrollStudent';

interface UnenrollStudentModalProps {
  studentId: number;
}

export const UnenrollStudentModal = ({ studentId }: UnenrollStudentModalProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | undefined>(undefined);
  const [hovered, setHovered] = useState(false);

  const { data: coursesData, isLoading: isLoadingCourses } = useGetCoursesQuery();
  const { unenrollStudent, isLoading: isUnenrolling } = useUnenrollStudent();

  const courseOptions =
    coursesData?.data.map((course) => ({
      value: course.id,
      label: course.fullName,
    })) ?? [];

  const handleUnenroll = async () => {
    if (!selectedCourseId) return;
    await unenrollStudent(studentId, Number(selectedCourseId), () => {
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
            placeholder={isLoadingCourses ? '...' : t('s.selectAnOption')}
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
