'use client';

import { useEffect, useState } from 'react';

import { CompanySelector } from '@/components/company-selector';
import {
  Avatar,
  AvatarFallback,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Skeleton,
} from '@/components/ui';
import { useSessionContext } from '@/utils/context/sessionContext';
import { LogOut } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export function FloatingUserAvatar() {
  const { session } = useSessionContext();
  const router = useRouter();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const name = `${session?.user?.name ?? ''} ${session?.user?.lastName ?? ''}`.trim();
  const email = session?.user?.email ?? '';
  const isLoading = !isMounted || !name || !email;

  // Determinar si estamos en una ruta donde se debe mostrar el selector
  // Se muestra en todas EXCEPTO: /users, /instances, /lms, /companies
  const isCompanyRoute =
    !pathname.startsWith('/users') &&
    !pathname.startsWith('/instances') &&
    !pathname.startsWith('/lms') &&
    !pathname.startsWith('/companies');

  const avatarName = name
    ? name
        .split(' ')
        .map((word) => word[0])
        .slice(0, 2)
        .join('')
    : '';

  return (
    <div className="border-b border-placeholder w-full flex items-center justify-between px-4 py-0 gap-4 h-16">
      {/* Company Selector - Always in layout, visibility controlled by CSS */}
      <div className={`shrink-0 ml-3 ${isCompanyRoute ? 'visible' : 'invisible'}`}>
        <CompanySelector />
      </div>

      {/* User Avatar */}
      <div className="shrink-0">
        {isLoading ? (
          <Skeleton className="h-8 w-8 rounded-full" />
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-8 w-8 rounded-full bg-nav-item-user-bg cursor-pointer">
                <AvatarFallback className="bg-verde_base text-nav-item-user-text font-bold">
                  {avatarName}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="min-w-56 rounded-lg bg-background-secondary border-radius-primary"
              side="bottom"
              align="end"
              sideOffset={8}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarFallback className="rounded-lg bg-nav-item-user-bg text-base-white font-bold">
                      {avatarName}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight text-nav-item-user-text-dropdown">
                    <span className="truncate font-semibold">{name}</span>
                    <span className="truncate text-xs">{email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" onClick={() => router.push('/logout')}>
                <LogOut />
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}
