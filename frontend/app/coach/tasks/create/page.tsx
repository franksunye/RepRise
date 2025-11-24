'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, CheckCircle, PlusCircle, ArrowLeft } from 'lucide-react';
import { mockReps } from '@/data/mock-data';

export default function CoachTaskCreatePage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/coach/tasks">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">新建辅导任务</h1>
          <p className="text-gray-600 mt-1">选择类型、分配代表、设置优先级与到期时间</p>
        </div>
      </div>

      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle>任务信息</CardTitle>
          <CardDescription>填写任务基本信息与关联内容</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">任务类型</p>
              <Select defaultValue="Review">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="选择任务类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Review">Review</SelectItem>
                  <SelectItem value="Follow-up">Follow-up</SelectItem>
                  <SelectItem value="Action">Action</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">分配代表</p>
              <Select defaultValue="all">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="选择代表" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">未指定</SelectItem>
                  {mockReps.map(r => (
                    <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">优先级</p>
              <Select defaultValue="medium">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="选择优先级" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">高</SelectItem>
                  <SelectItem value="medium">中</SelectItem>
                  <SelectItem value="low">低</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">到期时间</p>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <input type="date" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">关联信号（可选）</p>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Badge variant="outline">异议</Badge>
              <span>“价格太高了，我再考虑一下。”</span>
              <Button size="sm" variant="link" className="h-6 p-0">更改</Button>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">任务描述</p>
            <textarea rows={5} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="描述要执行的辅导动作、目标与期望产出" />
          </div>

          <div className="flex items-center justify-end gap-2">
            <Button variant="outline">取消</Button>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              创建任务
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
