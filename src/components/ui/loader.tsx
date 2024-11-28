import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export function Loader({ message = 'Cargando...', isLoading = true }) {
  if (!isLoading) return null;

  return (
    <div className={cn('absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50')}>
      <div className="flex flex-col items-center">
        <Loader2 className="animate-spin text-white w-16 h-16" />
        <span className="mt-4 text-white text-lg">{message}</span>
      </div>
    </div>
  );
}
