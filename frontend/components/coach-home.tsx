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
  TrendingDown,
  Target,
  Clock,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  MessageSquare,
  Award,
} from 'lucide-react';
import { mockReps, mockTasks, mockPractices, mockCoaches } from '@/data/mock-data';
import { getRealisticAvatarUrl, getInitials } from '@/lib/avatar';

export function CoachHome() {
  const currentCoach = mockCoaches[0];
  
  // 获取当前教练的管家
  const myReps = mockReps.filter(rep => currentCoach.reps.includes(rep.id));
  
  // 获取所有任务
  const allTasks = mockTasks.filter(task => task.coachId === currentCoach.id);
  const pendingTasks = allTasks.filter(t => t.status === 'pending');
  const inProgressTasks = allTasks.filter(t => t.status === 'in-progress');
  const overdueTasks = allTasks.filter(t => {
    const dueDate = new Date(t.dueDate);
    return dueDate < new Date() && t.status !== 'completed';
  });
  
  // 获取管家的练习数据
  const repPractices = myReps.map(rep => {
    const practices = mockPractices.filter(p => p.repId === rep.id);
    const avgScore = practices.length > 0 
      ? Math.round(practices.reduce((sum, p) => sum + p.score, 0) / practices.length)
      : 0;
    const weeklyPractices = practices.filter(p => {
      const practiceDate = new Date(p.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return practiceDate >= weekAgo;
    }).length;
    
    return {
      ...rep,
      practiceCount: practices.length,
      averageScore: avgScore,
      weeklyPractices,
      trend: weeklyPractices >= 6 ? 'up' : 'down',
      needsAttention: avgScore < 75 || weeklyPractices < 6,
    };
  });
  
  // 团队统计
  const totalReps = myReps.length;
  const teamAvgScore = repPractices.length > 0
    ? Math.round(repPractices.reduce((sum, r) => sum + r.averageScore, 0) / repPractices.length)
    : 0;
  const needsAttention = repPractices.filter(r => r.needsAttention).length;
  const totalWeeklyPractices = repPractices.reduce((sum, r) => sum + r.weeklyPractices, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">欢迎回来，{currentCoach.name}！</h1>
          <p className="text-gray-600 mt-1">查看团队表现，提供及时辅导</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm px-3 py-1">
            <Users className="h-4 w-4 mr-1" />
            管理 {totalReps} 名管家
          </Badge>
        </div>
      </div>

      {/* Team Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              团队人数
            </CardDescription>
            <CardTitle className="text-3xl">{totalReps}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-green-600">
              <CheckCircle className="h-4 w-4 mr-1" />
              <span>全部活跃</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              团队平均分
            </CardDescription>
            <CardTitle className="text-3xl">{teamAvgScore}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-blue-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>稳步提升</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              本周练习
            </CardDescription>
            <CardTitle className="text-3xl">{totalWeeklyPractices}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-600">总练习次数</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              需要关注
            </CardDescription>
            <CardTitle className="text-3xl">{needsAttention}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-orange-600">表现待提升</div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Tasks Alert */}
      {overdueTasks.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-medium text-orange-900">有 {overdueTasks.length} 个任务已逾期</h3>
                <p className="text-sm text-orange-700 mt-1">请及时跟进管家的任务完成情况</p>
              </div>
              <Link href="/coach/tasks">
                <Button variant="outline" size="sm">
                  查看任务
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Members - Needs Attention */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>需要关注的管家</CardTitle>
                <CardDescription>表现低于预期或练习不足</CardDescription>
              </div>
              <Link href="/coach/reps">
                <Button variant="ghost" size="sm">
                  查看全部
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {repPractices.filter(r => r.needsAttention).length > 0 ? (
              <div className="space-y-4">
                {repPractices.filter(r => r.needsAttention).map((rep) => (
                  <div key={rep.id} className="flex items-center gap-4 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={getRealisticAvatarUrl(rep.name)} alt={rep.name} />
                      <AvatarFallback className="bg-orange-100 text-orange-600 font-medium">
                        {getInitials(rep.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900">{rep.name}</p>
                        {rep.averageScore < 75 && (
                          <Badge variant="destructive" className="text-xs">低分</Badge>
                        )}
                        {rep.weeklyPractices < 6 && (
                          <Badge variant="outline" className="text-xs">练习不足</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                        <span>平均分: {rep.averageScore}</span>
                        <span>本周: {rep.weeklyPractices} 次</span>
                      </div>
                    </div>
                    <Link href={`/coach/reps/${rep.id}`}>
                      <Button size="sm" variant="outline">查看</Button>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <CheckCircle className="h-12 w-12 mx-auto mb-2 text-green-500" />
                <p>太棒了！所有管家表现良好</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Tasks */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>待办任务</CardTitle>
                <CardDescription>需要跟进的辅导任务</CardDescription>
              </div>
              <Link href="/coach/tasks">
                <Button variant="ghost" size="sm">
                  查看全部
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {/* Task Summary */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="text-center p-2 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{inProgressTasks.length}</div>
                  <div className="text-xs text-blue-600">进行中</div>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-600">{pendingTasks.length}</div>
                  <div className="text-xs text-gray-600">待开始</div>
                </div>
                <div className="text-center p-2 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{overdueTasks.length}</div>
                  <div className="text-xs text-orange-600">已逾期</div>
                </div>
              </div>

              {/* Recent Tasks List */}
              {allTasks.slice(0, 3).map((task) => {
                const rep = myReps.find(r => r.id === task.repId);
                const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';
                
                return (
                  <div key={task.id} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className={`h-2 w-2 rounded-full mt-2 ${
                      task.status === 'in-progress' ? 'bg-blue-500' :
                      isOverdue ? 'bg-orange-500' : 'bg-gray-300'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm">{task.title}</p>
                        {task.priority === 'high' && (
                          <Badge variant="destructive" className="text-xs">高优先级</Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mt-1">分配给: {rep?.name}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>截止: {new Date(task.dueDate).toLocaleDateString('zh-CN')}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performers */}
      <Card>
        <CardHeader>
          <CardTitle>优秀表现</CardTitle>
          <CardDescription>本周表现突出的管家</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {repPractices
              .filter(r => !r.needsAttention)
              .sort((a, b) => b.averageScore - a.averageScore)
              .slice(0, 3)
              .map((rep, index) => (
                <div key={rep.id} className="flex items-center gap-3 p-4 border rounded-lg bg-gradient-to-br from-blue-50 to-white">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-blue-100 text-blue-600 font-medium text-lg">
                      <AvatarImage src={getRealisticAvatarUrl(rep.name)} alt={rep.name} />
                        {getInitials(rep.name)}
                      </AvatarFallback>
                    </Avatar>
                    {index === 0 && (
                      <div className="absolute -top-1 -right-1 h-5 w-5 bg-yellow-400 rounded-full flex items-center justify-center">
                        <Award className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{rep.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {rep.averageScore} 分
                      </Badge>
                      <span className="text-xs text-gray-600">
                        {rep.weeklyPractices} 次练习
                      </span>
                    </div>
                  </div>
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/coach/tasks">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">布置新任务</p>
                  <p className="text-sm text-gray-600">为管家创建练习任务</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/coach/reps">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">提供反馈</p>
                  <p className="text-sm text-gray-600">查看练习并给出建议</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/coach/analytics">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium">团队分析</p>
                  <p className="text-sm text-gray-600">查看详细数据报表</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
