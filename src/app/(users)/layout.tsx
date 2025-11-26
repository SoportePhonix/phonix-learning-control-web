import { AppSidebar } from '@/components/app-sidebar';
import { ThemeProvider } from '@/components/theme-provider';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import AuthProvider from '@/providers/auth';
import { StoreProvider } from '@/providers/store';
import { SessionContextProvider, SessionExpiredProvider } from '@/utils/context';
import { RtkRequestsProvider } from '@/utils/context/rtkRequests';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'Phonix Contact',
  description: 'Phonix Contact',
};

export default async function UserLayout({ children }: { children: React.ReactNode }) {
  // Read sidebar state from cookies on the server
  const cookieStore = await cookies();
  const sidebarState = cookieStore.get('sidebar:state');
  const defaultOpen = sidebarState ? sidebarState.value === 'true' : true;

  return (
    <AuthProvider>
      <StoreProvider>
        <SessionExpiredProvider>
          <SessionContextProvider>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
              <SidebarProvider defaultOpen={defaultOpen}>
                <RtkRequestsProvider>
                  <div className="flex h-screen w-screen">
                    <SidebarTrigger className="group-data-[collapsible=offcanvas]:fixed fixed" />
                    <AppSidebar />
                    <main className="flex-1 md:px-8 overflow-y-scroll">{children}</main>
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
