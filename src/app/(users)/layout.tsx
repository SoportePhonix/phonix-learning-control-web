import { AppSidebar } from '@/components/app-sidebar';
import { ThemeProvider } from '@/components/theme-provider';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import AuthProvider from '@/providers/auth';
import { StoreProvider } from '@/providers/store';
import { SessionContextProvider, SessionExpiredProvider } from '@/utils/context';
import { RtkRequestsProvider } from '@/utils/context/rtkRequests';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Phonix Contact',
  description: 'Phonix Contact',
};

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <StoreProvider>
        <SessionExpiredProvider>
          <SessionContextProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              <SidebarProvider>
                <RtkRequestsProvider>
                  <div className="flex h-screen w-screen">
                    <SidebarTrigger className="group-data-[collapsible=offcanvas]:fixed fixed text-var--primary-50" />
                    <AppSidebar />
                    <main className="flex-1 md:px-4 overflow-y-scroll">{children}</main>
                    <Toaster richColors position="top-right" />
                  </div>
                </RtkRequestsProvider>
              </SidebarProvider>
            </ThemeProvider>
          </SessionContextProvider>
        </SessionExpiredProvider>
      </StoreProvider>
    </AuthProvider>
  );
}
