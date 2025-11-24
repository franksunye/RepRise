'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { getRealisticAvatarUrl, getInitials } from '@/lib/avatar';
import { getFeedbackById, getActionItemsByFeedbackId, mockCoaches } from '@/data/mock-data';
import { ActionItem, ActionItemStatus } from '@/types';
import {
  CheckCircle,
  Clock,
  MessageSquare,
  Star,
  Calendar,
  ArrowLeft,
  AlertCircle,
  Check,
} from 'lucide-react';

const getStatusIcon = (status: ActionItemStatus) => {
  switch (status) {
    case 'done':
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case 'in_progress':
      return <Clock className="h-5 w-5 text-yellow-500" />;
    case 'pending':
    default:
      return <Clock className="h-5 w-5 text-gray-400" />;
  }
};

export default function FeedbackDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const feedback = getFeedbackById(id);
  const actionItems = getActionItemsByFeedbackId(id);

  if (!feedback) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900">反馈未找到</h1>
          <p className="text-gray-600 mt-2">无法找到该反馈记录</p>
          <Button asChild className="mt-4">
            <Link href="/coaching/feedback">返回反馈列表</Link>
          </Button>
        </div>
      </div>
    );
  }

  const coach = mockCoaches.find(c => c.id === feedback.coachId);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/coaching/feedback">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">反馈详情</h1>
          <p className="text-gray-600 mt-1">查看教练的详细反馈</p>
        </div>
      </div>

      {/* Feedback Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            反馈信息
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Source */}
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">来源</p>
              <Badge variant="secondary">{feedback.source}</Badge>
              <p className="text-xs text-gray-500 mt-1">{feedback.sourceId}</p>
            </div>

            {/* Timestamp */}
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                时间
              </p>
              <p className="text-sm text-gray-900">{new Date(feedback.timestamp).toLocaleString('zh-CN')}</p>
            </div>

            {/* Score */}
            {feedback.score && (
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  评分
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-yellow-500">{feedback.score}</span>
                  <span className="text-sm text-gray-500">/ 5</span>
                </div>
              </div>
            )}
          </div>

          {/* Coach Info */}
          <div className="border-t pt-6">
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
        </CardContent>
      </Card>

      {/* Feedback Content */}
      <Card>
        <CardHeader>
          <CardTitle>反馈内容</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{feedback.content}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {feedback.tags.map(tag => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            行动建议
          </CardTitle>
          <CardDescription>教练建议你完成的行动项</CardDescription>
        </CardHeader>
        <CardContent>
          {actionItems.length === 0 ? (
            <div className="text-center py-8">
              <AlertCircle className="h-8 w-8 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-600">暂无行动建议</p>
            </div>
          ) : (
            <div className="space-y-3">
              {actionItems.map((item: ActionItem) => {
                const isCompleted = item.status === 'done';
                const isOverdue = new Date(item.dueDate) < new Date() && item.status !== 'done';
                return (
                  <div
                    key={item.id}
                    className={`border rounded-lg p-4 transition-colors ${
                      isCompleted ? 'bg-gray-50 opacity-60' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="pt-1">
                        {getStatusIcon(item.status)}
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium ${isCompleted ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                          {item.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                          <span className={`flex items-center gap-1 ${isOverdue ? 'text-red-600 font-medium' : ''}`}>
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
                      {!isCompleted && (
                        <div className="flex gap-2 flex-shrink-0">
                          {item.status === 'pending' && (
                            <Button size="sm" variant="outline">
                              开始执行
                            </Button>
                          )}
                          {item.status === 'in_progress' && (
                            <Button size="sm">
                              <Check className="h-4 w-4 mr-1" />
                              标为完成
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reflection Section (UI Only) */}
      <Card>
        <CardHeader>
          <CardTitle>我的反思</CardTitle>
          <CardDescription>写下你对这次反馈的思考和计划</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <textarea
              className="w-full min-h-[120px] p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="在这里写下你的反思..."
            />
            <div className="flex justify-end">
              <Button>保存反思</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

