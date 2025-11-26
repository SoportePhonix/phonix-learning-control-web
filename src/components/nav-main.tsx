'use client';

import React from 'react';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Typography } from './ui/typography';

export function NavMain({
  items,
  showLabel = false,
}: {
  items: {
    title: string;
    url: string;
    icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
  showLabel?: boolean;
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      {showLabel && <SidebarGroupLabel>Platform</SidebarGroupLabel>}
      <SidebarMenu>
        {items.map((item) => {
          const isActive = pathname?.includes(item.title.toLowerCase());
          return (
            <Collapsible key={item.title} asChild defaultOpen={item.isActive || isActive} className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger
                  asChild
                  className="rounded-l-none rounded-r-3xl hover:bg-verde_base dark:hover:bg-verde_base w-full"
                >
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={`p-[1.1rem] ${
                      isActive
                        ? 'bg-verde_base hover:bg-verde_base text-white'
                        : 'text-white dark:text-white hover:text-white'
                    } group-data-[state=collapsed]:!w-16`}
                  >
                    {item.icon && (
                      <div className="ml-2 group-data-[state=collapsed]:ml-6 transition-transform duration-300 group-data-[state=collapsed]:scale-75">
                        <item.icon />
                      </div>
                    )}
                    <Typography variant="parrafo_base" className="group-data-[state=collapsed]:hidden">
                      {item.title}
                    </Typography>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 group-data-[state=collapsed]:hidden" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => {
                      const isSubActive = pathname?.includes(subItem.url.toLowerCase());
                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            className={`rounded-l-none rounded-r-3xl p-[1.1rem] hover:bg-gris-base text-negro
                              ${isSubActive ? 'bg-gris-bajo dark:bg-background hover:bg-gris-bajo' : 'dark:hover:bg-background'}
                              `}
                          >
                            <Link href={subItem.url}>
                              <div className="ml-6 h-2 w-2 border-[0.1rem]  rounded-full border-negro dark:border-blanco" />
                              <Typography
                                variant="parrafo-pequeno"
                                className={`${isSubActive ? 'text-negro dark:text-blanco' : 'text-negro dark:text-blanco'}`}
                              >
                                {subItem.title}
                              </Typography>
                            </Link>
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
  );
}
