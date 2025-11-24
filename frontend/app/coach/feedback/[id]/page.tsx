'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getFeedbackById, getActionItemsByFeedbackId, mockReps, mockCoaches } from '@/data/mock-data';
import { ActionItem, ActionItemStatus } from '@/types';
import { CheckCircle, Clock, Link as LinkIcon, MessageSquare, Star, User, Users, Tag, Calendar, Edit, Bell } from 'lucide-react';

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

const getStatusBadgeVariant = (status: ActionItemStatus) => {
  switch (status) {
    case 'done':
      return 'success';
    case 'in_progress':
      return 'warning';
    case 'pending':
    default:
      return 'secondary';
  }
};

export default function FeedbackDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const feedback = getFeedbackById(id);
  const actionItems = getActionItemsByFeedbackId(id);

  if (!feedback) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold">未找到反馈</h1>
        <p className="text-gray-500 mt-2">无法找到ID为 {id} 的反馈记录。</p>
        <Button asChild className="mt-4">
          <Link href="/coach/feedback">返回列表</Link>
        </Button>
      </div>
    );
  }

  const repName = mockReps.find(r => r.id === feedback.repId)?.name || '未知';
  const coachName = mockCoaches.find(c => c.id === feedback.coachId)?.name || '未知';

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      {/* 顶部信息 */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl font-bold">
            <MessageSquare className="h-6 w-6 text-primary" />
            <span>反馈详情</span>
          </CardTitle>
          <CardDescription>
            查看来自 {feedback.source} 的详细反馈信息
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
          <div className="flex items-center gap-3">
            <LinkIcon className="h-5 w-5 text-gray-500" />
            <div>
              <p className="font-medium text-gray-800">来源</p>
              <Link href="#" className="text-primary hover:underline">{feedback.source} ({feedback.sourceId})</Link>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-gray-500" />
            <div>
              <p className="font-medium text-gray-800">管家 (Rep)</p>
              <p>{repName}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-gray-500" />
            <div>
              <p className="font-medium text-gray-800">教练 (Coach)</p>
              <p>{coachName}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-gray-500" />
            <div>
              <p className="font-medium text-gray-800">时间</p>
              <p>{new Date(feedback.timestamp).toLocaleString()}</p>
            </div>
          </div>
          {feedback.score && (
            <div className="flex items-center gap-3">
              <Star className="h-5 w-5 text-yellow-400" />
              <div>
                <p className="font-medium text-gray-800">评分</p>
                <p>{feedback.score} / 5</p>
              </div>
            </div>
          )}
          {feedback.version && (
             <div className="flex items-center gap-3">
              <Tag className="h-5 w-5 text-gray-500" />
               <div>
                <p className="font-medium text-gray-800">版本</p>
                <p>{feedback.version}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 反馈内容 */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>反馈内容</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">{feedback.content}</p>
          <div className="mt-4">
            {feedback.tags.map(tag => (
              <Badge key={tag} variant="outline" className="mr-2">{tag}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 关联行动建议 */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">关联行动建议</h2>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            新建建议
          </Button>
        </div>
        <div className="space-y-4">
          {actionItems.map((item: ActionItem) => (
            <Card key={item.id}>
              <CardContent className="p-4 flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="pt-1">
                    {getStatusIcon(item.status)}
                  </div>
                  <div>
                    <p className="font-medium">{item.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                      <span>截止日期: {item.dueDate}</span>
                      <Badge variant={getStatusBadgeVariant(item.status)}>{item.status}</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {item.status !== 'done' && (
                    <Button size="sm" variant="outline">标为完成</Button>
                  )}
                  <Button size="sm" variant="ghost">
                    <Bell className="mr-2 h-4 w-4" />
                    提醒 Rep
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
