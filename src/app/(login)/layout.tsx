import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login - Phonix Contact',
  description: 'Login Phonix Contact',
};

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 grid-rows-[1fr_106px] h-screen login">
      <main className="p-4">{children}</main>
    </div>
  );
}
