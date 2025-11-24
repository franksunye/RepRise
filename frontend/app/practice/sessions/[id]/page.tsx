'use client';

import { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
// 使用原生输入控件
import { getRolePlaySessionById, getTranscriptEntriesBySessionId, getNotesBySessionId, getFlaggedSegmentsBySessionId } from '@/data/mock-data';
import { TranscriptEntry, Note, FlaggedSegment } from '@/types';
import { ArrowLeft, Play, Pause, RotateCcw, Calendar, Clock, MessageSquare, Mic, Flag, Download, BookOpen } from 'lucide-react';
import { addFlaggedSegment } from '@/data/mock-data';

export default function SessionDetailPage() {
  const params = useParams();
  const sessionId = params?.id as string;

  const session = getRolePlaySessionById(sessionId);
  const transcript = getTranscriptEntriesBySessionId(sessionId);
  const initialNotes = getNotesBySessionId(sessionId);
  const flagged = getFlaggedSegmentsBySessionId(sessionId);

  const [isPlaying, setIsPlaying] = useState(false);
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [newNote, setNewNote] = useState('');

  const flaggedIds = useMemo(() => new Set(flagged.flatMap((f) => [f.startEntryId, f.endEntryId].filter(Boolean) as string[])), [flagged]);

  if (!session) {
    return (
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>会话不存在</CardTitle>
            <CardDescription>请返回会话列表重新选择。</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/practice/sessions">
              <Button variant="outline">返回会话管理</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const addNote = (entry?: TranscriptEntry) => {
    const text = newNote.trim();
    if (!text) return;
    const note: Note = {
      id: `note-${Date.now()}`,
      sessionId: sessionId,
      entryId: entry?.id,
      authorRole: 'rep',
      authorId: session.repId,
      text,
      createdAt: new Date().toISOString(),
    };
    setNotes([note, ...notes]);
    setNewNote('');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/practice/sessions">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">练习复盘</h1>
          <p className="text-gray-600 mt-1">查看录音与转录、添加反馈与标注</p>
        </div>
      </div>

      {/* Top Info */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl">{session.title || session.scenario}</CardTitle>
              <CardDescription>{session.description}</CardDescription>
              <div className="mt-2 flex items-center gap-3 text-sm text-gray-600">
                <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" />{session.persona}</span>
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(session.startedAt).toLocaleString('zh-CN')}</span>
                {session.durationMs && (
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{Math.round((session.durationMs || 0) / 60000)} 分钟</span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{session.type}</Badge>
              <Badge variant={session.status === 'completed' ? 'success' : session.status === 'in-progress' ? 'warning' : 'default'}>{session.status}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsPlaying((v) => !v)}>
              {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
              {isPlaying ? '暂停' : '播放'}
            </Button>
            <Button variant="ghost" size="sm">
              <RotateCcw className="h-4 w-4 mr-2" />
              重新练习
            </Button>
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4 mr-2" />
              导出反馈
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transcript */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">录音与转录</CardTitle>
              <CardDescription>点击句子可添加注释或标记片段</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {transcript.map((entry) => (
                  <div key={entry.id} className={`p-3 rounded-lg border ${flaggedIds.has(entry.id) ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Badge variant={entry.speaker === 'rep' ? 'default' : 'outline'}>{entry.speaker === 'rep' ? 'Rep' : 'AI'}</Badge>
                        <span>{(entry.startMs / 1000).toFixed(1)}s</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => addNote(entry)}>
                          <Mic className="h-4 w-4 mr-2" />
                          添加注释
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            addFlaggedSegment({
                              id: `fs-${Date.now()}`,
                              sessionId: sessionId,
                              startEntryId: entry.id,
                              labels: ['objection'],
                              severity: 'medium',
                              createdByRole: 'coach',
                              createdById: 'coach-1',
                              createdAt: new Date().toISOString(),
                            });
                          }}
                        >
                          <Flag className="h-4 w-4 mr-2" />
                          标记片段
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm mt-2">{entry.text}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notes & Feedback */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">我的注释</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <textarea
                  placeholder="记录你的思考或困难点…"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <div className="flex items-center gap-2">
                  <Button size="sm" onClick={() => addNote()}>添加注释</Button>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                {notes.map((n) => (
                  <div key={n.id} className="p-3 bg-purple-50 rounded-lg">
                    <div className="text-xs text-purple-900 mb-1">{new Date(n.createdAt).toLocaleString('zh-CN')}</div>
                    <p className="text-sm text-purple-800">{n.text}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">教练反馈（占位）</CardTitle>
              <CardDescription>后续将接入教练反馈与行动建议</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• 开场更简洁，明确预约下一步</p>
                <p>• 略过直接报价，先做价值铺垫</p>
                <p>• 异议处理使用“先认同再引导”的结构</p>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <Button variant="outline" size="sm">
                  <BookOpen className="h-4 w-4 mr-2" />
                  查看相关话术
                </Button>
                <Button variant="ghost" size="sm">创建教练任务</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
