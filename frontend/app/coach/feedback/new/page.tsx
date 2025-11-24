'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Star, Tag } from 'lucide-react';
import { mockReps } from '@/data/mock-data';

export default function FeedbackCreatePage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/coach/feedback">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">新增教练反馈</h1>
          <p className="text-gray-600 mt-1">选择来源、输入文本与评分、添加标签与行动建议</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>反馈信息</CardTitle>
          <CardDescription>填写反馈的来源与内容</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">来源</p>
              <Select defaultValue="Live Call">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="选择来源" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Live Call">Live Call</SelectItem>
                  <SelectItem value="Role-play">Role-play</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">关联代表</p>
              <Select defaultValue={mockReps[0]?.id || 'rep-1'}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="选择代表" />
                </SelectTrigger>
                <SelectContent>
                  {mockReps.map(r => (
                    <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">反馈文本</p>
            <textarea rows={6} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="输入具体反馈、观察、建议与可执行点" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">评分</p>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <input type="number" min={1} max={5} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="1-5" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">标签</p>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Badge variant="outline">异议处理</Badge>
                <Badge variant="outline">时间管理</Badge>
                <Button variant="link" size="sm" className="h-6 p-0">
                  <Tag className="h-3 w-3 mr-1" />
                  管理标签
                </Button>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">关联行动建议（可选）</p>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <input type="text" className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="描述一个行动建议" />
                <Button size="sm" variant="outline">添加</Button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2">
            <Button variant="outline">取消</Button>
            <Button>保存反馈</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
