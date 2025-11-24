'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Star, Tag } from 'lucide-react';
import { getFeedbackById } from '@/data/mock-data';

export default function FeedbackEditPage() {
  const params = useParams();
  const id = params.id as string;
  const [source, setSource] = useState('Live Call');
  const [score, setScore] = useState<number>(3);
  const [content, setContent] = useState('');

  useEffect(() => {
    const f = getFeedbackById(id);
    if (f) {
      setSource(f.source);
      setScore(f.score ?? 3);
      setContent(f.content);
    }
  }, [id]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/coach/feedback/${id}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">编辑反馈</h1>
          <p className="text-gray-600 mt-1">ID：{id}（此页面为 UI 骨架）</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>反馈内容</CardTitle>
          <CardDescription>更新来源、评分、文本与标签</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">来源</p>
              <Select value={source} onValueChange={setSource}>
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
              <p className="text-sm font-medium text-gray-700 mb-2">评分</p>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <input type="number" min={1} max={5} value={score} onChange={(e) => setScore(e.target.value ? Number(e.target.value) : 3)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="1-5" />
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">反馈文本</p>
            <textarea rows={6} value={content} onChange={(e) => setContent(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="更新具体反馈文本" />
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">标签</p>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Button variant="link" size="sm" className="h-6 p-0">
                <Tag className="h-3 w-3 mr-1" />
                管理标签
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2">
            <Button variant="outline" asChild>
              <Link href={`/coach/feedback/${id}`}>取消</Link>
            </Button>
            <Button>保存</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
