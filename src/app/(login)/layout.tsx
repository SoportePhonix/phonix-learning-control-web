import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Iniciar sesión - Diezforlife',
  description: 'Login Diezforlife',
};

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 grid-rows-[1fr_106px] h-screen login">
      <main className="p-4">{children}</main>
    </div>
  );
}
