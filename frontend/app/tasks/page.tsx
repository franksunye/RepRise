import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, Calendar, Target, AlertCircle, CheckCircle } from 'lucide-react';
import { getUserTasks, getCurrentUser } from '@/data/mock-data';

export default function TasksPage() {
  const currentUser = getCurrentUser();
  const tasks = getUserTasks(currentUser.id);

  const pending = tasks.filter(t => t.status === 'pending');
  const inProgress = tasks.filter(t => t.status === 'in-progress');
  const completed = tasks.filter(t => t.status === 'completed');

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">我的任务</h1>
        <p className="text-gray-600 mt-1">查看和管理教练布置的练习任务</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>待开始</CardDescription>
            <CardTitle className="text-3xl">{pending.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>进行中</CardDescription>
            <CardTitle className="text-3xl">{inProgress.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>已完成</CardDescription>
            <CardTitle className="text-3xl">{completed.length}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>所有任务</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium">{task.title}</h3>
                    {task.priority === 'high' && (
                      <Badge variant="destructive" className="text-xs">高优先级</Badge>
                    )}
                    <Badge variant={task.status === 'completed' ? 'success' : 'default'} className="text-xs">
                      {task.status === 'completed' ? '已完成' : task.status === 'in-progress' ? '进行中' : '待开始'}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      截止: {new Date(task.dueDate).toLocaleDateString('zh-CN')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      创建于 {new Date(task.createdAt).toLocaleDateString('zh-CN')}
                    </span>
                  </div>
                </div>
                <Button size="sm">开始任务</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
