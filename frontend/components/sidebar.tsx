'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Home,
  GraduationCap,
  MessageSquare,
  ClipboardList,
  BookOpen,
  BarChart3,
  Bell,
} from 'lucide-react';

const navigation = [
  { name: '首页', href: '/', icon: Home },
  { name: '学习路径', href: '/onboarding', icon: GraduationCap },
  { name: '模拟练习', href: '/practice', icon: MessageSquare },
  { name: '辅导任务', href: '/tasks', icon: ClipboardList },
  { name: '内容库', href: '/playbook', icon: BookOpen },
  { name: '分析报表', href: '/analytics', icon: BarChart3 },
  { name: '通知', href: '/notifications', icon: Bell },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-white border-r">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b">
        <h1 className="text-2xl font-bold text-primary">RepRise</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* User Info */}
      <div className="border-t p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-medium text-primary">张</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">张伟</p>
            <p className="text-xs text-gray-500 truncate">管家</p>
          </div>
        </div>
      </div>
    </div>
  );
}
