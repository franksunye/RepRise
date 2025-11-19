'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronRight, TrendingUp } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useRole } from '@/contexts/role-context';
import { mockReps, mockCoaches } from '@/data/mock-data';
import { getRealisticAvatarUrl, getInitials } from '@/lib/avatar';
import { navigation, type NavigationItem } from '@/config/navigation';

export function Sidebar() {
  const pathname = usePathname();
  const { currentRole } = useRole();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // 根据当前角色获取用户信息
  const currentUser = currentRole === 'coach' ? mockCoaches[0] : mockReps[0];

  // 根据用户角色选择导航
  const navItems = navigation[currentRole] || navigation.rep;

  // 切换菜单项展开/收起
  const toggleExpand = (itemName: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemName)) {
        newSet.delete(itemName);
      } else {
        newSet.add(itemName);
      }
      return newSet;
    });
  };

  // 检查路径是否激活
  const isPathActive = (item: NavigationItem): boolean => {
    if (item.href) {
      return pathname === item.href;
    }
    if (item.children) {
      return item.children.some(child => child.href === pathname);
    }
    return false;
  };

  // 渲染菜单项
  const renderNavItem = (item: NavigationItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.name);
    const isActive = isPathActive(item);

    if (hasChildren) {
      // 有子菜单的项
      return (
        <div key={item.name}>
          <button
            onClick={() => toggleExpand(item.name)}
            className={cn(
              'flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
              isActive
                ? 'bg-primary/10 text-primary'
                : 'text-gray-700 hover:bg-gray-100'
            )}
          >
            <div className="flex items-center gap-3">
              <item.icon className="h-5 w-5" />
              {item.name}
            </div>
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>

          {/* 子菜单 */}
          {isExpanded && item.children && (
            <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-2">
              {item.children.map(child => renderNavItem(child, level + 1))}
            </div>
          )}
        </div>
      );
    }

    // 没有子菜单的项
    return (
      <Link
        key={item.name}
        href={item.href || '#'}
        className={cn(
          'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
          level > 0 && 'text-xs',
          pathname === item.href
            ? 'bg-primary text-white'
            : 'text-gray-700 hover:bg-gray-100'
        )}
      >
        <item.icon className="h-4 w-4" />
        {item.name}
        {item.badge && (
          <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-xs text-white">
            {item.badge}
          </span>
        )}
      </Link>
    );
  };

  return (
    <div className="flex h-full w-64 flex-col border-r bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6">
        <TrendingUp className="h-8 w-8 text-primary" />
        <span className="ml-2 text-xl font-bold text-gray-900">RevRise</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navItems.map(item => renderNavItem(item))}
      </nav>

      {/* User Info */}
      <div className="border-t p-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={getRealisticAvatarUrl(currentUser.name)} alt={currentUser.name} />
            <AvatarFallback className="bg-primary/10 text-primary font-medium">
              {getInitials(currentUser.name)}
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
