'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockReps, mockCallSignals } from '@/data/mock-data';
import Link from 'next/link';
import { AlertTriangle, ThumbsUp, Users, Filter, Calendar } from 'lucide-react';

export default function CoachAlertsPage() {
  const reps = mockReps;
  const [type, setType] = useState<string>('all');
  const [severity, setSeverity] = useState<string>('all');
  const [repId, setRepId] = useState<string>('all');
  const [groupByRep, setGroupByRep] = useState<boolean>(false);

  const filtered = useMemo(() => {
    return mockCallSignals.filter((s) => {
      const matchesType = type === 'all' ? true : s.type === type;
      const matchesSeverity = severity === 'all' ? true : s.severity === severity;
      const matchesRep = repId === 'all' ? true : s.repId === repId;
      return matchesType && matchesSeverity && matchesRep;
    }).sort((a, b) => {
      const w = (v: string) => (v === 'high' ? 3 : v === 'medium' ? 2 : 1);
      return w(b.severity) - w(a.severity);
    });
  }, [type, severity, repId]);

  const typeLabel = (t: string) => {
    switch (t) {
      case 'objection': return '异议';
      case 'no_next_step': return '无下一步';
      case 'competitor': return '竞争者提及';
      case 'buying': return '买家信号';
      case 'engagement': return '低参与度';
      case 'behavior_active_selling': return '主动销售行为';
      case 'behavior_listening': return '倾听';
      case 'behavior_opening_completeness': return '开场白完整度';
      case 'behavior_clarity': return '解释清楚度';
      case 'behavior_next_step': return '是否推动下一步';
      case 'event_pricing': return '探价';
      case 'event_schedule': return '拟定时间';
      case 'event_rejection': return '拒绝';
      default: return t;
    }
  };
  const severityLabel = (s: string) => {
    switch (s) {
      case 'high': return '高';
      case 'medium': return '中';
      case 'low': return '低';
      default: return s;
    }
  };

  const topByRep = useMemo(() => {
    const map: Record<string, number> = {};
    filtered.forEach(s => { map[s.repId] = (map[s.repId] || 0) + (s.severity === 'high' ? 2 : 1); });
    return Object.entries(map).sort((a,b)=>b[1]-a[1]).slice(0,5);
  }, [filtered]);

  const topByType = useMemo(() => {
    const map: Record<string, number> = {};
    filtered.forEach(s => { map[s.type] = (map[s.type] || 0) + 1; });
    return Object.entries(map).sort((a,b)=>b[1]-a[1]).slice(0,5);
  }, [filtered]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">风险与商机信号</h1>
          <p className="text-gray-600 mt-1">识别对话中的风险与买家信号，快速进入复盘</p>
        </div>
        <Button variant={groupByRep ? 'default' : 'outline'} size="sm" onClick={() => setGroupByRep(v => !v)}>分组视图（按代表）</Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>过滤</CardTitle>
              <CardDescription>按类型、严重性与代表筛选信号</CardDescription>
            </div>
            <Filter className="h-5 w-5 text-gray-400" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <Select value={type} onValueChange={setType}>
              <SelectTrigger><SelectValue placeholder="类型" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部类型</SelectItem>
                <SelectItem value="objection">异议</SelectItem>
                <SelectItem value="no_next_step">无下一步</SelectItem>
                <SelectItem value="competitor">竞争者提及</SelectItem>
                <SelectItem value="buying">买家信号</SelectItem>
                <SelectItem value="engagement">低参与度</SelectItem>
                <SelectItem value="behavior_active_selling">主动销售行为</SelectItem>
                <SelectItem value="behavior_listening">倾听</SelectItem>
                <SelectItem value="behavior_opening_completeness">开场白完整度</SelectItem>
                <SelectItem value="behavior_clarity">解释清楚度</SelectItem>
                <SelectItem value="behavior_next_step">是否推动下一步</SelectItem>
                <SelectItem value="event_pricing">探价</SelectItem>
                <SelectItem value="event_schedule">拟定时间</SelectItem>
                <SelectItem value="event_rejection">拒绝</SelectItem>
              </SelectContent>
            </Select>
            <Select value={severity} onValueChange={setSeverity}>
              <SelectTrigger><SelectValue placeholder="严重性" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部严重性</SelectItem>
                <SelectItem value="high">高</SelectItem>
                <SelectItem value="medium">中</SelectItem>
                <SelectItem value="low">低</SelectItem>
              </SelectContent>
            </Select>
            <Select value={repId} onValueChange={setRepId}>
              <SelectTrigger><SelectValue placeholder="代表" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部代表</SelectItem>
                {reps.map((r) => (<SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Top 区域 */}
      <Card>
        <CardHeader>
          <CardTitle>优先干预</CardTitle>
          <CardDescription>按代表与类型统计的 Top 信号计数</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium mb-2">代表排名</p>
              <div className="space-y-2">
                {topByRep.map(([rid, score]) => (
                  <div key={rid} className="flex items-center justify-between text-sm">
                    <span>{mockReps.find(r=>r.id===rid)?.name || rid}</span>
                    <Badge variant="outline">{score}</Badge>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">类型排名</p>
              <div className="space-y-2">
                {topByType.map(([t, count]) => (
                  <div key={t} className="flex items-center justify-between text-sm">
                    <span>{typeLabel(t)}</span>
                    <Badge variant="outline">{count}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {!groupByRep ? (
        <div className="grid grid-cols-1 gap-4">
          {filtered.map((s) => (
            <Card key={s.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center">
                      {s.type === 'buying' ? (
                        <ThumbsUp className="h-5 w-5 text-green-600" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{typeLabel(s.type)}</CardTitle>
                      <CardDescription>{s.snippet}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={s.severity === 'high' ? 'destructive' : s.severity === 'medium' ? 'warning' : 'default'}>{severityLabel(s.severity)}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <span className="flex items-center gap-1"><Users className="h-3 w-3" />{reps.find(r => r.id === s.repId)?.name}</span>
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(s.timestamp).toLocaleString('zh-CN')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/coach/conversations/${s.callId}`}><Button size="sm">查看通话</Button></Link>
                  <Button size="sm" variant="outline">创建任务</Button>
                  <Button size="sm" variant="ghost">忽略</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {reps.map((r) => {
            const items = filtered.filter((s) => s.repId === r.id);
            if (items.length === 0) return null;
            return (
              <div key={r.id}>
                <h2 className="text-lg font-semibold mb-2">{r.name}</h2>
                <div className="grid grid-cols-1 gap-4">
                  {items.map((s) => (
                    <Card key={s.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify之间">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-red-100 flex items中心 justify-center">
                              {s.type === 'buying' ? (
                                <ThumbsUp className="h-5 w-5 text-green-600" />
                              ) : (
                                <AlertTriangle className="h-5 w-5 text-red-600" />
                              )}
                            </div>
                            <div>
                              <CardTitle className="text-lg">{typeLabel(s.type)}</CardTitle>
                              <CardDescription>{s.snippet}</CardDescription>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={s.severity === 'high' ? 'destructive' : s.severity === 'medium' ? 'warning' : 'default'}>{severityLabel(s.severity)}</Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(s.timestamp).toLocaleString('zh-CN')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Link href={`/coach/conversations/${s.callId}`}><Button size="sm">查看通话</Button></Link>
                          <Button size="sm" variant="outline">创建任务</Button>
                          <Button size="sm" variant="ghost">忽略</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
