'use client';

import React from 'react';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { ChevronRight, Dot } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import { Typography } from './ui/typography';

// --- Style constants ---

const CLIP_PATH_STYLE = {
  clipPath: 'polygon(0.8rem 0, 100% 0, 100% 100%, 0 100%, 0 0.8rem)',
} as const;

const NAV_ACTIVE_CLASSES =
  'bg-nav-item-active-bg text-nav-item-active-text hover:bg-nav-item-active-hover-bg hover:text-nav-item-active-hover-text active:bg-nav-item-active-bg active:text-nav-item-active-text group-data-[state=collapsed]:bg-nav-item-active-collapsed-bg group-data-[state=collapsed]:text-nav-item-active-collapsed-text group-data-[state=collapsed]:hover:text-nav-item-active-collapsed-text group-data-[state=collapsed]:hover:bg-nav-item-active-collapsed-hover-bg group-data-[state=collapsed]:active:bg-nav-item-active-collapsed-bg';

const NAV_ACTIVE_MUTED_CLASSES =
  'bg-nav-menu-parent-open-bg text-nav-item-inactive-hover-text hover:bg-nav-item-inactive-hover-bg hover:text-nav-item-inactive-hover-text active:bg-nav-item-inactive-hover-bg active:text-nav-item-inactive-hover-text group-data-[state=collapsed]:bg-nav-item-active-collapsed-bg group-data-[state=collapsed]:text-nav-item-active-collapsed-text group-data-[state=collapsed]:hover:text-nav-item-active-collapsed-text group-data-[state=collapsed]:hover:bg-nav-item-active-collapsed-hover-bg group-data-[state=collapsed]:active:bg-nav-item-active-collapsed-bg';

const NAV_INACTIVE_CLASSES =
  'text-nav-item-inactive-text hover:bg-nav-item-inactive-hover-bg group-data-[state=collapsed]:hover:bg-nav-item-inactive-collapsed-hover-bg hover:text-nav-item-inactive-hover-text active:bg-nav-item-inactive-hover-bg active:text-nav-item-inactive-text';

const BASE_BUTTON_CLASSES =
  'py-4.5 px-4 ml-4 rounded-none transition-colors cursor-pointer group-data-[state=collapsed]:ml-0 group-data-[state=collapsed]:w-23!';

// --- Helpers ---

function getParentClassName(isActive: boolean, isChildActive: boolean, isCollapsed: boolean): string {
  if (!isActive) return `${BASE_BUTTON_CLASSES} ${NAV_INACTIVE_CLASSES}`;
  if (!isCollapsed && isChildActive) return `${BASE_BUTTON_CLASSES} ${NAV_ACTIVE_MUTED_CLASSES}`;
  return `${BASE_BUTTON_CLASSES} ${NAV_ACTIVE_CLASSES}`;
}

// --- Sub-components ---

function NavMainButtonContent({
  icon: Icon,
  title,
  isActive,
  url,
  onIconClick,
}: {
  icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
  title: string;
  isActive: boolean;
  url?: string;
  onIconClick?: (e: React.MouseEvent) => void;
}) {
  return (
    <div className="flex items-center gap-2 w-full relative whitespace-nowrap overflow-hidden group-data-[state=collapsed]:justify-center group-data-[state=collapsed]:ml-0 ml-6">
      <div
        className={`shrink-0 group-data-[state=collapsed]:mx-auto ${url ? 'cursor-pointer hover:opacity-80' : ''}`}
        onClick={url ? onIconClick : undefined}
        role={url ? 'button' : undefined}
        tabIndex={url ? 0 : undefined}
      >
        {Icon && (
          <Icon
            className={`${isActive ? 'stroke-nav-icon-inactive group-data-[state=collapsed]:stroke-nav-icon-inactive' : 'stroke-nav-icon-inactive'} w-4 h-4 transition-colors`}
          />
        )}
      </div>
      <Typography
        variant="parrafo-pequeno"
        className="group-data-[state=collapsed]:hidden whitespace-nowrap overflow-hidden text-ellipsis"
      >
        {title}
      </Typography>
      <ChevronRight className="ml-auto transition-colors duration-200 group-data-[state=collapsed]:hidden group-data-[state=open]/collapsible:rotate-90 stroke-nav-icon-inactive" />
    </div>
  );
}

