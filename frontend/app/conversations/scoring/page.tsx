'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getCurrentUser, getCallRecordsByRepId, getBehaviorMetricsByCallId } from '@/data/mock-data';
import { Award, TrendingUp, BarChart3, Clock } from 'lucide-react';
import { useState } from 'react';

export default function RepScoringPage() {
  const user = getCurrentUser();
  const [range, setRange] = useState<string>('30');
  const calls = getCallRecordsByRepId(user.id);
  const metrics = calls
    .map((c) => getBehaviorMetricsByCallId(c.id))
    .filter(Boolean) as NonNullable<ReturnType<typeof getBehaviorMetricsByCallId>>[];

  const avg = (arr: number[]) => (arr.length ? Math.round((arr.reduce((s, v) => s + v, 0) / arr.length) * 100) / 100 : 0);
  const talkRatio = avg(metrics.map((m) => m.talkRatio));
  const listenRatio = avg(metrics.map((m) => m.listenRatio));
  const silenceCount = Math.round(metrics.reduce((s, m) => s + m.silenceCount, 0) / (metrics.length || 1));
  const questionCount = Math.round(metrics.reduce((s, m) => s + m.questionCount, 0) / (metrics.length || 1));
  const sentiment = avg(metrics.map((m) => m.sentimentScore || 0));

  const perCallInsights = calls.map((c) => {
    const m = metrics.find((x) => x.callId === c.id);
    const items: string[] = [];
    if ((m?.talkRatio || 0) > 0.6) items.push('说话比例偏高，建议增加提问与倾听');
    if ((m?.questionCount || 0) < 4) items.push('提问次数较少，准备开放式问题提高参与');
    if ((m?.silenceCount || 0) > 3) items.push('停顿较多，可用结构化总结推进下一步');
    return { call: c, items };
  }).filter(x => x.items.length > 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">行为评分</h1>
          <p className="text-gray-600 mt-1">查看你的通话行为 KPI 与系统洞察</p>
        </div>
        <Select value={range} onValueChange={setRange}>
          <SelectTrigger className="w-40"><SelectValue placeholder="时间范围" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="7">最近 7 天</SelectItem>
            <SelectItem value="30">最近 30 天</SelectItem>
            <SelectItem value="90">最近 90 天</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPI 面板 */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-3"><CardDescription>说话比例 (Talk)</CardDescription><CardTitle className="text-2xl">{Math.round(talkRatio * 100)}%</CardTitle></CardHeader>
          <CardContent><Badge variant="outline">理想 45%~55%</Badge></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3"><CardDescription>倾听比例 (Listen)</CardDescription><CardTitle className="text-2xl">{Math.round(listenRatio * 100)}%</CardTitle></CardHeader>
          <CardContent><Badge variant="outline">理想 45%~55%</Badge></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3"><CardDescription>停顿次数 (Silence)</CardDescription><CardTitle className="text-2xl">{silenceCount}</CardTitle></CardHeader>
          <CardContent><Badge variant="outline">越少越好</Badge></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3"><CardDescription>提问次数 (Questions)</CardDescription><CardTitle className="text-2xl">{questionCount}</CardTitle></CardHeader>
          <CardContent><Badge variant="outline">建议 ≥ 5</Badge></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3"><CardDescription>情绪分 (Sentiment)</CardDescription><CardTitle className="text-2xl">{Math.round(sentiment * 100)}</CardTitle></CardHeader>
          <CardContent><Badge variant="outline">0~100</Badge></CardContent>
        </Card>
      </div>

      {/* 趋势占位 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5" /> 趋势 (占位)</CardTitle>
          <CardDescription>最近通话的 Talk/Listen 与问题计数趋势</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {calls.map((c) => {
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

      {/* 洞察列表（带通话标题与日期，点击跳转） */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><BarChart3 className="h-5 w-5" /> 系统洞察</CardTitle>
          <CardDescription>根据行为 KPI 自动生成的建议</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {perCallInsights.length === 0 ? (
              <div className="text-sm text-gray-600">暂无异常，继续保持！</div>
            ) : (
              perCallInsights.map(({ call, items }) => (
                <div key={call.id} className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-blue-900">{call.title}</div>
                    <div className="text-xs text-blue-700">{new Date(call.startedAt).toLocaleDateString('zh-CN')}</div>
                  </div>
                  <ul className="mt-2 text-sm text-blue-800 list-disc list-inside">
                    {items.map((i, idx) => (<li key={idx}>{i}</li>))}
                  </ul>
                  <Link href={`/coach/conversations/${call.id}`} className="text-xs text-blue-600 mt-2 inline-block">跳转到通话详情</Link>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
