'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, AlertCircle, Calendar, Edit2, Bell } from 'lucide-react';
import { mockActionItems, mockReps } from '@/data/mock-data';
import { getFeedbackById } from '@/data/mock-data';

export default function CoachActionItemsPage() {
  const [status, setStatus] = useState<string>('all');
  const [rep, setRep] = useState<string>('all');

  const filtered = useMemo(() => {
    return mockActionItems.filter(ai => (rep === 'all' || ai.repId === rep) && (status === 'all' || ai.status === status));
  }, [status, rep]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">行动建议（教练视图）</h1>
          <p className="text-gray-600 mt-1">查看与任务/反馈关联的行动项，进行跟踪与提醒</p>
        </div>
        <Button asChild>
          <Link href="/coach/tasks/create">新建任务</Link>
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            <div className="min-w-[200px]">
              <p className="text-sm font-medium text-gray-700 mb-2">状态</p>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="选择状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部</SelectItem>
                  <SelectItem value="pending">待处理</SelectItem>
                  <SelectItem value="in_progress">进行中</SelectItem>
                  <SelectItem value="done">已完成</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="min-w-[200px]">
              <p className="text-sm font-medium text-gray-700 mb-2">按代表</p>
              <Select value={rep} onValueChange={setRep}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="选择代表" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">所有代表</SelectItem>
                  {mockReps.map(r => (
                    <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>行动建议列表</CardTitle>
          <CardDescription>此视图为 UI 骨架</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filtered.map((ai) => (
              <div key={ai.id} className="border rounded-lg p-4 flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <p className="font-medium">{ai.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> 截止: {new Date(ai.dueDate).toLocaleDateString('zh-CN')}</span>
                      <Badge variant="outline">{ai.status}</Badge>
                      <Badge variant="outline">{mockReps.find(r => r.id === ai.repId)?.name || ai.repId}</Badge>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">关联反馈：{getFeedbackById(ai.feedbackId)?.content?.slice(0, 24) || ai.feedbackId}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Bell className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <AlertCircle className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                <p>暂无行动建议</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
