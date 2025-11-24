'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getCurrentUser, getCallRecordsByRepId, toggleCallStar, getSignalsByCallId } from '@/data/mock-data';
import { CallRecord } from '@/types';
import { MessageSquare, Search, Star, StarOff, Calendar, Clock, Tag } from 'lucide-react';

export default function RepConversationsPage() {
  const currentUser = getCurrentUser();
  const records = getCallRecordsByRepId(currentUser.id);

  const [q, setQ] = useState('');
  const [analyzed, setAnalyzed] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  const pageSize = 10;
  const [page, setPage] = useState(0);
  const filtered = useMemo(() => {
    return records.filter((r) => {
      const matchesQ = q
        ? [r.title, r.customer, (r.tags || []).join(' ')].some((t) => t.toLowerCase().includes(q.toLowerCase()))
        : true;
      const matchesAnalyzed = analyzed === 'all' ? true : r.analyzed === (analyzed === 'true');
      return matchesQ && matchesAnalyzed;
    });
  }, [records, q, analyzed]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = filtered.slice(page * pageSize, page * pageSize + pageSize);

  const toggleStar = (r: CallRecord) => {
    toggleCallStar(r.id, !r.starred);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">通话记录</h1>
        <p className="text-gray-600 mt-1">查看你的通话历史，播放录音与转录复盘</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>搜索与筛选</CardTitle>
          <CardDescription>按关键词与分析状态过滤通话</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-gray-500" />
              <input
                placeholder="搜索通话/客户/标签…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <Select value={analyzed} onValueChange={setAnalyzed}>
              <SelectTrigger>
                <SelectValue placeholder="分析状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="true">已分析</SelectItem>
                <SelectItem value="false">未分析</SelectItem>
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
                  <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{r.title}</CardTitle>
                    <CardDescription>{r.customer}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={r.analyzed ? 'success' : 'warning'}>{r.analyzed ? '已分析' : '待分析'}</Badge>
                  {r.starred ? (
                    <Button variant="ghost" size="icon" onClick={() => toggleStar(r)}><Star className="h-5 w-5 text-yellow-500" /></Button>
                  ) : (
                    <Button variant="ghost" size="icon" onClick={() => toggleStar(r)}><StarOff className="h-5 w-5" /></Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(r.startedAt).toLocaleString('zh-CN')}</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{Math.round(r.durationMs / 60000)} 分钟</span>
                {!!(r.tags && r.tags.length) && (
                  <span className="flex items-center gap-1"><Tag className="h-3 w-3" />{r.tags.join(' / ')}</span>
                )}
                <span className="flex items-center gap-1">
                  <Badge variant="outline">信号 {getSignalsByCallId(r.id).length}</Badge>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Link href={`/coach/conversations/${r.id}`}>
                  <Button size="sm">查看详情</Button>
                </Link>
                <Button size="sm" variant="outline">播放录音</Button>
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
