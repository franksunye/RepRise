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
  Users,
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useRole } from '@/contexts/role-context';
import { mockReps, mockCoaches } from '@/data/mock-data';

const repNavigation = [
  { name: '首页', href: '/', icon: Home },
  { name: '学习路径', href: '/onboarding', icon: GraduationCap },
  { name: '模拟练习', href: '/practice', icon: MessageSquare },
  { name: '我的任务', href: '/tasks', icon: ClipboardList },
  { name: '内容库', href: '/playbook', icon: BookOpen },
  { name: '我的数据', href: '/analytics', icon: BarChart3 },
];

const coachNavigation = [
  { name: '首页', href: '/', icon: Home },
  { name: '管家管理', href: '/coach/reps', icon: Users },
  { name: '辅导任务', href: '/coach/tasks', icon: ClipboardList },
  { name: '内容库', href: '/playbook', icon: BookOpen },
  { name: '团队分析', href: '/coach/analytics', icon: BarChart3 },
];

export function Sidebar() {
  const pathname = usePathname();
  const { currentRole } = useRole();
  
  // 根据当前角色获取用户信息
  const currentUser = currentRole === 'coach' ? mockCoaches[0] : mockReps[0];
  
  // 根据用户角色选择导航
  const navigation = currentRole === 'coach' ? coachNavigation : repNavigation;

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
          <Avatar>
            <AvatarFallback className="bg-primary/10 text-primary font-medium">
              {currentUser.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{currentUser.name}</p>
            <p className="text-xs text-gray-500 truncate">
              {currentRole === 'rep' ? '管家' : currentRole === 'coach' ? '教练' : '管理员'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
