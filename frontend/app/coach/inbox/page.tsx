'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Users,
  MessageSquare,
  Clock,
  Filter,
  PlusCircle,
  Eye,
  X,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Target,
  Phone,
  Lightbulb,
} from 'lucide-react';

import { mockReps, mockCoaches, mockCoachingSignals, mockTasks, mockFeedbacks } from '@/data/mock-data';
import { getRealisticAvatarUrl, getInitials } from '@/lib/avatar';

// 教练收件箱统计类型
type CoachingStats = {
  totalSignals: number;
  newSignals: number;
  openFeedbackRequests: number;
  pendingTasks: number;
  repsWithOpenRequests: number;
};

// 教练机会信号类型
type CoachingSignal = {
  id: string;
  repId: string;
  type: 'objection' | 'no_next_step' | 'engagement' | 'closing';
  snippet: string;
  timestamp: string;
  severity: 'high' | 'medium' | 'low';
  status: 'open' | 'processed' | 'ignored';
  callId?: string;
};

export default function CoachingInbox() {
  const currentCoach = mockCoaches[0];
  const myReps = mockReps.filter(rep => currentCoach.reps.includes(rep.id));
  
  // 模拟教练机会信号数据
  const [coachingSignals, setCoachingSignals] = useState<CoachingSignal[]>([
    {
      id: 'sig-1',
      repId: 'rep-1',
      type: 'objection',
      snippet: '你们的价格比其他公司高太多了，我考虑一下再说吧。',
      timestamp: '2024-11-17T10:30:00Z',
      severity: 'high',
      status: 'open',
      callId: 'call-001'
    },
    {
      id: 'sig-2',
      repId: 'rep-2',
      type: 'no_next_step',
      snippet: '好的，我再想想，到时候会联系你。',
      timestamp: '2024-11-17T11:15:00Z',
      severity: 'medium',
      status: 'open',
      callId: 'call-002'
    },
    {
      id: 'sig-3',
      repId: 'rep-3',
      type: 'engagement',
      snippet: '客户在通话中显得很分心，对我们的方案不太感兴趣。',
      timestamp: '2024-11-16T14:45:00Z',
      severity: 'medium',
      status: 'open',
      callId: 'call-003'
    },
    {
      id: 'sig-4',
      repId: 'rep-1',
      type: 'no_next_step',
      snippet: '先把方案发给我，我先看看再说。',
      timestamp: '2024-11-16T16:00:00Z',
      severity: 'low',
      status: 'open',
      callId: 'call-004'
    },
    {
      id: 'sig-5',
      repId: 'rep-4',
      type: 'closing',
      snippet: '客户已经表达了购买意愿，但管家没有及时促成交易。',
      timestamp: '2024-11-15T09:30:00Z',
      severity: 'high',
      status: 'processed',
      callId: 'call-005'
    }
  ]);

  // 筛选状态
  const [selectedRep, setSelectedRep] = useState<string>('all');
  const [selectedSignalType, setSelectedSignalType] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'open' | 'closed'>('open');
  const [sortBy, setSortBy] = useState<string>('severity');

  const [createTaskOpen, setCreateTaskOpen] = useState<boolean>(false);
  const [taskSignalId, setTaskSignalId] = useState<string | null>(null);
  const [taskType, setTaskType] = useState<string>('Review');
  const [taskRepId, setTaskRepId] = useState<string>('all');
  const [taskPriority, setTaskPriority] = useState<string>('medium');
  const [taskDescription, setTaskDescription] = useState<string>('');
  const [taskDueDate, setTaskDueDate] = useState<string>('');

  // 计算统计信息
  const stats: CoachingStats = {
    totalSignals: coachingSignals.length,
    newSignals: coachingSignals.filter(signal => 
      signal.status === 'open' && 
      new Date(signal.timestamp) > new Date(Date.now() - 24 * 60 * 60 * 1000)
    ).length,
    openFeedbackRequests: mockFeedbacks.filter(fb => 
      fb.coachId === currentCoach.id && 
      new Date(fb.timestamp) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    ).length,
    pendingTasks: mockTasks.filter(task => 
      task.coachId === currentCoach.id && 
      (task.status === 'pending' || task.status === 'in-progress')
    ).length,
    repsWithOpenRequests: new Set(coachingSignals
      .filter(signal => signal.status === 'open')
      .map(signal => signal.repId)
    ).size
  };

  // 处理信号
  const handleCreateTask = (signalId: string) => {
    const signal = coachingSignals.find(s => s.id === signalId);
    if (signal) {
      setTaskSignalId(signalId);
      setTaskRepId(signal.repId);
      setCreateTaskOpen(true);
    }
  };

  const handleOpenCreateTask = () => {
    setTaskSignalId(null);
    setTaskRepId('all');
    setCreateTaskOpen(true);
  };

  const handleSubmitTask = () => {
    if (taskSignalId) {
      setCoachingSignals(prev => prev.map(s => s.id === taskSignalId ? { ...s, status: 'processed' } : s));
    }
    setCreateTaskOpen(false);
    setTaskDescription('');
    setTaskDueDate('');
    setTaskType('Review');
    setTaskPriority('medium');
  };

  const handleIgnoreSignal = (signalId: string) => {
    setCoachingSignals(prev => 
      prev.map(s => s.id === signalId ? { ...s, status: 'ignored' } : s)
    );
  };

  // 过滤信号
  let filteredSignals = coachingSignals.filter(signal => {
    if (activeTab === 'open' && signal.status !== 'open') return false;
    if (activeTab === 'closed' && signal.status === 'open') return false;
    if (selectedRep !== 'all' && signal.repId !== selectedRep) return false;
    if (selectedSignalType !== 'all' && signal.type !== selectedSignalType) return false;
    if (selectedSeverity !== 'all' && signal.severity !== selectedSeverity) return false;
    return true;
  });

  filteredSignals = filteredSignals.sort((a, b) => {
    if (sortBy === 'severity') {
      const weight = { high: 3, medium: 2, low: 1 } as const;
      return weight[b.severity] - weight[a.severity];
    }
    if (sortBy === 'detected_desc') {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    }
    if (sortBy === 'type') {
      return a.type.localeCompare(b.type);
    }
    return 0;
  });

  // 获取信号类型图标
  const getSignalIcon = (type: string) => {
    switch (type) {
      case 'objection': return AlertCircle;
      case 'no_next_step': return Clock;
      case 'engagement': return TrendingUp;
      case 'closing': return Target;
      default: return Lightbulb;
    }
  };

  // 获取信号类型标签
  const getSignalTypeLabel = (type: string) => {
    switch (type) {
      case 'objection': return '异议';
      case 'no_next_step': return '无下一步';
      case 'engagement': return '低参与度';
      case 'closing': return '成交机会';
      default: return type;
    }
  };

  // 获取严重性标签
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return <Badge variant="destructive">高</Badge>;
      case 'medium':
        return <Badge variant="secondary" className="text-yellow-800 bg-yellow-100 border-yellow-200">中</Badge>;
      case 'low':
        return <Badge variant="outline" className="text-gray-600">低</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50/50">
      {/* 顶部栏 */}
      <header className="flex items-center justify-between pb-4 border-b">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">教练收件箱</h1>
              <p className="text-gray-600">
                管理教练机会和反馈请求
              </p>
            </div>
          </div>
          
          {/* 统计徽章 */}
          {stats.newSignals > 0 && (
            <Badge variant="destructive" className="text-sm">
              {stats.newSignals} 个新机会
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Select value={selectedRep} onValueChange={setSelectedRep}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="按代表" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部代表</SelectItem>
              {myReps.map(r => (
                <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleOpenCreateTask}>
            <PlusCircle className="w-4 h-4 mr-2" />
            新建任务
          </Button>
        </div>
      </header>

      {/* 统计面板 */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-blue-100">
                <Lightbulb className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">教练机会</p>
                <p className="text-2xl font-bold">{stats.totalSignals}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-green-100">
                <Users className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">待关注代表</p>
                <p className="text-2xl font-bold">{stats.repsWithOpenRequests}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-orange-100">
                <MessageSquare className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">反馈请求</p>
                <p className="text-2xl font-bold">{stats.openFeedbackRequests}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-purple-100">
                <Target className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">待处理任务</p>
                <p className="text-2xl font-bold">{stats.pendingTasks}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 主要内容区 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* 左侧：代表列表 */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>代表列表</CardTitle>
              <CardDescription>您负责的销售代表</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {myReps.map(rep => {
                  const repSignals = coachingSignals.filter(s => s.repId === rep.id && s.status === 'open');
                  const lastInteraction = repSignals.length > 0 
                    ? new Date(Math.max(...repSignals.map(s => new Date(s.timestamp).getTime())))
                    : null;
                  
                  return (
                    <div 
                      key={rep.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedRep === rep.id 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedRep(selectedRep === rep.id ? 'all' : rep.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={getRealisticAvatarUrl(rep.name)} />
                            <AvatarFallback className="text-xs">{getInitials(rep.name)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-900">{rep.name}</p>
                            {lastInteraction && (
                              <p className="text-xs text-gray-500">
                                上次互动: {lastInteraction.toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {repSignals.length > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              {repSignals.length}
                            </Badge>
                          )}
                          <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 右侧：教练机会区 */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>教练机会</CardTitle>
                  <CardDescription>系统自动识别的教练机会点</CardDescription>
                </div>
                
                <div className="flex items-center gap-2">
                  <Select value={selectedSignalType} onValueChange={setSelectedSignalType}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="信号类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有类型</SelectItem>
                      <SelectItem value="objection">异议</SelectItem>
                      <SelectItem value="no_next_step">无下一步</SelectItem>
                      <SelectItem value="engagement">低参与度</SelectItem>
                      <SelectItem value="closing">成交机会</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                    <SelectTrigger className="w-28">
                      <SelectValue placeholder="优先级" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有优先级</SelectItem>
                      <SelectItem value="high">高</SelectItem>
                      <SelectItem value="medium">中</SelectItem>
                      <SelectItem value="low">低</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="排序" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="severity">按优先级</SelectItem>
                      <SelectItem value="detected_desc">按检测时间</SelectItem>
                      <SelectItem value="type">按类型</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <Tabs value={activeTab} onValueChange={(v: any) => setActiveTab(v)}>
                <TabsList className="mb-4">
                  <TabsTrigger value="open">
                    待处理 ({coachingSignals.filter(s => s.status === 'open').length})
                  </TabsTrigger>
                  <TabsTrigger value="closed">
                    已处理 ({coachingSignals.filter(s => s.status !== 'open').length})
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="open">
                  <div className="space-y-4">
                    {filteredSignals.length > 0 ? filteredSignals.map(signal => {
                      const rep = myReps.find(r => r.id === signal.repId);
                      const SignalIcon = getSignalIcon(signal.type);
                      
                      return (
                        <div key={signal.id} className="p-4 border rounded-lg">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <SignalIcon className="w-4 h-4 text-blue-600" />
                                <Badge variant="outline" className="text-xs">
                                  {getSignalTypeLabel(signal.type)}
                                </Badge>
                                {getSeverityBadge(signal.severity)}
                                <span className="text-sm text-gray-500">
                                  {new Date(signal.timestamp).toLocaleString()}
                                </span>
                              </div>
                              
                              <p className="text-gray-700 mb-3">
                                &quot;{signal.snippet}&quot;
                              </p>
                              
                              <div className="flex items-center gap-3 text-sm text-gray-600">
                                <Avatar className="w-6 h-6">
                                  <AvatarImage src={getRealisticAvatarUrl(rep?.name || '')} />
                                  <AvatarFallback className="text-xs">
                                    {getInitials(rep?.name || '')}
                                  </AvatarFallback>
                                </Avatar>
                                <span>{rep?.name}</span>
                                {signal.callId && (
                                  <Link href={`/coach/conversations/${signal.callId}`} className="text-blue-600">
                                    <Button variant="link" size="sm" className="h-6 p-0 text-blue-600">
                                      <Phone className="w-3 h-3 mr-1" />
                                      查看通话
                                    </Button>
                                  </Link>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2 ml-4">
                              <Button 
                                size="sm" 
                                onClick={() => handleCreateTask(signal.id)}
                                className="text-xs"
                              >
                                <PlusCircle className="w-3 h-3 mr-1" />
                                创建任务
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleIgnoreSignal(signal.id)}
                                className="text-xs"
                              >
                                <X className="w-3 h-3 mr-1" />
                                忽略
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    }) : (
                      <div className="text-center py-8 text-gray-500">
                        <MessageSquare className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                        <p>没有找到匹配的教练机会</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="closed">
                  <div className="space-y-4">
                    {filteredSignals.length > 0 ? filteredSignals.map(signal => {
                      const rep = myReps.find(r => r.id === signal.repId);
                      const SignalIcon = getSignalIcon(signal.type);
                      
                      return (
                        <div key={signal.id} className="p-4 border rounded-lg bg-gray-50">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <SignalIcon className="w-4 h-4 text-gray-400" />
                                <Badge variant="outline" className="text-xs">
                                  {getSignalTypeLabel(signal.type)}
                                </Badge>
                                {getSeverityBadge(signal.severity)}
                                <span className="text-sm text-gray-500">
                                  {new Date(signal.timestamp).toLocaleString()}
                                </span>
                                <Badge variant="secondary" className="text-xs">
                                  {signal.status === 'processed' ? '已处理' : '已忽略'}
                                </Badge>
                              </div>
                              
                              <p className="text-gray-500 line-through mb-3">
                                &quot;{signal.snippet}&quot;
                              </p>
                              
                              <div className="flex items-center gap-3 text-sm text-gray-500">
                                <Avatar className="w-6 h-6">
                                  <AvatarImage src={getRealisticAvatarUrl(rep?.name || '')} />
                                  <AvatarFallback className="text-xs">
                                    {getInitials(rep?.name || '')}
                                  </AvatarFallback>
                                </Avatar>
                                <span>{rep?.name}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }) : (
                      <div className="text-center py-8 text-gray-500">
                        <CheckCircle className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                        <p>没有已处理的教练机会</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      {createTaskOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30" onClick={() => setCreateTaskOpen(false)}></div>
          <div className="relative w-full max-w-lg rounded-lg bg-white shadow-lg">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold">新建任务</h3>
            </div>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-sm text-gray-600 mb-1">任务类型</p>
                  <Select value={taskType} onValueChange={setTaskType}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="任务类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Review">Review</SelectItem>
                      <SelectItem value="Follow-up">Follow-up</SelectItem>
                      <SelectItem value="Action">Action</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">分配代表</p>
                  <Select value={taskRepId} onValueChange={setTaskRepId}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="选择代表" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">未指定</SelectItem>
                      {myReps.map(r => (
                        <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-sm text-gray-600 mb-1">优先级</p>
                  <Select value={taskPriority} onValueChange={setTaskPriority}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="优先级" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">高</SelectItem>
                      <SelectItem value="medium">中</SelectItem>
                      <SelectItem value="low">低</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">到期时间</p>
                  <input 
                    type="date" 
                    value={taskDueDate} 
                    onChange={e => setTaskDueDate(e.target.value)} 
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  />
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">任务描述</p>
                <textarea 
                  value={taskDescription} 
                  onChange={e => setTaskDescription(e.target.value)} 
                  rows={4} 
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                />
              </div>
            </div>
            <div className="p-4 border-t flex items-center justify-end gap-2">
              <Button variant="outline" onClick={() => setCreateTaskOpen(false)}>取消</Button>
              <Button onClick={handleSubmitTask}>保存并创建</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
