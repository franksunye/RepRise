'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Phone, MessageSquare, Target, PlusCircle, Calendar, Clock, Play, Pause, Flag, Edit3 } from 'lucide-react';
import { getCallById, getCallTranscriptByCallId, getSignalsByCallId } from '@/data/mock-data';
import type { CallTranscriptEntry } from '@/types';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useMemo, useState } from 'react';

export default function CoachConversationDetailPage() {
  const params = useParams();
  const callId = params.callId as string;
  const call = getCallById(callId);
  const transcript = getCallTranscriptByCallId(callId);
  const signals = getSignalsByCallId(callId);
  const isAnalyzed = call?.analyzed;
  const [summary, setSummary] = useState(
    '本次通话围绕漏水问题展开，客户关注费用。已约定免费上门勘查，下一步为确认预约时间与所需准备。'
  );
  const transcriptAnchors = useMemo(() => new Map(transcript.map(e => [e.id, `entry-${e.id}`])), [transcript]);
  const findEntryBySnippet = (snippet: string) => {
    const match = transcript.find(e => e.text.includes(snippet));
    return match ? transcriptAnchors.get(match.id) : undefined;
  };
  const fmt = (ms: number) => {
    const m = Math.floor(ms / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  };
  const typeBadgeVariant = (t: string) => {
    switch (t) {
      case 'buying': return 'success';
      case 'objection': return 'destructive';
      case 'no_next_step': return 'warning';
      case 'competitor': return 'destructive';
      case 'engagement': return 'default';
      default: return 'outline';
    }
  };
  const typeLabel = (t: string) => {
    switch (t) {
      case 'objection': return '异议';
      case 'no_next_step': return '无下一步';
      case 'engagement': return '低参与度';
      case 'buying': return '购买意向';
      case 'competitor': return '竞品提及';
      default: return t;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link href="/coach/conversations" className="hover:underline">通话记录</Link>
          <span>/</span>
          <span>详情</span>
        </div>
        {/* Persistent actions */}
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/coach/tasks/create">
              <PlusCircle className="h-4 w-4 mr-2" /> 创建任务
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/coach/feedback/new">
              <Target className="h-4 w-4 mr-2" /> 记录反馈
            </Link>
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/coach/inbox">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">通话详情</h1>
          <p className="text-gray-600 mt-1">Call ID: {callId}（此页面为 UI 骨架）</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-blue-600" /> 通话概览
          </CardTitle>
          <CardDescription>时间、参与人、摘要与可教点</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-gray-600">
            <div className="flex items-center gap-3">
              <Badge variant={isAnalyzed ? 'success' : 'warning'}>{isAnalyzed ? '已分析' : '待分析'}</Badge>
              {call && (
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(call.startedAt).toLocaleString('zh-CN')}</span>
              )}
              {call && (
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{Math.round(call.durationMs / 60000)} 分钟</span>
              )}
            </div>
            <p className="mt-2">管家：{call ? call.repId : ''} · 客户：{call ? call.customer : ''}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">片段摘要</p>
            <p className="text-gray-800">“你们的价格比其他公司高太多了，我考虑一下再说吧。”</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">可教点</p>
            <div className="flex items-center gap-2 text-sm">
              <Badge variant="outline">异议</Badge>
              <Badge variant="outline">无下一步</Badge>
              <Badge variant="outline">低参与度</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-600" /> 摘要、高亮与转录
          </CardTitle>
          <CardDescription>从摘要与高亮快速导航到逐句转录；播放录音并按句浏览转录，支持片段标记</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="summary">
            <TabsList>
              <TabsTrigger value="summary">摘要 & 高亮</TabsTrigger>
              <TabsTrigger value="transcript">转录与播放器</TabsTrigger>
              <TabsTrigger value="signals">信号</TabsTrigger>
            </TabsList>

            <TabsContent value="summary">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-3">
                <div className="lg:col-span-2 p-3 border rounded-lg">
                  <div className="flex items-center justify之间">
                    <p className="text-sm font-medium text-gray-700">通话摘要</p>
                    <Button variant="ghost" size="sm"><Edit3 className="h-4 w-4 mr-2" /> 编辑摘要</Button>
                  </div>
                  <p className="text-sm text-gray-800 mt-2">{summary}</p>
                </div>
                <div className="space-y-2">
                  {signals.map((s) => {
                    const anchor = findEntryBySnippet(s.snippet);
                    return (
                      <div key={s.id} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Badge variant={typeBadgeVariant(s.type)}>{typeLabel(s.type)}</Badge>
                            <Badge variant={s.severity === 'high' ? 'destructive' : s.severity === 'medium' ? 'warning' : 'default'}>{s.severity}</Badge>
                            {anchor && (
                              <Badge variant="outline">{fmt((transcript.find(e=> anchor===`entry-${e.id}`)?.startMs) || 0)}</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline">创建行动项</Button>
                            <Button size="sm" variant="ghost">添加笔记</Button>
                          </div>
                        </div>
                        <p className="text-sm mt-2">{s.snippet}</p>
                        {anchor && (
                          <a href={`#${anchor}`} className="text-xs text-blue-600">跳转到转录</a>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="transcript">
              <div className="flex items-center gap-2 mb-3 mt-3">
                <Button variant="outline" size="sm"><Play className="h-4 w-4 mr-2" /> 播放</Button>
                <Button variant="ghost" size="sm"><Pause className="h-4 w-4 mr-2" /> 暂停</Button>
              </div>
              <div className="space-y-2">
                {transcript.map((e: CallTranscriptEntry) => (
                  <div id={`entry-${e.id}`} key={e.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Badge variant={e.speaker === 'rep' ? 'default' : 'outline'}>{e.speaker === 'rep' ? 'Rep' : '客户'}</Badge>
                        <span>{(e.startMs / 1000).toFixed(1)}s</span>
                      </div>
                      <Button size="sm" variant="ghost"><Flag className="h-4 w-4 mr-2" /> 标记片段</Button>
                    </div>
                    <p className="text-sm mt-2">{e.text}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="signals">
              <div className="space-y-2 mt-3">
                {signals.map((s) => (
                  <div key={s.id} className="p-3 border rounded-lg">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Badge variant="outline">{typeLabel(s.type)}</Badge>
                      <Badge variant={s.severity === 'high' ? 'destructive' : s.severity === 'medium' ? 'warning' : 'default'}>{s.severity}</Badge>
                    </div>
                    <p className="text-sm mt-2">{s.snippet}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-purple-600" /> 教练操作
          </CardTitle>
          <CardDescription>基于此通话创建辅导任务或记录反馈</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-end gap-2">
          <Button asChild>
            <Link href="/coach/tasks/create">
              <PlusCircle className="h-4 w-4 mr-2" /> 创建任务
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/coach/feedback/new">
              <Target className="h-4 w-4 mr-2" /> 记录反馈
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