// --- Main component ---

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url?: string;
    icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
    items: {
      title: string;
      url: string;
      icon?: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
    }[];
  }[];
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { state, isMobile } = useSidebar();
  const [hoveredPopover, setHoveredPopover] = React.useState<string | null>(null);
  const closeTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  // Estado para menús cerrados manualmente (key: título del menú)
  // Se usa useRef para evitar re-renders innecesarios
  const userClosedMenusRef = React.useRef<Record<string, boolean>>({});
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

  // Track de la ruta anterior para resetear cierre manual solo cuando cambie de subitem
  const prevPathnameRef = React.useRef(pathname);

  const openPopover = (title: string) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setHoveredPopover(title);
  };

  const closePopover = () => {
    closeTimeoutRef.current = setTimeout(() => setHoveredPopover(null), 80);
  };

  // Verificar si un subitem está activo (comparando rutas sin query params)
  const isSubItemActive = React.useCallback(
    (subItemUrl: string) => {
      const urlBase = subItemUrl.split('?')[0];
      return pathname === urlBase || pathname.startsWith(urlBase + '/');
    },
    [pathname]
  );

  const isMenuActive = React.useCallback(
    (item: (typeof items)[0]) => {
      return item.items?.some((subItem) => isSubItemActive(subItem.url)) ?? false;
    },
    [isSubItemActive]
  );

  React.useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      userClosedMenusRef.current = {};
      prevPathnameRef.current = pathname;
    }
  }, [pathname]);

  const shouldMenuBeOpen = React.useCallback(
    (item: (typeof items)[0]) => {
      const hasActiveRoute = isMenuActive(item);

      if (hasActiveRoute) {
        return userClosedMenusRef.current[item.title] !== true;
      }
      return false;
    },
    [isMenuActive]
  );

  const handleMenuToggle = React.useCallback(
    (item: (typeof items)[0], wantsOpen: boolean) => {
      const hasActiveRoute = isMenuActive(item);
      if (hasActiveRoute) {
        userClosedMenusRef.current[item.title] = !wantsOpen;
        forceUpdate();
      }
    },
    [isMenuActive]
  );

  const handleNavigation = React.useCallback(
    (url: string, e?: React.MouseEvent) => {
      e?.preventDefault();
      e?.stopPropagation();
      router.push(url);
    },
    [router]
  );

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <TooltipProvider delayDuration={300}>
      <SidebarGroup className="mt-0 overflow-x-hidden">
        <SidebarMenu>
          {items.map((item) => {
            const hasActiveSubItem = isMenuActive(item);
            const isCollapsed = state === 'collapsed' && !isMobile;
            const menuOpen = shouldMenuBeOpen(item);

            const handleIconClick = (e: React.MouseEvent) => {
              if (item.url) {
                e.preventDefault();
                e.stopPropagation();
                router.push(item.url);
              }
            };

            const parentButton = (
              <SidebarMenuButton
                variant="unstyled"
                isActive={false}
                style={CLIP_PATH_STYLE}
                className={getParentClassName(hasActiveSubItem, hasActiveSubItem, isCollapsed)}
              >
                <NavMainButtonContent
                  icon={item.icon}
                  title={item.title}
                  isActive={hasActiveSubItem}
                  url={item.url}
                  onIconClick={handleIconClick}
                />
              </SidebarMenuButton>
            );

            return (
              <Collapsible
                key={item.title}
                open={menuOpen}
                onOpenChange={(open) => handleMenuToggle(item, open)}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  {isCollapsed ? (
                    <Popover open={hoveredPopover === item.title}>
                      <PopoverTrigger asChild onMouseEnter={() => openPopover(item.title)} onMouseLeave={closePopover}>
                        {parentButton}
                      </PopoverTrigger>
                      <PopoverContent
                        side="right"
                        align="start"
                        sideOffset={20}
                        className="w-auto py-2 bg-sidebar-tooltip-bg text-sidebar-tooltip-text border-none shadow-md rounded-lg"
                        onMouseEnter={() => openPopover(item.title)}
                        onMouseLeave={closePopover}
                      >
                        <PopoverPrimitive.Arrow className="fill-sidebar-tooltip-bg" />
                        <p className="px-2 py-1.5 font-semibold">{item.title}</p>
                        {item.items?.map((subItem) => {
                          const isSubActive = isSubItemActive(subItem.url);
                          return (
                            <button
                              key={subItem.title}
                              onClick={(e) => handleNavigation(subItem.url, e)}
                              className={`w-full text-left px-2 py-1.5 rounded-sm flex items-center gap-2 cursor-pointer ${
                                isSubActive
                                  ? 'bg-nav-item-active-bg text-nav-item-active-text pointer-events-none'
                                  : 'text-nav-icon-active-collapsed hover:bg-nav-item-inactive-hover-bg'
                              }`}
                            >
                              {subItem.icon ? (
                                <subItem.icon
                                  className={`w-4 h-4 shrink-0 ${
                                    isSubActive ? 'stroke-nav-icon-active' : 'stroke-nav-icon-active'
                                  }`}
                                />
                              ) : (
                                <Dot
                                  className={`w-4 h-4 shrink-0 ${
                                    isSubActive ? 'stroke-nav-icon-active' : 'stroke-nav-icon-active'
                                  }`}
                                />
                              )}
                              <Typography variant="parrafo-pequeno" className="text-inherit! text-sm">
                                {subItem.title}
                              </Typography>
                            </button>
                          );
                        })}
                      </PopoverContent>
                    </Popover>
                  ) : (
                    <CollapsibleTrigger asChild>{parentButton}</CollapsibleTrigger>
                  )}
                  <CollapsibleContent className="transition-all duration-200">
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => {
                        const isSubActive = isSubItemActive(subItem.url);
                        return (
                          <SidebarMenuSubItem key={subItem.title} className="relative">
                            <SidebarMenuSubButton
                              onClick={(e) => handleNavigation(subItem.url, e)}
                              style={{
                                ...CLIP_PATH_STYLE,
                                position: 'relative',
                                right: '-1rem',
                                zIndex: isSubActive ? 10 : 1,
                              }}
                              className={`rounded-none cursor-pointer transition-colors duration-200 ml-0 mr-0 py-4.5 pl-6 pr-8 ${
                                isSubActive
                                  ? 'bg-nav-item-active-bg text-nav-item-active-text pointer-events-none'
                                  : 'bg-transparent text-nav-item-inactive-text hover:bg-nav-item-inactive-hover-bg hover:text-nav-item-inactive-hover-text'
                              }`}
                            >
                              <div className="flex items-center gap-2 w-full">
                                {subItem.icon ? (
                                  <subItem.icon
                                    className={`w-3 h-3 transition-colors ml-8 ${
                                      isSubActive ? 'stroke-nav-icon-active' : 'stroke-nav-icon-inactive'
                                    }`}
                                  />
                                ) : (
                                  <Dot
                                    className={`w-3 h-3 transition-colors ml-7 ${
                                      isSubActive ? 'stroke-nav-icon-active' : 'stroke-nav-icon-inactive'
                                    }`}
                                  />
                                )}
                                <Typography variant="parrafo-pequeno" className="text-inherit! text-sm">
                                  {subItem.title}
                                </Typography>
                              </div>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            );
          })}
        </SidebarMenu>
      </SidebarGroup>
    </TooltipProvider>
  );
}
