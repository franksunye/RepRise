import Link from 'next/link';
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
  const overdue = tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'completed');

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
          {tasks.map((task) => {
            const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';
            return (
              <Link key={task.id} href={`/tasks/${task.id}`}>
                <div className={`border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                  isOverdue ? 'border-red-300 bg-red-50/50' : ''
                }`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{task.title}</h3>
                        {task.priority === 'high' && (
                          <Badge variant="destructive" className="text-xs">高优先级</Badge>
                        )}
                        {isOverdue && (
                          <Badge variant="destructive" className="text-xs">已逾期</Badge>
                        )}
                        <Badge variant={task.status === 'completed' ? 'success' : 'default'} className="text-xs">
                          {task.status === 'completed' ? '已完成' : task.status === 'in-progress' ? '进行中' : '待开始'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{task.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className={`flex items-center gap-1 ${isOverdue ? 'text-red-600 font-medium' : ''}`}>
                          <Calendar className="h-3 w-3" />
                          截止: {new Date(task.dueDate).toLocaleDateString('zh-CN')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          创建于 {new Date(task.createdAt).toLocaleDateString('zh-CN')}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-primary">
                      {task.status === 'pending' ? '开始任务' : task.status === 'in-progress' ? '继续' : '查看'}
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
