'use client';

import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { getRealisticAvatarUrl, getInitials } from '@/lib/avatar';
import {
  ArrowLeft,
  Calendar,
  AlertCircle,
  CheckCircle,
  MessageSquare,
  HelpCircle,
  Play,
  Check,
} from 'lucide-react';
import {
  mockCoaches,
  mockFeedbacks,
  mockActionItems,
  getTaskById,
  getCurrentUser,
} from '@/data/mock-data';

export default function TaskDetailPage() {
  const params = useParams();
  const taskId = params.id as string;
  const currentUser = getCurrentUser();

  const task = getTaskById(taskId);
  const coach = mockCoaches.find(c => c.id === task?.coachId);

  const relatedFeedbacks = useMemo(() => {
    if (!task || !task.relatedFeedbackIds) return [];
    return mockFeedbacks.filter(f => task.relatedFeedbackIds?.includes(f.id));
  }, [task]);

  const relatedActionItems = useMemo(() => {
    if (!task || !task.relatedActionItemIds) return [];
    return mockActionItems.filter(a => task.relatedActionItemIds?.includes(a.id));
  }, [task]);

  if (!task) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900">任务未找到</h1>
          <p className="text-gray-600 mt-2">无法找到该任务</p>
          <Button asChild className="mt-4">
            <Link href="/tasks">返回任务列表</Link>
          </Button>
        </div>
      </div>
    );
  }

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/tasks">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">{task.title}</h1>
          <p className="text-gray-600 mt-1">任务详情</p>
        </div>
      </div>

      {/* Task Info Section */}
      <Card>
        <CardHeader>
          <CardTitle>任务信息</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Task Type */}
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">任务类型</p>
              <Badge variant="outline">{task.type}</Badge>
            </div>

            {/* Priority */}
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">优先级</p>
              <Badge variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'outline' : 'secondary'}>
                {task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低'}
              </Badge>
            </div>

            {/* Status */}
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">状态</p>
              <Badge variant={isOverdue ? 'destructive' : task.status === 'completed' ? 'default' : 'outline'}>
                {isOverdue ? '已逾期' : task.status === 'completed' ? '已完成' : task.status === 'in-progress' ? '进行中' : '待处理'}
              </Badge>
            </div>

            {/* Created Date */}
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">创建时间</p>
              <p className="text-sm text-gray-900">{new Date(task.createdAt).toLocaleDateString('zh-CN')}</p>
            </div>
          </div>

          <div className="border-t pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Coach Info */}
            <div>
              <p className="text-sm font-medium text-gray-600 mb-3">教练</p>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={getRealisticAvatarUrl(coach?.name || '')} alt={coach?.name} />
                  <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
                    {getInitials(coach?.name || '')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900">{coach?.name}</p>
                  <p className="text-xs text-gray-600">教练</p>
                </div>
              </div>
            </div>

            {/* Due Date */}
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                到期时间
              </p>
              <p className={`text-sm font-medium ${isOverdue ? 'text-red-600' : 'text-gray-900'}`}>
                {new Date(task.dueDate).toLocaleDateString('zh-CN')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Task Description */}
      <Card>
        <CardHeader>
          <CardTitle>任务描述</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{task.description}</p>
        </CardContent>
      </Card>

      {/* Related Feedbacks */}
      {relatedFeedbacks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-500" />
              教练反馈
            </CardTitle>
            <CardDescription>教练对你的反馈和建议</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {relatedFeedbacks.map(feedback => (
              <div key={feedback.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{feedback.source}</Badge>
                      <span className="text-xs text-gray-500">{new Date(feedback.timestamp).toLocaleString('zh-CN')}</span>
                    </div>
                    <p className="text-sm text-gray-700">{feedback.content}</p>
                  </div>
                  {feedback.score && (
                    <div className="text-right">
                      <p className="text-2xl font-bold text-yellow-500">{feedback.score}</p>
                      <p className="text-xs text-gray-500">评分</p>
                    </div>
                  )}
                </div>
                {feedback.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {feedback.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                <Button asChild size="sm" variant="outline">
                  <Link href={`/coaching/feedback/${feedback.id}`}>查看完整反馈</Link>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Action Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            行动建议
          </CardTitle>
          <CardDescription>需要完成的具体行动项</CardDescription>
        </CardHeader>
        <CardContent>
          {relatedActionItems.length === 0 ? (
            <div className="text-center py-8">
              <AlertCircle className="h-8 w-8 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-600">暂无行动建议</p>
            </div>
          ) : (
            <div className="space-y-3">
              {relatedActionItems.map(item => {
                const isCompleted = item.status === 'done';
                const isOverdueItem = new Date(item.dueDate) < new Date() && item.status !== 'done';
                return (
                  <div
                    key={item.id}
                    className={`border rounded-lg p-4 transition-colors ${
                      isCompleted ? 'bg-gray-50 opacity-60' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`mt-1 p-1 rounded ${isCompleted ? 'text-green-600' : 'text-gray-400'}`}>
                          <Check className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium ${isCompleted ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                            {item.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                            <span className={`flex items-center gap-1 ${isOverdueItem ? 'text-red-600 font-medium' : ''}`}>
                              <Calendar className="h-3 w-3" />
                              截止: {item.dueDate}
                            </span>
                            <Badge
                              variant={
                                item.status === 'done'
                                  ? 'default'
                                  : item.status === 'in_progress'
                                  ? 'outline'
                                  : 'secondary'
                              }
                              className="text-xs"
                            >
                              {item.status === 'done' ? '已完成' : item.status === 'in_progress' ? '进行中' : '待处理'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-end">
        <Button variant="outline">
          <HelpCircle className="h-4 w-4 mr-2" />
          请求帮助
        </Button>
        {task.status === 'pending' && (
          <Button>
            <Play className="h-4 w-4 mr-2" />
            开始任务
          </Button>
        )}
        {task.status === 'in-progress' && (
          <Button>
            <Check className="h-4 w-4 mr-2" />
            标记完成
          </Button>
        )}
      </div>
    </div>
  );
}

