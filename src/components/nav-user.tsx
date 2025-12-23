'use client';

import {
  Avatar,
  AvatarFallback,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  Skeleton,
  useSidebar,
} from '@/components/ui';
import { ChevronsUpDown, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function NavUser({
  user,
}: {
  user: {
    /*  */
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { isMobile } = useSidebar();
  const router = useRouter();

  const isLoading = !user?.name || !user?.email || !user?.avatar;
  const avatarName = user.name
    .split(' ')
    .map((word) => word[0])
    .slice(0, 2)
    .join('');

  return (
    <SidebarMenu className="group-data-[collapsible=icon]:ml-4 ml-0 ">
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className="text-brand hover:text-brand cursor-pointer"
            // className="text-brand hover:bg-primary-50 hover:text-brand dark:hover:bg-background dark:hover:text-blanco"
          >
            {isLoading ? (
              <SidebarMenuButton size="lg" className="p-2">
                <Skeleton className="h-8 w-8 rounded-lg mr-3" />
                <div className="grid flex-1 gap-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </SidebarMenuButton>
            ) : (
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-primary-50 dark:data-[state=open]:bg-background"
              >
                <Avatar className="h-8 w-8 rounded-full bg-morado-oscuro">
                  {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                  <AvatarFallback className="bg-primary-50 text-blanco font-bold">
                    {/* <AvatarFallback className="bg-primary-50 text-blanco font-bold dark:bg-brand-dark"> */}
                    {avatarName}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            )}
          </DropdownMenuTrigger>
          {!isLoading && (
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-gray_login border-primary-50/30"
              side={isMobile ? 'bottom' : 'right'}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                    <AvatarFallback className="rounded-lg bg-primary-50">{avatarName}</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user.name}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer hover:bg-gray-"
                onClick={() => {
                  router.push('/logout');
                }}
              >
                <LogOut />
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
