'use client';

import { Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getCurrentUser, getUserNotifications } from '@/data/mock-data';

export function Header() {
  const currentUser = getCurrentUser();
  const notifications = getUserNotifications(currentUser.id);
  const unreadCount = notifications.filter(n => n.read === false).length;

  return (
    <header className="h-16 border-b bg-white px-6 flex items-center justify-between">
      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="搜索练习、任务、内容..."
            className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>

        {/* Role Switcher */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100">
          <span className="text-xs text-gray-600">当前视角:</span>
          <select className="text-sm font-medium bg-transparent border-none focus:outline-none cursor-pointer">
            <option value="rep">管家</option>
            <option value="coach">教练</option>
            <option value="admin">管理员</option>
          </select>
        </div>
      </div>
    </header>
  );
}
