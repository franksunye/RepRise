'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getCurrentUser, getRolePlaySessionsByRepId } from '@/data/mock-data';
import { RolePlaySession } from '@/types';
import { ArrowLeft, Search, MessageSquare, PlayCircle, RotateCcw, Calendar, Clock, User, Filter } from 'lucide-react';

const statusLabel: Record<RolePlaySession['status'], string> = {
  'not-started': '未开始',
  'in-progress': '进行中',
  'completed': '已完成',
  'archived': '已归档',
};

export default function RolePlaySessionsPage() {
  const currentUser = getCurrentUser();
  const sessions = getRolePlaySessionsByRepId(currentUser.id);

  const [q, setQ] = useState('');
  const [status, setStatus] = useState<string>('all');
  const [type, setType] = useState<string>('all');
  const [persona, setPersona] = useState<string>('all');

  const filtered = useMemo(() => {
    return sessions.filter((s) => {
      const matchesQ = q
        ? [s.title || '', s.description || '', s.persona, s.scenario].some((t) =>
            t.toLowerCase().includes(q.toLowerCase())
          )
        : true;
      const matchesStatus = status === 'all' ? true : s.status === status;
      const matchesType = type === 'all' ? true : s.type === (type as any);
      const matchesPersona = persona === 'all' ? true : s.persona === persona;
      return matchesQ && matchesStatus && matchesType && matchesPersona;
    });
  }, [sessions, q, status, type, persona]);

  const personaOptions = Array.from(new Set(sessions.map((s) => s.persona)));

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/practice">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">会话管理</h1>
          <p className="text-gray-600 mt-1">查看和管理你的角色扮演练习会话记录</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2">
        <Link href="/practice/start">
          <Button>
            <PlayCircle className="h-4 w-4 mr-2" />
            开始练习
          </Button>
        </Link>
        <Link href="/practice/history">
          <Button variant="outline">
            <RotateCcw className="h-4 w-4 mr-2" />
            查看练习历史
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>搜索与过滤</CardTitle>
              <CardDescription>按状态、类型、Persona、关键字快速定位会话</CardDescription>
            </div>
            <Filter className="h-5 w-5 text-gray-400" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-gray-500" />
              <input
                placeholder="关键字…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <Select onValueChange={setStatus} value={status}>
              <SelectTrigger>
                <SelectValue placeholder="状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部状态</SelectItem>
                <SelectItem value="not-started">未开始</SelectItem>
                <SelectItem value="in-progress">进行中</SelectItem>
                <SelectItem value="completed">已完成</SelectItem>
                <SelectItem value="archived">已归档</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={setType} value={type}>
              <SelectTrigger>
                <SelectValue placeholder="类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部类型</SelectItem>
                <SelectItem value="cold-call">电话沟通</SelectItem>
                <SelectItem value="follow-up">电话跟进</SelectItem>
                <SelectItem value="on-site">上门勘查</SelectItem>
                <SelectItem value="pricing">报价谈判</SelectItem>
                <SelectItem value="objection">异议处理</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={setPersona} value={persona}>
              <SelectTrigger>
                <SelectValue placeholder="Persona" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部 Persona</SelectItem>
                {personaOptions.map((p) => (
                  <SelectItem key={p} value={p}>{p}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* List */}
      <div className="grid grid-cols-1 gap-4">
        {filtered.map((s) => (
          <Card key={s.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{s.title || `${s.scenario}`}</CardTitle>
                    <CardDescription>{s.description}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{s.type}</Badge>
                  <Badge variant={s.status === 'completed' ? 'success' : s.status === 'in-progress' ? 'warning' : 'default'}>
                    {statusLabel[s.status]}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {s.persona}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(s.startedAt).toLocaleString('zh-CN')}
                </span>
                {s.durationMs && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {Math.round((s.durationMs || 0) / 60000)} 分钟
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {s.status !== 'completed' ? (
                  <Link href={`/practice/start?sessionId=${s.id}`}>
                    <Button size="sm">继续</Button>
                  </Link>
                ) : (
                  <Link href={`/practice/sessions/${s.id}`}>
                    <Button size="sm" variant="outline">查看转录</Button>
                  </Link>
                )}
                <Link href={`/practice/sessions/${s.id}`}>
                  <Button size="sm" variant="ghost">复听</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
