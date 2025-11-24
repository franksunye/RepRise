'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  Users,
  TrendingUp,
  Target,
  Clock,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  MessageSquare,
  Award,
  Filter,
  PlusCircle,
  ListChecks,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

import { mockReps, mockTasks, mockPractices, mockCoaches, mockCoachingSignals, getAllFeedbacks } from '@/data/mock-data';
import { getRealisticAvatarUrl, getInitials } from '@/lib/avatar';

export function CoachDashboard() {
  const currentCoach = mockCoaches[0];
  const myReps = mockReps.filter(rep => currentCoach.reps.includes(rep.id));
  const pendingTasks = mockTasks.filter(task =>
    task.coachId === currentCoach.id && (task.status === 'pending' || task.status === 'in-progress')
  ).slice(0, 5); // Displaying top 5 pending tasks for brevity

  return (
    <div className="p-6 space-y-6 bg-gray-50/50">
      {/* Header */}
      <header className="flex items-center justify-between pb-4 border-b">
        <div className="flex items-center gap-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src={getRealisticAvatarUrl(currentCoach.name)} alt={currentCoach.name} />
            <AvatarFallback className="text-lg font-medium text-blue-600 bg-blue-100">
              {getInitials(currentCoach.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">教练仪表盘</h1>
            <p className="text-gray-600">
              {currentCoach.name}，你负责 {myReps.length} 名销售代表
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            过滤 / 筛选
          </Button>
          <Button>
            <PlusCircle className="w-4 h-4 mr-2" />
            新建任务
          </Button>
          <Button variant="secondary">
            <ListChecks className="w-4 h-4 mr-2" />
            查看所有任务
          </Button>
        </div>
      </header>

      {/* Main Panel */}
      <main className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Pending Coaching Tasks */}
          <Card>
            <CardHeader>
              <CardTitle>待处理任务</CardTitle>
              <CardDescription>这里显示了需要您关注的未完成任务。</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingTasks.map(task => {
                  const rep = myReps.find(r => r.id === task.repId);
                  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';
                  return (
                    <Link href="#" key={task.id} className="block p-3 -mx-3 transition-all border border-transparent rounded-lg hover:border-gray-200 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                           <Avatar className="w-8 h-8">
                            <AvatarImage src={getRealisticAvatarUrl(rep?.name || '')} />
                            <AvatarFallback className="text-xs">{getInitials(rep?.name || '')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-gray-800">{task.title}</p>
                            <p className="text-sm text-gray-500">{rep?.name}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-right">
                          <div className='flex flex-col items-end'>
                            <div className="flex items-center gap-2">
                              {task.priority === 'high' && <Badge variant="destructive">高</Badge>}
                              {task.priority === 'medium' && <Badge variant="secondary" className="text-yellow-800 bg-yellow-100 border-yellow-200">中</Badge>}
                              {isOverdue && <Badge variant="destructive">已逾期</Badge>}
                            </div>
                          </div>
                          <div className="text-sm text-gray-500 flex items-center gap-1.5 w-28">
                            <Clock className="w-4 h-4" />
                            <span>截止: {new Date(task.dueDate).toLocaleDateString()}</span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* New Coaching Signals */}
          <Card>
            <CardHeader>
              <CardTitle>新的教练机会</CardTitle>
              <CardDescription>来自通话智能的信号，提示值得干预的通话。</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockCoachingSignals.slice(0, 4).map(signal => {
                  const rep = myReps.find(r => r.id === signal.repId);
                  return (
                    <div key={signal.id} className="p-3 transition-colors border rounded-lg hover:bg-gray-50/80">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1.5">
                            {signal.type === 'objection' && <Badge variant="secondary" className="text-orange-800 bg-orange-100">异议</Badge>}
                            {signal.type === 'no_next_step' && <Badge variant="secondary" className="text-purple-800 bg-purple-100">无下一步</Badge>}
                            {signal.type === 'engagement' && <Badge variant="secondary" className="text-blue-800 bg-blue-100">低参与度</Badge>}
                            <p className="text-sm text-gray-500">{new Date(signal.timestamp).toLocaleString()}</p>
                          </div>
                          <p className="leading-relaxed text-gray-700">&quot;{signal.snippet}&quot;</p>
                          <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                             <Avatar className="w-6 h-6">
                              <AvatarImage src={getRealisticAvatarUrl(rep?.name || '')} />
                              <AvatarFallback className="text-xs">{getInitials(rep?.name || '')}</AvatarFallback>
                            </Avatar>
                            <span>{rep?.name}</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="ml-4 shrink-0">
                          <PlusCircle className="h-4 w-4 mr-1.5" />
                          创建任务
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6 lg:col-span-1">
          {/* Coach Performance */}
          <Card>
            <CardHeader>
              <CardTitle>任务完成情况</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="mb-2 text-sm font-medium text-gray-600">任务统计</h4>
                <div style={{ height: '150px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: '已完成', value: mockTasks.filter(t => t.status === 'completed').length, fill: '#34d399' },
                        { name: '进行中', value: mockTasks.filter(t => t.status === 'in-progress').length, fill: '#60a5fa' },
                        { name: '已逾期', value: mockTasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'completed').length, fill: '#f87171' },
                      ]}
                      margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
                    >
                      <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip cursor={{fill: 'transparent'}} />
                      <Bar dataKey="value" barSize={30} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div>
                <h4 className="mb-2 text-sm font-medium text-gray-600">行动项完成率</h4>
                <div className="flex items-center gap-3">
                  <Progress value={82} className="h-2" />
                  <span className="font-semibold text-gray-700">82%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Feedback */}
          <Card>
            <CardHeader>
              <CardTitle>最近反馈</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {getAllFeedbacks().slice(0, 3).map(fb => {
                  const rep = myReps.find(r => r.id === fb.repId);
                  return (
                    <Link href={`/coach/feedback/${fb.id}`} key={fb.id} className="block p-3 text-sm transition-colors border rounded-lg bg-gray-50 hover:bg-gray-100 hover:border-gray-300">
                      <p className="text-gray-800 break-words line-clamp-2">&quot;{fb.content.substring(0, 80)}{fb.content.length > 80 ? '...' : ''}&quot;</p>
                      <p className="text-xs text-gray-500 text-right mt-1.5">- {rep?.name}</p>
                    </Link>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="pt-4 mt-8 text-sm text-center text-gray-500 border-t">
          <div className="flex items-center justify-center gap-6">
            <Link href="/coach/reps" className="hover:underline">所有代表 (All Reps)</Link>
            <Link href="/practice/history" className="hover:underline">历史通话回顾</Link>
            <Link href="#" className="hover:underline">反馈历史</Link>
            <Link href="#" className="hover:underline">设定 (Settings)</Link>
          </div>
      </footer>
    </div>
  );
}
