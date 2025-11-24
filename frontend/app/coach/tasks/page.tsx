'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { getRealisticAvatarUrl, getInitials } from '@/lib/avatar';
import {
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  User,
  Target,
  Check,
  Edit2,
  Eye,
} from 'lucide-react';

const tasks = [
  {
    id: 1,
    repId: 'rep-1',
    repName: '张伟',
    title: '电话模拟练习',
    description: '完成3次首次电话沟通练习，重点提升预约成功率',
    type: '电话沟通',
    dueDate: '2024-11-20',
    status: 'in-progress',
    priority: 'high',
    createdAt: '2024-11-15',
    progress: 2,
    total: 3,
  },
  {
    id: 2,
    repId: 'rep-1',
    repName: '张伟',
    title: '上门勘查模拟',
    description: '练习现场勘查沟通，提升专业形象',
    type: '上门勘查',
    dueDate: '2024-11-18',
    status: 'pending',
    priority: 'medium',
    createdAt: '2024-11-16',
    progress: 0,
    total: 2,
  },
  {
    id: 3,
    repId: 'rep-2',
    repName: '李娜',
    title: '报价谈判练习',
    description: '练习报价流程和异议处理技巧',
    type: '报价谈判',
    dueDate: '2024-11-22',
    status: 'pending',
    priority: 'high',
    createdAt: '2024-11-17',
    progress: 0,
    total: 3,
  },
  {
    id: 4,
    repId: 'rep-3',
    repName: '王强',
    title: '异议处理专项训练',
    description: '针对性练习各种客户异议的处理方法',
    type: '异议处理',
    dueDate: '2024-11-19',
    status: 'overdue',
    priority: 'high',
    createdAt: '2024-11-10',
    progress: 1,
    total: 5,
  },
];

export default function CoachTasksPage() {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [repFilter, setRepFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [completedTasks, setCompletedTasks] = useState<Set<number>>(new Set());

  // 获取唯一的代表列表
  const uniqueReps = useMemo(() => {
    const reps = new Map<string, string>();
    tasks.forEach(task => {
      if (!reps.has(task.repId)) {
        reps.set(task.repId, task.repName);
      }
    });
    return Array.from(reps.entries()).map(([id, name]) => ({ id, name }));
  }, []);

  // 过滤任务
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      // 状态过滤
      if (statusFilter !== 'all' && task.status !== statusFilter) {
        return false;
      }
      // 代表过滤
      if (repFilter !== 'all' && task.repId !== repFilter) {
        return false;
      }
      // 优先级过滤
      if (priorityFilter !== 'all' && task.priority !== priorityFilter) {
        return false;
      }
      return true;
    });
  }, [statusFilter, repFilter, priorityFilter]);

  const totalTasks = tasks.length;
  const inProgress = tasks.filter(t => t.status === 'in-progress').length;
  const pending = tasks.filter(t => t.status === 'pending').length;
  const overdue = tasks.filter(t => t.status === 'overdue').length;

  const handleMarkComplete = (taskId: number) => {
    setCompletedTasks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
      }
      return newSet;
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">辅导任务</h1>
          <p className="text-gray-600 mt-1">管理和跟踪你布置的所有任务</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          新建任务
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              总任务数
            </CardDescription>
            <CardTitle className="text-3xl">{totalTasks}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-600">本月布置</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              进行中
            </CardDescription>
            <CardTitle className="text-3xl">{inProgress}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-blue-600">正在执行</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              待开始
            </CardDescription>
            <CardTitle className="text-3xl">{pending}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-600">等待执行</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              已逾期
            </CardDescription>
            <CardTitle className="text-3xl">{overdue}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-red-600">需要关注</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm font-medium text-gray-700 block mb-2">显示范围</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">所有任务</option>
                <option value="pending">待处理</option>
                <option value="in-progress">进行中</option>
                <option value="completed">已完成</option>
                <option value="overdue">逾期</option>
              </select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="text-sm font-medium text-gray-700 block mb-2">按代表</label>
              <select
                value={repFilter}
                onChange={(e) => setRepFilter(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">所有代表</option>
                {uniqueReps.map(rep => (
                  <option key={rep.id} value={rep.id}>{rep.name}</option>
                ))}
              </select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="text-sm font-medium text-gray-700 block mb-2">优先级</label>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">所有优先级</option>
                <option value="high">高</option>
                <option value="medium">中</option>
                <option value="low">低</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tasks List - Unified Table View */}
      <Card>
        <CardHeader>
          <CardTitle>任务列表</CardTitle>
          <CardDescription>
            {filteredTasks.length === 0 ? '没有匹配的任务' : `共 ${filteredTasks.length} 个任务`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredTasks.length === 0 ? (
            // Empty State
            <div className="flex flex-col items-center justify-center py-12">
              <AlertCircle className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">你目前没有任何辅导任务</h3>
              <p className="text-sm text-gray-600 mb-6 text-center max-w-sm">
                辅导任务用于记录你与代表的 coaching 活动 — 回顾通话、发出行动建议、跟进行为改进。
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                创建你的第一个任务
              </Button>
            </div>
          ) : (
            // Task List
            <div className="space-y-3">
              {filteredTasks.map((task) => {
                const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';
                const isCompleted = completedTasks.has(task.id);

                return (
                  <div
                    key={task.id}
                    className={`border rounded-lg p-4 hover:bg-gray-50 transition-colors ${
                      isOverdue ? 'border-red-200 bg-red-50' : ''
                    } ${isCompleted ? 'opacity-60' : ''}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <Avatar className="h-10 w-10 flex-shrink-0">
                          <AvatarImage src={getRealisticAvatarUrl(task.repName)} alt={task.repName} />
                          <AvatarFallback className={`font-medium ${isOverdue ? 'bg-red-100 text-red-600' : 'bg-primary/10 text-primary'}`}>
                            {getInitials(task.repName)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <Link href={`/coach/tasks/${task.id}`} className="font-medium text-gray-900 hover:text-primary hover:underline">
                              {task.title}
                            </Link>
                            {isOverdue && (
                              <Badge variant="destructive" className="text-xs">已逾期</Badge>
                            )}
                            {task.priority === 'high' && !isOverdue && (
                              <Badge variant="destructive" className="text-xs">高优先级</Badge>
                            )}
                            {task.priority === 'medium' && (
                              <Badge variant="outline" className="text-xs">中优先级</Badge>
                            )}
                            <Badge variant="outline" className="text-xs">{task.type}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2 line-clamp-1">{task.description}</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3 flex-shrink-0" />
                              <span className="truncate">{task.repName}</span>
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3 flex-shrink-0" />
                              <span className="truncate">截止: {new Date(task.dueDate).toLocaleDateString('zh-CN')}</span>
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3 flex-shrink-0" />
                              <span className="truncate">创建: {new Date(task.createdAt).toLocaleDateString('zh-CN')}</span>
                            </span>
                            <span className="flex items-center gap-1">
                              <Target className="h-3 w-3 flex-shrink-0" />
                              <span className="truncate">进度: {task.progress}/{task.total}</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 flex-shrink-0">
                        <Button
                          size="sm"
                          variant="ghost"
                          title="查看详情"
                          className="h-8 w-8 p-0"
                          asChild
                        >
                          <Link href={`/coach/tasks/${task.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          title="编辑"
                          className="h-8 w-8 p-0"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant={isCompleted ? 'default' : 'outline'}
                          onClick={() => handleMarkComplete(task.id)}
                          title={isCompleted ? '取消完成' : '标为完成'}
                          className="h-8 w-8 p-0"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
