'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockReps, mockCallRecords, getSignalsByCallId, getBehaviorMetricsByCallId, mockTasks } from '@/data/mock-data';
import { MessageSquare, Search, Users, Calendar, Clock, Tag, ArrowUpDown, AlertTriangle, Target, BarChart3, FileText } from 'lucide-react';

export default function CoachConversationsPage() {
  const reps = mockReps;
  const [q, setQ] = useState('');
  const [repId, setRepId] = useState<string>('all');
  const [analyzed, setAnalyzed] = useState<string>('all');
  const [signalCategory, setSignalCategory] = useState<string>('all');
  const [severity, setSeverity] = useState<string>('all');
  const [riskOpp, setRiskOpp] = useState<string>('all'); // 'risk' | 'opportunity' | 'all'
  const [hasTask, setHasTask] = useState<string>('all'); // 'all' | 'yes' | 'no'
  const [sortBy, setSortBy] = useState<string>('time_desc');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  const [page, setPage] = useState(0);
  const filtered = useMemo(() => {
    return mockCallRecords.filter((r) => {
      const signals = getSignalsByCallId(r.id);
      const matchesQ = q
        ? [r.id, r.title, r.customer, (r.tags || []).join(' '), reps.find(x=>x.id===r.repId)?.name || '']
            .some((t) => t.toLowerCase().includes(q.toLowerCase()))
        : true;
      const matchesAnalyzed = analyzed === 'all' ? true : r.analyzed === (analyzed === 'true');
      const matchesRep = repId === 'all' ? true : r.repId === repId;
      const matchesCategory = signalCategory === 'all' ? true : signals.some(s => (signalCategory === 'behavior' ? s.type.startsWith('behavior_') : signalCategory === 'event' ? s.type.startsWith('event_') : s.type.startsWith('issue_')));
      const matchesSeverity = severity === 'all' ? true : signals.some(s => s.severity === severity);
      const hasRiskSignals = signals.some(s => s.type.startsWith('issue_') || s.type === 'event_objection' || s.type === 'event_no_next_step' || s.type === 'event_rejection' || s.type === 'event_delay');
      const hasOppSignals = signals.some(s => s.type === 'event_buying' || s.type === 'event_schedule' || s.type === 'behavior_active_selling');
      const matchesRiskOpp = riskOpp === 'all' ? true : (riskOpp === 'risk' ? hasRiskSignals : hasOppSignals);
      const callSignalIds = signals.map(s => s.id);
      const callHasTask = mockTasks.some(t => (t.relatedSignalIds || []).some(id => callSignalIds.includes(id)));
      const matchesHasTask = hasTask === 'all' ? true : (hasTask === 'yes' ? callHasTask : !callHasTask);
      return matchesQ && matchesAnalyzed && matchesRep && matchesCategory && matchesSeverity && matchesRiskOpp && matchesHasTask;
    }).sort((a, b) => {
      if (sortBy === 'time_desc') return new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime();
      if (sortBy === 'time_asc') return new Date(a.startedAt).getTime() - new Date(b.startedAt).getTime();
      if (sortBy === 'duration_desc') return b.durationMs - a.durationMs;
      if (sortBy === 'duration_asc') return a.durationMs - b.durationMs;
      if (sortBy === 'risk_desc') {
        const riskScore = (r: typeof a) => {
          const sgs = getSignalsByCallId(r.id);
          const w = (sev: string) => sev === 'high' ? 3 : sev === 'medium' ? 2 : 1;
          return sgs.filter(s => s.type.startsWith('issue_') || s.type === 'event_objection' || s.type === 'event_no_next_step' || s.type === 'event_rejection' || s.type === 'event_delay')
            .reduce((sum, s) => sum + w(s.severity), 0);
        };
        return riskScore(b) - riskScore(a);
      }
      if (sortBy === 'opp_desc') {
        const oppScore = (r: typeof a) => {
          const sgs = getSignalsByCallId(r.id);
          const w = (sev: string) => sev === 'high' ? 3 : sev === 'medium' ? 2 : 1;
          return sgs.filter(s => s.type === 'event_buying' || s.type === 'event_schedule' || s.type === 'behavior_active_selling')
            .reduce((sum, s) => sum + w(s.severity), 0);
        };
        return oppScore(b) - oppScore(a);
      }
      if (sortBy === 'score_desc') {
        const score = (r: typeof a) => {
          const m = getBehaviorMetricsByCallId(r.id);
          if (!m || m.sentimentScore === undefined) return 0;
          return m.sentimentScore;
        };
        return score(b) - score(a);
      }
      return 0;
    });
  }, [q, analyzed, repId, signalCategory, severity, riskOpp, hasTask, sortBy, reps]);
  const pageSize = Math.max(filtered.length, 10);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = filtered.slice(page * pageSize, page * pageSize + pageSize);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">通话记录（教练）</h1>
        <p className="text-gray-600 mt-1">查看团队通话历史，进入详情进行标注与任务创建</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ArrowUpDown className="h-4 w-4" /> 搜索与筛选</CardTitle>
          <CardDescription>按关键词、信号、严重性、代表、状态与排序管理列表</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-3">
            <div className="flex items-center gap-2 lg:col-span-2">
              <Search className="h-4 w-4 text-gray-500" />
              <input
                placeholder="搜索通话/客户/代表/标签/ID…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <Select value={repId} onValueChange={setRepId}>
              <SelectTrigger>
                <SelectValue placeholder="代表" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部代表</SelectItem>
                {reps.map((r) => (
                  <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={signalCategory} onValueChange={setSignalCategory}>
              <SelectTrigger>
                <SelectValue placeholder="信号类别" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部类别</SelectItem>
                <SelectItem value="event">对话事件</SelectItem>
                <SelectItem value="behavior">销售行为</SelectItem>
                <SelectItem value="issue">服务问题</SelectItem>
              </SelectContent>
            </Select>
            <Select value={severity} onValueChange={setSeverity}>
              <SelectTrigger>
                <SelectValue placeholder="严重性" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="high">高</SelectItem>
                <SelectItem value="medium">中</SelectItem>
                <SelectItem value="low">低</SelectItem>
              </SelectContent>
            </Select>
            <Select value={riskOpp} onValueChange={setRiskOpp}>
              <SelectTrigger>
                <SelectValue placeholder="风险/商机" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="risk">风险</SelectItem>
                <SelectItem value="opportunity">商机</SelectItem>
              </SelectContent>
            </Select>
            <Select value={analyzed} onValueChange={setAnalyzed}>
              <SelectTrigger>
                <SelectValue placeholder="复盘状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="true">已复盘</SelectItem>
                <SelectItem value="false">待复盘</SelectItem>
              </SelectContent>
            </Select>
            <Select value={hasTask} onValueChange={setHasTask}>
              <SelectTrigger>
                <SelectValue placeholder="行动项" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="yes">有行动项</SelectItem>
                <SelectItem value="no">无行动项</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="排序" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="time_desc">时间（新→旧）</SelectItem>
                <SelectItem value="time_asc">时间（旧→新）</SelectItem>
                <SelectItem value="duration_desc">时长（长→短）</SelectItem>
                <SelectItem value="duration_asc">时长（短→长）</SelectItem>
                <SelectItem value="risk_desc">风险（高→低）</SelectItem>
                <SelectItem value="opp_desc">商机（高→低）</SelectItem>
                <SelectItem value="score_desc">评分（高→低）</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4">
        {loading && (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse p-4 border rounded-lg">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-2/3" />
              </div>
            ))}
          </div>
        )}
        {!loading && pageItems.length === 0 && (
          <Card>
            <CardHeader>
              <CardTitle>暂无通话</CardTitle>
              <CardDescription>调整搜索或筛选条件以找到通话记录</CardDescription>
            </CardHeader>
          </Card>
        )}
        {!loading && pageItems.map((r) => (
          <Card key={r.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{r.title}</CardTitle>
                    <CardDescription>{r.customer}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={r.analyzed ? 'success' : 'warning'}>{r.analyzed ? '已复盘' : '待复盘'}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1"><Users className="h-3 w-3" />{reps.find(x => x.id === r.repId)?.name}</span>
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(r.startedAt).toLocaleString('zh-CN')}</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{Math.round(r.durationMs / 60000)} 分钟</span>
                {(() => {
                  const metrics = getBehaviorMetricsByCallId(r.id);
                  const score5 = metrics?.sentimentScore !== undefined ? (metrics!.sentimentScore * 5).toFixed(1) : '—';
                  return (
                    <span className="flex items-center gap-1"><BarChart3 className="h-3 w-3" />总评分: {score5}/5</span>
                  );
                })()}
                {(() => {
                  const signals = getSignalsByCallId(r.id);
                  const hasOpp = signals.some(s => s.type === 'event_buying');
                  const oppLabel = hasOpp ? '高' : '中';
                  return (
                    <span className="flex items-center gap-1"><Target className="h-3 w-3" />商机等级: {oppLabel}</span>
                  );
                })()}
                {!!(r.tags && r.tags.length) && (
                  <span className="flex items-center gap-1"><Tag className="h-3 w-3" />{r.tags.join(' / ')}</span>
                )}
                <span className="flex items-center gap-1">
                  <Badge variant="outline">信号 {getSignalsByCallId(r.id).length}</Badge>
                </span>
              </div>
              {(() => {
                const signals = getSignalsByCallId(r.id);
                const topSignals = signals.slice(0, 3);
                return (
                  <div className="flex flex-wrap gap-2">
                    {topSignals.map(s => (
                      <Badge key={s.id} variant={s.severity === 'high' ? 'destructive' : s.severity === 'medium' ? 'warning' : 'default'}>
                        {s.type === 'event_buying' ? '高需求' : s.type === 'event_objection' ? '异议' : s.type === 'event_no_next_step' ? '无下一步' : s.type.startsWith('issue_') ? '服务问题' : '行为/事件'}
                      </Badge>
                    ))}
                  </div>
                );
              })()}
              <div className="flex items-center gap-2">
                <Link href={`/coach/conversations/${r.id}`}>
                  <Button size="sm">查看详情</Button>
                </Link>
                <Button size="sm" variant="outline">播放录音</Button>
                <Button size="sm" variant="ghost"><FileText className="h-4 w-4 mr-1" /> 导出</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {!loading && (
      <div className="mt-4 flex items-center justify-end gap-2">
        <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0}>上一页</Button>
        <div className="text-sm text-gray-600">第 {page + 1} / {totalPages} 页</div>
        <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1}>下一页</Button>
      </div>
      )}
    </div>
  );
}
