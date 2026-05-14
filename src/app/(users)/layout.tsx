import { Suspense } from 'react';

import { AppSidebar } from '@/components/app-sidebar';
import { FloatingUserAvatar } from '@/components/floating-user-avatar';
import { ThemeProvider } from '@/components/theme-provider';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import AuthProvider from '@/providers/auth';
import { StoreProvider } from '@/providers/store';
import { RouteGuard } from '@/rbac';
import { SelectedCompanyProvider, SessionContextProvider, SessionExpiredProvider } from '@/utils/context';
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
            <Suspense fallback={null}>
              <SelectedCompanyProvider>
                <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
                  <SidebarProvider defaultOpen={defaultOpen}>
                    <RtkRequestsProvider>
                      <RouteGuard>
                        <div className="flex h-screen w-screen">
                          <SidebarTrigger className="group-data-[collapsible=offcanvas]:fixed absolute z-10" />
                          <AppSidebar />
                          <main className="flex-1 overflow-y-scroll relative">
                            <FloatingUserAvatar />
                            <div className="md:px-8">{children}</div>
                          </main>
                          <Toaster richColors position="top-right" />
                        </div>
                      </RouteGuard>
                    </RtkRequestsProvider>
                  </SidebarProvider>
                </ThemeProvider>
              </SelectedCompanyProvider>
            </Suspense>
          </SessionContextProvider>
        </SessionExpiredProvider>
      </StoreProvider>
    </AuthProvider>
  );
}
