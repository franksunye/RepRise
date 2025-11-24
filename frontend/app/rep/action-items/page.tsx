'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, Calendar, HelpCircle } from 'lucide-react';
import { getCurrentUser, getActionItemsByRepId } from '@/data/mock-data';

export default function RepActionItemsPage() {
  const [status, setStatus] = useState<string>('all');
  const user = getCurrentUser();
  const items = getActionItemsByRepId(user.id);
  const filtered = useMemo(() => items.filter(i => status === 'all' || i.status === status), [items, status]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">我的行动建议</h1>
          <p className="text-gray-600 mt-1">查看并完成分配给你的行动项</p>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>行动建议列表</CardTitle>
          <CardDescription>此视图为 UI 骨架</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filtered.map((i) => (
              <div key={i.id} className="border rounded-lg p-4 flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <p className="font-medium">{i.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> 截止: {new Date(i.dueDate).toLocaleDateString('zh-CN')}</span>
                      <Badge variant="outline">{i.status}</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">标为完成</Button>
                  <Button size="sm" variant="ghost"><HelpCircle className="h-4 w-4 mr-1" />请求帮助</Button>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-8 text-gray-500">暂无行动建议</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
