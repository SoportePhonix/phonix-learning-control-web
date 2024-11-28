import { AppSidebar } from '@/components/app-sidebar';
import { ModeToggle } from '@/components/mode-toogle';
import { ThemeProvider } from '@/components/theme-provider';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AuthProvider from '@/providers/auth';
import { StoreProvider } from '@/providers/store';
import { SessionContextProvider, SessionExpiredProvider } from '@/utils/context';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Usuarios - Diezforlife',
  description: 'Panel de usuarios de Diezforlife',
};

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <StoreProvider>
        <SessionExpiredProvider>
          <SessionContextProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              <SidebarProvider>
                <AppSidebar />
                <main className="p-2">
                  <SidebarTrigger className="hover:bg-background_hover dark:border-gray-600 dark:hover:bg-gray-800 p-[1.1rem]" />
                  <ModeToggle />
                  {children}
                </main>
              </SidebarProvider>
            </ThemeProvider>
          </SessionContextProvider>
        </SessionExpiredProvider>
      </StoreProvider>
    </AuthProvider>
  );
}
