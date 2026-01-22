import { TranslationKey, useTranslation } from '@/i18n';
import { cn } from '@/lib/utils';

type StatusType = 'success' | 'progress' | 'error';

type StatusBadgeProps = {
  type: StatusType;
  label?: TranslationKey;
};

const STATUS_CONFIG: Record<StatusType, { color: string; defaultLabel: TranslationKey }> = {
  success: {
    color: '#3BB273',
    defaultLabel: 'c.completed',
  },
  progress: {
    color: '#00BCD4',
    defaultLabel: 'i.initiated',
  },
  error: {
    color: '#D4514E',
    defaultLabel: 'w.withoutStarting',
  },
};

export function StatusBadge({ type, label }: StatusBadgeProps) {
  const { t } = useTranslation();

  const { color, defaultLabel } = STATUS_CONFIG[type] ?? STATUS_CONFIG.error;

  return (
    <span
      className={cn('inline-flex items-center justify-center text-xs font-medium text-white rounded-[8px] px-1 py-0.5')}
      style={{ backgroundColor: color }}
    >
      {t(label ?? defaultLabel)}
    </span>
  );
}
