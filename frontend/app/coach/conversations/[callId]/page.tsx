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
import { useMemo, useState, useEffect, useRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

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
      case 'event_buying': return 'success';
      case 'event_objection': return 'destructive';
      case 'event_no_next_step': return 'warning';
      case 'event_competitor': return 'destructive';
      case 'behavior_engagement': return 'default';
      case 'behavior_structure': return 'success';
      case 'behavior_emotion_tone_pace': return 'default';
      case 'behavior_active_selling': return 'success';
      case 'behavior_listening': return 'success';
      case 'behavior_opening_completeness': return 'success';
      case 'behavior_clarity': return 'warning';
      case 'behavior_next_step': return 'warning';
      case 'event_pricing': return 'warning';
      case 'event_schedule': return 'default';
      case 'event_rejection': return 'destructive';
      case 'event_delay': return 'warning';
      case 'event_urgency': return 'destructive';
      case 'issue_rep_delay': return 'warning';
      case 'issue_schedule_conflict': return 'warning';
      case 'issue_customer_wait_long': return 'destructive';
      default: return 'outline';
    }
  };
  const typeLabel = (t: string) => {
    switch (t) {
      case 'event_objection': return '异议（客户顾虑）';
      case 'event_no_next_step': return '无下一步（未推进）';
      case 'behavior_engagement': return '低参与度（客户反应）';
      case 'event_buying': return '高需求（购买意向）';
      case 'event_competitor': return '竞品提及（对比他牌）';
      case 'behavior_structure': return '是否结构化';
      case 'behavior_emotion_tone_pace': return '情绪/态度/语速';
      case 'behavior_active_selling': return '主动销售行为';
      case 'behavior_listening': return '倾听';
      case 'behavior_opening_completeness': return '开场白完整度';
      case 'behavior_clarity': return '解释清楚度';
      case 'behavior_next_step': return '是否推动下一步';
      case 'event_pricing': return '探价';
      case 'event_schedule': return '拟定时间';
      case 'event_rejection': return '拒绝';
      case 'event_delay': return '拖延';
      case 'event_urgency': return '紧急';
      case 'issue_rep_delay': return '管家原因上门延迟';
      case 'issue_schedule_conflict': return '预约冲突';
      case 'issue_customer_wait_long': return '客户等待过久';
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

  const categoryOf = (t: string): 'behavior' | 'event' | 'issue' => {
    if (t.startsWith('behavior_')) return 'behavior';
    if (t.startsWith('event_')) return 'event';
    if (t.startsWith('issue_')) return 'issue';
    return 'event';
  };

  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedSignalId, setSelectedSignalId] = useState<string | null>(null);
  const selectedSignal = useMemo(() => signals.find(s => s.id === selectedSignalId) || null, [signals, selectedSignalId]);
  const [playheadMs, setPlayheadMs] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const playIntervalRef = useRef<number | null>(null);

  const signalOffsetMs = useMemo(() => {
    if (!call || !selectedSignal) return null;
    const base = new Date(call.startedAt).getTime();
    const ts = new Date(selectedSignal.timestamp).getTime();
    return Math.max(0, ts - base);
  }, [call, selectedSignal]);

  useEffect(() => {
    if (!detailOpen) {
      setIsPlaying(false);
      setPlayheadMs(0);
    }
  }, [detailOpen]);

  useEffect(() => {
    if (isPlaying) {
      const id = window.setInterval(() => {
        setPlayheadMs((v) => Math.min((call?.durationMs || 0), v + 500));
      }, 500);
      playIntervalRef.current = id;
      return () => {
        if (playIntervalRef.current) window.clearInterval(playIntervalRef.current);
      };
    } else {
      if (playIntervalRef.current) window.clearInterval(playIntervalRef.current);
      playIntervalRef.current = null;
    }
  }, [isPlaying, call?.durationMs]);

  const openDetail = (id: string) => {
    setSelectedSignalId(id);
    setDetailOpen(true);
    if (signalOffsetMs) setPlayheadMs(signalOffsetMs);
  };

  const contextWindowMs = 20000;
  const contextEntries = useMemo(() => {
    if (!selectedSignal || !call) return [];
    const base = new Date(call.startedAt).getTime();
    const ts = new Date(selectedSignal.timestamp).getTime();
    const center = ts - base;
    const start = Math.max(0, center - contextWindowMs);
    const end = center + contextWindowMs;
    return transcript.filter(e => e.startMs >= start && e.startMs <= end);
  }, [selectedSignal, call, transcript]);

  const coOccurringSignals = useMemo(() => {
    if (!selectedSignal || !call) return [];
    const base = new Date(call.startedAt).getTime();
    const ts = new Date(selectedSignal.timestamp).getTime();
    const center = ts - base;
    const start = Math.max(0, center - 30000);
    const end = center + 30000;
    return signals.filter(s => {
      const st = new Date(s.timestamp).getTime();
      const off = st - base;
      return s.id !== selectedSignal.id && off >= start && off <= end;
    });
  }, [selectedSignal, call, signals]);

  const [noteText, setNoteText] = useState('');
  const [notes, setNotes] = useState<{ id: string; text: string; createdAt: string }[]>([]);
  const addNoteLocal = () => {
    if (!noteText.trim()) return;
    const n = { id: `note-${Date.now()}`, text: noteText.trim(), createdAt: new Date().toISOString() };
    setNotes([n, ...notes]);
    setNoteText('');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center text-sm text-gray-600">
          <Link href="/coach/conversations" className="hover:underline">通话记录</Link>
          <span>/</span>
          <span>详情</span>
        </div>
        {/* Persistent actions */}
        <div className="flex gap-2 items-center">
          <Button asChild>
            <Link href="/coach/tasks/create">
              <PlusCircle className="mr-2 w-4 h-4" /> 创建任务
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/coach/feedback/new">
              <Target className="mr-2 w-4 h-4" /> 记录反馈
            </Link>
          </Button>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/coach/inbox">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">通话详情</h1>
          <p className="mt-1 text-gray-600">Call ID: {callId}（此页面为 UI 骨架）</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex gap-2 items-center">
            <Phone className="w-5 h-5 text-blue-600" /> 通话概览
          </CardTitle>
          <CardDescription>时间、参与人、摘要与可教点</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-gray-600">
            <div className="flex gap-3 items-center">
              <Badge variant={isAnalyzed ? 'success' : 'warning'}>{isAnalyzed ? '已分析' : '待分析'}</Badge>
              {call && (
                <span className="flex gap-1 items-center"><Calendar className="w-3 h-3" />{new Date(call.startedAt).toLocaleString('zh-CN')}</span>
              )}
              {call && (
                <span className="flex gap-1 items-center"><Clock className="w-3 h-3" />{Math.round(call.durationMs / 60000)} 分钟</span>
              )}
            </div>
            <p className="mt-2">管家：{call ? call.repId : ''} · 客户：{call ? call.customer : ''}</p>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-gray-700">片段摘要</p>
            <p className="text-gray-800">“你们的价格比其他公司高太多了，我考虑一下再说吧。”</p>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-gray-700">可教点</p>
            <div className="flex gap-2 items-center text-sm">
              <Badge variant="outline">异议</Badge>
              <Badge variant="outline">无下一步</Badge>
              <Badge variant="outline">低参与度</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card id="signals-section">
        <CardHeader>
          <CardTitle className="flex gap-2 items-center">
            <MessageSquare className="w-5 h-5 text-blue-600" /> 信号
          </CardTitle>
          <CardDescription>对话中识别到的风险与商机，具体包括三个类别，分别是销售行为类（Rep Behaviors）、对话事件类（Event）、服务问题类（Issue）。其中销售行为会包括通话结构 /流程识别类和行为细节，对话事件类关注的是客户的意向（Intent Signals）。</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">全部</TabsTrigger>
              <TabsTrigger value="behavior">行为表现</TabsTrigger>
              <TabsTrigger value="event">对话事件</TabsTrigger>
              <TabsTrigger value="issue">服务问题</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="mt-3 space-y-2">
                {signals.map((s) => {
                  const anchor = findEntryBySnippet(s.snippet);
                  return (
                    <div
                      key={s.id}
                      className="p-3 rounded-lg border cursor-pointer hover:bg-gray-50"
                      onClick={() => openDetail(s.id)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2 items-center text-xs text-gray-500">
                          <Badge variant={typeBadgeVariant(s.type)}>{typeLabel(s.type)}</Badge>
                          <Badge variant={s.severity === 'high' ? 'destructive' : s.severity === 'medium' ? 'warning' : 'default'}>{severityLabel(s.severity)}</Badge>
                          {anchor && (
                            <Badge variant="outline">{fmt((transcript.find(e=> anchor===`entry-${e.id}`)?.startMs) || 0)}</Badge>
                          )}
                        </div>
                        <div className="flex gap-2 items-center">
                          <Button size="sm" variant="outline">创建行动项</Button>
                          <Button size="sm" variant="ghost">添加笔记</Button>
                        </div>
                      </div>
                      <p className="mt-2 text-sm">{s.snippet}</p>
                      {anchor && (
                        <a href={`#${anchor}`} className="text-xs text-blue-600">跳转到转录</a>
                      )}
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="behavior">
              <div className="mt-3 space-y-2">
                {signals.filter(s => categoryOf(s.type) === 'behavior').map((s) => {
                  const anchor = findEntryBySnippet(s.snippet);
                  return (
                    <div
                      key={s.id}
                      className="p-3 rounded-lg border cursor-pointer hover:bg-gray-50"
                      onClick={() => openDetail(s.id)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2 items-center text-xs text-gray-500">
                          <Badge variant={typeBadgeVariant(s.type)}>{typeLabel(s.type)}</Badge>
                          <Badge variant={s.severity === 'high' ? 'destructive' : s.severity === 'medium' ? 'warning' : 'default'}>{severityLabel(s.severity)}</Badge>
                          {anchor && (
                            <Badge variant="outline">{fmt((transcript.find(e=> anchor===`entry-${e.id}`)?.startMs) || 0)}</Badge>
                          )}
                        </div>
                        <div className="flex gap-2 items-center">
                          <Button size="sm" variant="outline">创建行动项</Button>
                          <Button size="sm" variant="ghost">添加笔记</Button>
                        </div>
                      </div>
                      <p className="mt-2 text-sm">{s.snippet}</p>
                      {anchor && (
                        <a href={`#${anchor}`} className="text-xs text-blue-600">跳转到转录</a>
                      )}
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="event">
              <div className="mt-3 space-y-2">
                {signals.filter(s => categoryOf(s.type) === 'event').map((s) => {
                  const anchor = findEntryBySnippet(s.snippet);
                  return (
                    <div
                      key={s.id}
                      className="p-3 rounded-lg border cursor-pointer hover:bg-gray-50"
                      onClick={() => openDetail(s.id)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2 items-center text-xs text-gray-500">
                          <Badge variant={typeBadgeVariant(s.type)}>{typeLabel(s.type)}</Badge>
                          <Badge variant={s.severity === 'high' ? 'destructive' : s.severity === 'medium' ? 'warning' : 'default'}>{severityLabel(s.severity)}</Badge>
                          {anchor && (
                            <Badge variant="outline">{fmt((transcript.find(e=> anchor===`entry-${e.id}`)?.startMs) || 0)}</Badge>
                          )}
                        </div>
                        <div className="flex gap-2 items-center">
                          <Button size="sm" variant="outline">创建行动项</Button>
                          <Button size="sm" variant="ghost">添加笔记</Button>
                        </div>
                      </div>
                      <p className="mt-2 text-sm">{s.snippet}</p>
                      {anchor && (
                        <a href={`#${anchor}`} className="text-xs text-blue-600">跳转到转录</a>
                      )}
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="issue">
              <div className="mt-3 space-y-2">
                {signals.filter(s => categoryOf(s.type) === 'issue').map((s) => {
                  const anchor = findEntryBySnippet(s.snippet);
                  return (
                    <div
                      key={s.id}
                      className="p-3 rounded-lg border cursor-pointer hover:bg-gray-50"
                      onClick={() => openDetail(s.id)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2 items-center text-xs text-gray-500">
                          <Badge variant={typeBadgeVariant(s.type)}>{typeLabel(s.type)}</Badge>
                          <Badge variant={s.severity === 'high' ? 'destructive' : s.severity === 'medium' ? 'warning' : 'default'}>{severityLabel(s.severity)}</Badge>
                          {anchor && (
                            <Badge variant="outline">{fmt((transcript.find(e=> anchor===`entry-${e.id}`)?.startMs) || 0)}</Badge>
                          )}
                        </div>
                        <div className="flex gap-2 items-center">
                          <Button size="sm" variant="outline">创建行动项</Button>
                          <Button size="sm" variant="ghost">添加笔记</Button>
                        </div>
                      </div>
                      <p className="mt-2 text-sm">{s.snippet}</p>
                      {anchor && (
                        <a href={`#${anchor}`} className="text-xs text-blue-600">跳转到转录</a>
                      )}
                    </div>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog.Root open={detailOpen} onOpenChange={setDetailOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40" />
          <Dialog.Content className="fixed top-10 left-1/2 w-full max-w-3xl bg-white rounded-lg shadow-lg -translate-x-1/2 focus:outline-none">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">Signal Detail</h2>
                  <p className="text-sm text-gray-600">信号上下文</p>
                </div>
                <Dialog.Close asChild>
                  <Button variant="ghost" size="sm">关闭</Button>
                </Dialog.Close>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">通话 ID</div>
                  <div className="text-sm font-medium">{call?.id}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">客户 / 管家 / 时间戳</div>
                  <div className="text-sm font-medium">{call?.customer} · {call?.repId} · {selectedSignal ? new Date(selectedSignal.timestamp).toLocaleString('zh-CN') : ''}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">信号类别与名称</div>
                  <div className="flex gap-2 items-center">
                    {selectedSignal && (
                      <>
                        <Badge variant={typeBadgeVariant(selectedSignal.type)}>{typeLabel(selectedSignal.type)}</Badge>
                        <Badge variant={selectedSignal.severity === 'high' ? 'destructive' : selectedSignal.severity === 'medium' ? 'warning' : 'default'}>{severityLabel(selectedSignal.severity)}</Badge>
                      </>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">自动判定依据 / 置信度</div>
                  <div className="text-sm font-medium">N/A</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium text-gray-700">对话片段与上下文</p>
                  <div className="flex gap-2 items-center">
                    <Button variant="outline" size="sm" onClick={() => setIsPlaying(true)}><Play className="mr-2 w-4 h-4" /> 播放</Button>
                    <Button variant="ghost" size="sm" onClick={() => setIsPlaying(false)}><Pause className="mr-2 w-4 h-4" /> 暂停</Button>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <input
                    type="range"
                    min={0}
                    max={(call?.durationMs || 0)}
                    value={playheadMs}
                    onChange={(e) => setPlayheadMs(Number(e.target.value))}
                    className="w-full"
                  />
                  <span className="text-xs text-gray-500">{fmt(playheadMs)}</span>
                </div>
                <div className="space-y-2">
                  {contextEntries.map((e) => {
                    const isTrigger = selectedSignal ? e.text.includes(selectedSignal.snippet) : false;
                    return (
                      <div key={e.id} className={`p-3 border rounded-lg ${isTrigger ? 'bg-yellow-50 border-yellow-200' : ''}`}>
                        <div className="flex justify-between items-center">
                          <div className="flex gap-2 items-center text-xs text-gray-500">
                            <Badge variant={e.speaker === 'rep' ? 'default' : 'outline'}>{e.speaker === 'rep' ? 'Rep' : '客户'}</Badge>
                            <span>{(e.startMs / 1000).toFixed(1)}s</span>
                          </div>
                        </div>
                        <p className="mt-2 text-sm">{e.text}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-700">关联信号</p>
                {coOccurringSignals.length === 0 ? (
                  <p className="text-xs text-gray-500">暂无关联信号</p>
                ) : (
                  <div className="space-y-2">
                    {coOccurringSignals.map((s) => (
                      <div key={s.id} className="p-3 rounded-lg border">
                        <div className="flex justify-between items-center">
                          <div className="flex gap-2 items-center text-xs text-gray-500">
                            <Badge variant={typeBadgeVariant(s.type)}>{typeLabel(s.type)}</Badge>
                            <Badge variant={s.severity === 'high' ? 'destructive' : s.severity === 'medium' ? 'warning' : 'default'}>{severityLabel(s.severity)}</Badge>
                          </div>
                          <Button size="sm" variant="ghost" onClick={() => openDetail(s.id)}>查看</Button>
                        </div>
                        <p className="mt-2 text-sm">{s.snippet}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-700">备注与后续任务</p>
                <div className="flex gap-2 items-center">
                  <input
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="添加评论/建议"
                    className="flex-1 px-3 py-2 text-sm rounded-md border"
                  />
                  <Button size="sm" onClick={addNoteLocal}>添加</Button>
                </div>
                {notes.length > 0 && (
                  <div className="space-y-2">
                    {notes.map(n => (
                      <div key={n.id} className="p-3 rounded-lg border">
                        <div className="text-xs text-gray-500">{new Date(n.createdAt).toLocaleString('zh-CN')}</div>
                        <p className="mt-1 text-sm">{n.text}</p>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex gap-2 items-center">
                  <Button variant="outline" size="sm">创建行动项</Button>
                  <Button variant="outline" size="sm">分配任务</Button>
                </div>
              </div>

              <div className="flex gap-2 justify-end items-center">
                <Button variant="ghost" size="sm">导出 PDF</Button>
                <Button variant="ghost" size="sm">生成复盘报告</Button>
                <Button variant="outline" size="sm">标为已复盘</Button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <Card>
        <CardHeader>
          <CardTitle className="flex gap-2 items-center">
            <MessageSquare className="w-5 h-5 text-blue-600" /> 摘要与高亮
          </CardTitle>
          <CardDescription>通话摘要与高亮片段</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-1">
            <div className="p-3 rounded-lg border">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-gray-700">通话摘要</p>
                <Button variant="ghost" size="sm"><Edit3 className="mr-2 w-4 h-4" /> 编辑摘要</Button>
              </div>
              <p className="mt-2 text-sm text-gray-800">{summary}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex gap-2 items-center">
            <MessageSquare className="w-5 h-5 text-blue-600" /> 转录与播放器
          </CardTitle>
          <CardDescription>播放录音并按句浏览转录，支持片段标记</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 items-center mt-1 mb-3">
            <Button variant="outline" size="sm"><Play className="mr-2 w-4 h-4" /> 播放</Button>
            <Button variant="ghost" size="sm"><Pause className="mr-2 w-4 h-4" /> 暂停</Button>
          </div>
              <div className="space-y-2">
                {transcript.map((e: CallTranscriptEntry) => (
                  <div id={`entry-${e.id}`} key={e.id} className="p-3 rounded-lg border">
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2 items-center text-xs text-gray-500">
                        <Badge variant={e.speaker === 'rep' ? 'default' : 'outline'}>{e.speaker === 'rep' ? 'Rep' : '客户'}</Badge>
                        <span>{(e.startMs / 1000).toFixed(1)}s</span>
                      </div>
                      <Button size="sm" variant="ghost"><Flag className="mr-2 w-4 h-4" /> 标记片段</Button>
                    </div>
                    <p className="mt-2 text-sm">{e.text}</p>
                  </div>
                ))}
              </div>
        </CardContent>
      </Card>

      

      <Card>
        <CardHeader>
          <CardTitle className="flex gap-2 items-center">
            <MessageSquare className="w-5 h-5 text-purple-600" /> 教练操作
          </CardTitle>
          <CardDescription>基于此通话创建辅导任务或记录反馈</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2 justify-end items-center">
          <Button asChild>
            <Link href="/coach/tasks/create">
              <PlusCircle className="mr-2 w-4 h-4" /> 创建任务
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/coach/feedback/new">
              <Target className="mr-2 w-4 h-4" /> 记录反馈
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
