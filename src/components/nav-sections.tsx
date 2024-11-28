'use client';

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { usePathname, useRouter } from 'next/navigation';

import { Typography } from './ui/typography';

export function NavSections({
  sections,
  showLabel = false,
}: {
  sections: {
    name: string;
    url: string;
    icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  }[];
  showLabel?: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigation = (url: string) => {
    if (pathname !== url) {
      router.push(url);
    }
  };
  return (
    <SidebarGroup>
      {showLabel && <SidebarGroupLabel>sections</SidebarGroupLabel>}
      <SidebarMenu>
        {sections.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton
              tooltip={item.name}
              onClick={() => handleNavigation(item.url)}
              className={`p-[1.1rem] rounded-none hover:bg-var--brand dark:hover:bg-background ${
                pathname === item.url
                  ? 'bg-var--brand hover:bg-var--brand text-var--primary-100 dark:bg-var--brand-dark dark:hover:bg-var--brand-dark dark:text-var--brand'
                  : 'hover:bg-var--brand text-var--brand dark:hover:bg-var--brand-dark hover:text-var--primary-100 dark:text-var--brand'
              } group-data-[state=collapsed]:!w-16`}
            >
              <div className="flex items-center gap-2 w-full cursor-pointer">
                <div className="ml-2">
                  <item.icon
                    className={`${
                      pathname === item.url
                        ? 'stroke-var--primary-100 hover:stroke-var--brand'
                        : 'stroke-var--light_blue'
                    } w-5 h-5`}
                  />
                </div>
                <Typography variant="parrafo" className="group-data-[state=collapsed]:hidden">
                  {item.name}
                </Typography>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
