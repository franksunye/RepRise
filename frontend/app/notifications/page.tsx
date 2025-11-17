import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, CheckCircle, AlertCircle, Award, MessageSquare } from 'lucide-react';
import { getUserNotifications, getCurrentUser } from '@/data/mock-data';

export default function NotificationsPage() {
  const currentUser = getCurrentUser();
  const notifications = getUserNotifications(currentUser.id);

  const getIcon = (type: string) => {
    const icons = {
      task: AlertCircle,
      feedback: MessageSquare,
      reminder: Bell,
      achievement: Award,
    };
    return icons[type as keyof typeof icons] || Bell;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">通知中心</h1>
          <p className="text-gray-600 mt-1">查看所有通知和消息</p>
        </div>
        <Button variant="outline">全部标记为已读</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>所有通知</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {notifications.map((notif) => {
            const Icon = getIcon(notif.type);
            return (
              <div
                key={notif.id}
                className={`flex items-start gap-4 p-4 border rounded-lg ${
                  notif.read ? 'bg-white' : 'bg-blue-50 border-blue-200'
                }`}
              >
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                  notif.read ? 'bg-gray-100' : 'bg-blue-100'
                }`}>
                  <Icon className={`h-5 w-5 ${notif.read ? 'text-gray-600' : 'text-blue-600'}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{notif.title}</h4>
                    {!notif.read && <Badge variant="default" className="text-xs">新</Badge>}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{notif.message}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(notif.createdAt).toLocaleString('zh-CN')}
                  </p>
                </div>
                {notif.link && (
                  <Button size="sm" variant="outline">查看详情</Button>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
