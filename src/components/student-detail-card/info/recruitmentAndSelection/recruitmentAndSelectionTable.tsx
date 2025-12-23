'use client';

import { DataTable } from '@/components/ui/data-table';
import { recruitmentAndSelectionColumns } from '@/hooks/students/info/recruitmentAndSelection/recruitmentAndSelection.columns';
import { RecruitmentAndSelection } from '@/hooks/students/info/recruitmentAndSelection/recruitmentAndSelection.types';

export function RecruitmentAndSelectionTable({ data }: { data: RecruitmentAndSelection[] }) {
  return (
    <div
      className="

        pb-24 
      
        [&_.data-table-search]:hidden
        [&_.data-table-filters]:hidden
        [&_.data-table-pagination]:hidden

        /* HEADER */
        [&_th]:!bg-[rgba(11,38,46,1)]
        [&_th]:!text-white
        [&_th]:font-medium

        /* FILAS */
        [&_tbody_tr:nth-child(odd)]:bg-[rgba(11,38,46,0.17)]
        [&_tbody_tr:nth-child(even)]:bg-[rgba(233,239,242,1)]
        [&_tbody_tr:hover]:bg-inherit
      "
    >
      <DataTable columns={recruitmentAndSelectionColumns} data={data} />
    </div>
  );
}
