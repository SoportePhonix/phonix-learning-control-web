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
                  className="rounded-l-none rounded-r-3xl hover:bg-var--primary-50 dark:hover:bg-var--primary-50 w-full"
                >
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={`p-[1.1rem] ${
                      isActive
                        ? 'bg-var--primary-50 hover:bg-var--primary-50 text-white'
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
                            className={`rounded-l-none rounded-r-3xl p-[1.1rem] hover:bg-var--gris-base text-var--negro
                              ${isSubActive ? 'bg-var--gris-bajo dark:bg-background hover:bg-var--gris-bajo' : 'dark:hover:bg-background'}
                              `}
                          >
                            <Link href={subItem.url}>
                              <div className="ml-6 h-2 w-2 border-[0.1rem]  rounded-full border-var--negro dark:border-var--blanco" />
                              <Typography
                                variant="parrafo-pequeno"
                                className={`${isSubActive ? 'text-var--negro dark:text-var--blanco' : 'text-var--negro dark:text-var--blanco'}`}
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
