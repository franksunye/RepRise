'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { getRealisticAvatarUrl, getInitials } from '@/lib/avatar';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import {
  ArrowLeft,
  Phone,
  Mail,
  Calendar,
  TrendingUp,
  Award,
  Clock,
  Target,
  MessageSquare,
  Send,
} from 'lucide-react';
import { useState } from 'react';

export default function RepDetailPage() {
  const [feedbackText, setFeedbackText] = useState('');

  const rep = {
    id: 'rep-1',
    name: '张伟',
    email: 'zhangwei@example.com',
    phone: '13800138001',
    joinDate: '2024-01-15',
    avatar: '',
  };

  const practices = [
    {
      id: 1,
      title: '报价谈判练习',
      type: '报价谈判',
      date: '2024-11-17',
      score: 92,
      duration: 20,
      feedback: '优秀！能够清晰解释价格构成，并有效处理客户的价格顾虑。',
    },
    {
      id: 2,
      title: '上门勘查对话练习',
      type: '上门勘查',
      date: '2024-11-16',
      score: 78,
      duration: 25,
      feedback: '勘查流程基本正确，但在解释技术问题时可以更通俗易懂。',
    },
    {
      id: 3,
      title: '首次电话沟通练习',
      type: '电话沟通',
      date: '2024-11-15',
      score: 85,
      duration: 15,
      feedback: '表现不错！语速适中，能够清晰表达服务内容。',
    },
  ];

  const tasks = [
    {
      id: 1,
      title: '电话模拟练习',
      description: '完成3次首次电话沟通练习',
      dueDate: '2024-11-20',
      status: 'in-progress',
      priority: 'high',
    },
    {
      id: 2,
      title: '上门勘查模拟',
      description: '练习现场勘查沟通',
      dueDate: '2024-11-18',
      status: 'pending',
      priority: 'medium',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/coach/reps">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">管家详情</h1>
          <p className="text-gray-600 mt-1">查看 {rep.name} 的详细信息和表现</p>
        </div>
        <Button>
          <MessageSquare className="h-4 w-4 mr-2" />
          发送消息
        </Button>
      </div>

      {/* Profile Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-6">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-primary/10 text-primary font-medium text-2xl">
                {getInitials(rep.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{rep.name}</h2>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>{rep.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{rep.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>入职时间: {new Date(rep.joinDate).toLocaleDateString('zh-CN')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="success">活跃</Badge>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    进步中
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Stats & Tasks */}
        <div className="lg:col-span-2 space-y-6">
          {/* Performance Stats */}
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>总练习</CardDescription>
                <CardTitle className="text-2xl">45</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>平均分</CardDescription>
                <CardTitle className="text-2xl">85</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>本周</CardDescription>
                <CardTitle className="text-2xl">12</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>待办</CardDescription>
                <CardTitle className="text-2xl">2</CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Recent Practices */}
          <Card>
            <CardHeader>
              <CardTitle>最近练习记录</CardTitle>
              <CardDescription>查看最近的练习表现</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {practices.map((practice) => (
                <div key={practice.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{practice.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {practice.type}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{practice.date}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {practice.duration} 分钟
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{practice.score}</div>
                      <div className="text-xs text-gray-500">分</div>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg mt-2">
                    <p className="text-sm text-blue-700">{practice.feedback}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Assigned Tasks */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>布置的任务</CardTitle>
                  <CardDescription>当前进行中的辅导任务</CardDescription>
                </div>
                <Button size="sm">
                  <Target className="h-4 w-4 mr-2" />
                  新建任务
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {tasks.map((task) => (
                <div key={task.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{task.title}</h4>
                        {task.priority === 'high' && (
                          <Badge variant="destructive" className="text-xs">
                            高优先级
                          </Badge>
                        )}
                        <Badge
                          variant={
                            task.status === 'completed'
                              ? 'success'
                              : task.status === 'in-progress'
                              ? 'default'
                              : 'outline'
                          }
                          className="text-xs"
                        >
                          {task.status === 'completed'
                            ? '已完成'
                            : task.status === 'in-progress'
                            ? '进行中'
                            : '待开始'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                      <div className="text-xs text-gray-500">
                        截止日期: {new Date(task.dueDate).toLocaleDateString('zh-CN')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Feedback & Analysis */}
        <div className="space-y-6">
          {/* Skill Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>能力分析</CardTitle>
              <CardDescription>各项技能得分</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>专业性</span>
                  <span className="font-medium">88</span>
                </div>
                <Progress value={88} />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>沟通能力</span>
                  <span className="font-medium">85</span>
                </div>
                <Progress value={85} />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>时间管理</span>
                  <span className="font-medium">78</span>
                </div>
                <Progress value={78} />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>异议处理</span>
                  <span className="font-medium">82</span>
                </div>
                <Progress value={82} />
              </div>
            </CardContent>
          </Card>

          {/* Strengths & Weaknesses */}
          <Card>
            <CardHeader>
              <CardTitle>优势与待提升</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">优势</div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="success">专业性</Badge>
                  <Badge variant="success">沟通能力</Badge>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">待提升</div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="warning">异议处理</Badge>
                  <Badge variant="warning">时间管理</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Add Feedback */}
          <Card>
            <CardHeader>
              <CardTitle>添加反馈</CardTitle>
              <CardDescription>给管家提供指导建议</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="输入你的反馈和建议..."
                className="w-full h-32 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              />
              <Button className="w-full">
                <Send className="h-4 w-4 mr-2" />
                发送反馈
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
