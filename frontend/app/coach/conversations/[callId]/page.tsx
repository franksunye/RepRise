'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Phone, MessageSquare, Target, PlusCircle } from 'lucide-react';

export default function CoachConversationDetailPage() {
  const params = useParams();
  const callId = params.callId as string;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/coach/inbox">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">通话详情</h1>
          <p className="text-gray-600 mt-1">Call ID: {callId}（此页面为 UI 骨架）</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-blue-600" /> 通话概览
          </CardTitle>
          <CardDescription>时间、参与人、摘要与可教点</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-gray-600">
            <p>时间：2024-11-17 10:30</p>
            <p>管家：张伟 · 客户：某某</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">片段摘要</p>
            <p className="text-gray-800">“你们的价格比其他公司高太多了，我考虑一下再说吧。”</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">可教点</p>
            <div className="flex items-center gap-2 text-sm">
              <Badge variant="outline">objection</Badge>
              <Badge variant="outline">no_next_step</Badge>
              <Badge variant="outline">engagement</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-purple-600" /> 教练操作
          </CardTitle>
          <CardDescription>基于此通话创建辅导任务或记录反馈</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-end gap-2">
          <Button asChild>
            <Link href="/coach/tasks/create">
              <PlusCircle className="h-4 w-4 mr-2" /> 创建任务
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/coach/feedback/new">
              <Target className="h-4 w-4 mr-2" /> 记录反馈
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

