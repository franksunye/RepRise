'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import { mockReps, mockCallRecords, getBehaviorMetricsByCallId } from '@/data/mock-data';
import { TrendingUp, Users, BarChart3 } from 'lucide-react';
import { useMemo, useState } from 'react';

export default function CoachScoringPage() {
  const [repId, setRepId] = useState<string>('all');
  const [range, setRange] = useState<string>('30');
  const reps = mockReps;

  const filteredCalls = useMemo(() => {
    return mockCallRecords.filter((c) => (repId === 'all' ? true : c.repId === repId));
  }, [repId]);

  const metrics = filteredCalls
    .map((c) => getBehaviorMetricsByCallId(c.id))
    .filter(Boolean) as NonNullable<ReturnType<typeof getBehaviorMetricsByCallId>>[];

  const avg = (arr: number[]) => (arr.length ? Math.round((arr.reduce((s, v) => s + v, 0) / arr.length) * 100) / 100 : 0);
  const talkRatio = avg(metrics.map((m) => m.talkRatio));
  const listenRatio = avg(metrics.map((m) => m.listenRatio));
  const silenceCount = Math.round(metrics.reduce((s, m) => s + m.silenceCount, 0) / (metrics.length || 1));
  const questionCount = Math.round(metrics.reduce((s, m) => s + m.questionCount, 0) / (metrics.length || 1));

  const perCallInsights = filteredCalls.map((c) => {
    const m = metrics.find((x) => x.callId === c.id);
    const items: string[] = [];
    if ((m?.talkRatio || 0) > 0.6) items.push('说话比例偏高');
    if ((m?.questionCount || 0) < 4) items.push('提问次数较少');
    if ((m?.silenceCount || 0) > 3) items.push('停顿较多');
    return { call: c, items };
  }).filter(x => x.items.length > 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">行为评分（教练）</h1>
          <p className="text-gray-600 mt-1">查看团队通话的行为 KPI 与趋势</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={repId} onValueChange={setRepId}>
            <SelectTrigger className="w-48"><SelectValue placeholder="选择代表" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部代表</SelectItem>
              {reps.map((r) => (<SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>))}
            </SelectContent>
          </Select>
          <Select value={range} onValueChange={setRange}>
            <SelectTrigger className="w-40"><SelectValue placeholder="时间范围" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="7">最近 7 天</SelectItem>
              <SelectItem value="30">最近 30 天</SelectItem>
              <SelectItem value="90">最近 90 天</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><CardHeader className="pb-3"><CardDescription>Talk</CardDescription><CardTitle className="text-2xl">{Math.round(talkRatio * 100)}%</CardTitle></CardHeader><CardContent><Badge variant="outline">理想 45%~55%</Badge></CardContent></Card>
        <Card><CardHeader className="pb-3"><CardDescription>Listen</CardDescription><CardTitle className="text-2xl">{Math.round(listenRatio * 100)}%</CardTitle></CardHeader><CardContent><Badge variant="outline">理想 45%~55%</Badge></CardContent></Card>
        <Card><CardHeader className="pb-3"><CardDescription>Silence</CardDescription><CardTitle className="text-2xl">{silenceCount}</CardTitle></CardHeader><CardContent><Badge variant="outline">越少越好</Badge></CardContent></Card>
        <Card><CardHeader className="pb-3"><CardDescription>Questions</CardDescription><CardTitle className="text-2xl">{questionCount}</CardTitle></CardHeader><CardContent><Badge variant="outline">建议 ≥ 5</Badge></CardContent></Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5" /> 趋势（占位）</CardTitle>
          <CardDescription>按代表与时间范围的通话行为趋势</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCalls.map((c) => {
              const m = metrics.find((x) => x.callId === c.id);
              return (
                <div key={c.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-700">{c.title}</div>
                    <div className="text-xs text-gray-500">{new Date(c.startedAt).toLocaleDateString('zh-CN')}</div>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">Talk {Math.round((m?.talkRatio || 0) * 100)}% · Questions {m?.questionCount ?? 0}</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><BarChart3 className="h-5 w-5" /> 团队洞察（占位）</CardTitle>
          <CardDescription>系统建议与代表对比视图</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {perCallInsights.length === 0 ? (
              <div className="text-sm text-gray-600">暂无突出问题，继续跟踪团队趋势。</div>
            ) : (
              perCallInsights.map(({ call, items }) => (
                <div key={call.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-gray-900">{call.title}</div>
                    <div className="text-xs text-gray-600">{new Date(call.startedAt).toLocaleDateString('zh-CN')}</div>
                  </div>
                  <div className="mt-2 text-sm text-gray-700">{items.join(' · ')}</div>
                  <Link href={`/coach/conversations/${call.id}`} className="text-xs text-blue-600 mt-2 inline-block">查看通话详情</Link>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
