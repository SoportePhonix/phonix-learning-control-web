'use client';

import React from 'react';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ChevronRight } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import { Separator } from './ui';
import { Typography } from './ui/typography';

// --- Style constants ---

const CLIP_PATH_STYLE = {
  clipPath: 'polygon(0.8rem 0, 100% 0, 100% 100%, 0 100%, 0 0.8rem)',
} as const;

const NAV_ACTIVE_CLASSES =
  'bg-nav-item-active-bg text-nav-item-active-text hover:bg-nav-item-active-hover-bg hover:text-nav-item-active-hover-text active:bg-nav-item-active-bg active:text-nav-item-active-text group-data-[state=collapsed]:bg-nav-item-active-collapsed-bg group-data-[state=collapsed]:text-nav-item-active-collapsed-text group-data-[state=collapsed]:hover:text-nav-item-active-collapsed-text group-data-[state=collapsed]:hover:bg-nav-item-active-collapsed-hover-bg group-data-[state=collapsed]:active:bg-nav-item-active-collapsed-bg';

const NAV_ACTIVE_MUTED_CLASSES =
  'bg-nav-item-inactive-hover-bg text-nav-item-inactive-hover-text hover:bg-nav-item-inactive-hover-bg hover:text-nav-item-inactive-hover-text active:bg-nav-item-inactive-hover-bg active:text-nav-item-inactive-hover-text group-data-[state=collapsed]:bg-nav-item-active-collapsed-bg group-data-[state=collapsed]:text-nav-item-active-collapsed-text group-data-[state=collapsed]:hover:text-nav-item-active-collapsed-text group-data-[state=collapsed]:hover:bg-nav-item-active-collapsed-hover-bg group-data-[state=collapsed]:active:bg-nav-item-active-collapsed-bg';

const NAV_INACTIVE_CLASSES =
  'text-nav-item-inactive-text hover:bg-nav-item-inactive-hover-bg group-data-[state=collapsed]:hover:bg-nav-item-inactive-collapsed-hover-bg hover:text-nav-item-inactive-hover-text active:bg-nav-item-inactive-hover-bg active:text-nav-item-inactive-text';

const BASE_BUTTON_CLASSES =
  'p-4 ml-4 rounded-none transition-colors cursor-pointer group-data-[state=collapsed]:ml-0 group-data-[state=collapsed]:w-23!';

// --- Helpers ---

function getParentClassName(isActive: boolean, isCompaniesItem: boolean, isCollapsed: boolean): string {
  if (!isActive) return `${BASE_BUTTON_CLASSES} ${NAV_INACTIVE_CLASSES}`;
  if (!isCollapsed && isCompaniesItem) return `${BASE_BUTTON_CLASSES} ${NAV_ACTIVE_MUTED_CLASSES}`;
  return `${BASE_BUTTON_CLASSES} ${NAV_ACTIVE_CLASSES}`;
}

// --- Sub-components ---

function NavMainButtonContent({
  icon: Icon,
  title,
  isActive,
}: {
  icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
  title: string;
  isActive: boolean;
}) {
  return (
    <div className="flex items-center gap-2 w-full relative whitespace-nowrap overflow-hidden group-data-[state=collapsed]:justify-center">
      <div className="shrink-0 group-data-[state=collapsed]:mx-auto">
        {Icon && (
          <Icon
            className={`${
              isActive
                ? 'stroke-nav-icon-active group-data-[state=collapsed]:stroke-nav-icon-active-collapsed'
                : 'stroke-nav-icon-inactive'
            } w-4 h-4 transition-colors`}
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
    url: string;
    icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
    items: {
      title: string;
      url: string;
      icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
    }[];
  }[];
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { state } = useSidebar();
  const [openGroups, setOpenGroups] = React.useState<Record<string, boolean>>({});

  React.useEffect(() => {
    const newState: Record<string, boolean> = {};

    items.forEach((item) => {
      const isActiveParent = item.items?.some((subItem) => pathname === subItem.url);
      if (isActiveParent) {
        newState[item.title] = true;
      }
    });

    setOpenGroups(newState);
  }, [pathname, items]);

  const handleNavigation = (url: string, e?: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (pathname !== url) {
      router.push(url);
    }
    e?.currentTarget.blur();
  };

  return (
    <TooltipProvider delayDuration={300}>
      <SidebarGroup className="mt-2 overflow-x-hidden">
        <SidebarMenu>
          {items.map((item) => {
            const isActiveParent = item.items?.some((subItem) => pathname === subItem.url);
            const activeSubItem = item.items?.find((subItem) => pathname === subItem.url);
            const isCollapsed = state === 'collapsed';
            const isCompaniesItem = item.url === '/companies';
            const isDirectNavigation = isCollapsed && isCompaniesItem;

            const parentButton = (
              <SidebarMenuButton
                variant="unstyled"
                isActive={false}
                onClick={isDirectNavigation ? (e) => handleNavigation(item.url, e) : undefined}
                style={CLIP_PATH_STYLE}
                className={getParentClassName(!!isActiveParent, isCompaniesItem, isCollapsed)}
              >
                <NavMainButtonContent icon={item.icon} title={item.title} isActive={!!isActiveParent} />
              </SidebarMenuButton>
            );

            return (
              <Collapsible
                key={item.title}
                open={openGroups[item.title] || false}
                onOpenChange={(open) =>
                  setOpenGroups((prev) => ({
                    ...prev,
                    [item.title]: open,
                  }))
                }
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  {isCollapsed ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        {isDirectNavigation ? (
                          parentButton
                        ) : (
                          <CollapsibleTrigger asChild>{parentButton}</CollapsibleTrigger>
                        )}
                      </TooltipTrigger>
                      <TooltipContent variant="right">
                        <p>
                          {item.title}
                          {activeSubItem && ` / ${activeSubItem.title}`}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <CollapsibleTrigger asChild>{parentButton}</CollapsibleTrigger>
                  )}
                  <Separator className="bg-nav-separator-bg h-[0.05rem] ml-4 my-2 w-10/12 group-data-[state=collapsed]:hidden" />
                  <CollapsibleContent className="transition-all duration-200">
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => {
                        const isSubActive = pathname === subItem.url;
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
                              className={`rounded-none p-3 cursor-pointer transition-colors duration-200 ml-4 mr-0 pr-8 ${
                                isSubActive
                                  ? 'bg-nav-item-active-bg text-nav-item-active-text pointer-events-none'
                                  : 'bg-transparent text-nav-item-inactive-text hover:bg-nav-item-inactive-hover-bg hover:text-nav-item-inactive-hover-text'
                              }`}
                            >
                              <div className="flex items-center gap-2 w-full">
                                {subItem.icon && (
                                  <subItem.icon
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
                            <Separator
                              style={{
                                position: 'relative',
                                right: '-1rem',
                                zIndex: isSubActive ? 10 : 1,
                              }}
                              className="bg-nav-separator-bg h-[0.05rem] my-1 w-9/12 opacity-50 ml-4"
                            />
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
