'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageSquare, User, Calendar, PlusCircle, X } from 'lucide-react';

export default function CoachingFeedbackRequestsPage() {
  const [repFilter, setRepFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('recent');

  const requests = [
    { id: 'req-1', repId: 'rep-1', repName: '张伟', timestamp: '2024-11-17 10:30', summary: '请帮我看下这次报价通话的异议处理' },
    { id: 'req-2', repId: 'rep-2', repName: '李娜', timestamp: '2024-11-16 14:20', summary: '客户不愿给下一步，需要建议' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">反馈请求</h1>
          <p className="text-gray-600 mt-1">来自代表的未回应请求</p>
        </div>
        <Link href="/coach/inbox" className="text-sm text-primary">返回收件箱</Link>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            <div className="min-w-[200px]">
              <p className="text-sm font-medium text-gray-700 mb-2">按代表</p>
              <Select value={repFilter} onValueChange={setRepFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="选择代表" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">所有代表</SelectItem>
                  <SelectItem value="rep-1">张伟</SelectItem>
                  <SelectItem value="rep-2">李娜</SelectItem>
                  <SelectItem value="rep-3">王强</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="min-w-[200px]">
              <p className="text-sm font-medium text-gray-700 mb-2">排序</p>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="选择排序" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">按最新</SelectItem>
                  <SelectItem value="rep">按代表</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>未回应请求</CardTitle>
          <CardDescription>此视图为 UI 骨架</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {requests.map((req) => (
              <div key={req.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <MessageSquare className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User className="h-3 w-3" />
                        <span>{req.repName}</span>
                        <Calendar className="h-3 w-3" />
                        <span>{req.timestamp}</span>
                        <Badge variant="outline">未回应</Badge>
                      </div>
                      <p className="mt-2 text-gray-800">{req.summary}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button size="sm" asChild>
                      <Link href={`/coach/tasks/create`}>创建任务</Link>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/coach/feedback/new`}>回应反馈</Link>
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            <div className="text-center py-8 text-gray-500">
              <PlusCircle className="h-8 w-8 mx-auto mb-2 text-gray-300" />
              <p>以上为演示数据，后续接入 Mock</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

