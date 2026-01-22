import { cn } from '@/lib/utils';

type StatusBadgeProps = {
  status: unknown;
  label: string;
};

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const normalized = String(status).toLowerCase().trim();

  const isActive = normalized === 'active' || normalized === '1' || normalized === 'true';

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center text-xs font-medium text-white rounded-[10px]',
        isActive ? 'h-[24px] w-[107px] px-[6px]' : 'h-[30px] w-[91px] px-[8px] py-[3px]'
      )}
      style={{
        backgroundColor: isActive ? '#3BB273' : '#D4514E',
      }}
    >
      {label}
    </span>
  );
}
