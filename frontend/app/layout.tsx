import './globals.css';
import type { ReactNode } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { RoleProvider } from '@/contexts/role-context';

export const metadata = {
  title: 'RevRise - 营收赋能系统',
  description: '连接培训、对话分析、教练与业绩，用行为驱动营收增长'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <RoleProvider>
          <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <Sidebar />
            
            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <Header />
              <main className="flex-1 overflow-y-auto bg-gray-50">
                {children}
              </main>
            </div>
          </div>
        </RoleProvider>
      </body>
    </html>
  );
}
