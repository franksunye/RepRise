'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowRight, 
  Phone, 
  Home as HomeIcon, 
  DollarSign, 
  TrendingUp,
  Clock,
  Target,
  Award,
  BookOpen
} from 'lucide-react';
import { 
  getUserTasks, 
  getUserKPI,
  getUserPractices,
  mockReps
} from '@/data/mock-data';

export function RepHome() {
  const currentUser = mockReps[0]; // 管家用户
  const tasks = getUserTasks(currentUser.id);
  const weeklyKPI = getUserKPI(currentUser.id, 'week');
  const practices = getUserPractices(currentUser.id);
  
  // 计算今日任务
  const todayTasks = tasks.filter(t => t.status === 'pending' || t.status === 'in-progress').slice(0, 3);
  
  // 最近的练习
  const recentPractices = practices.slice(0, 3);

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">欢迎回来，{currentUser.name}！</h1>
          <p className="text-gray-600 mt-1">继续你的学习之旅，提升销售技能</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="success" className="text-sm px-3 py-1">
            <Award className="h-4 w-4 mr-1" />
            本周表现优秀
          </Badge>
        </div>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              本周练习次数
            </CardDescription>
            <CardTitle className="text-3xl">{weeklyKPI?.practiceCount || 0}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+20% 较上周</span>
            </div>
            <Progress value={75} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              平均得分
            </CardDescription>
            <CardTitle className="text-3xl">{weeklyKPI?.averageScore || 0}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+5 分较上周</span>
            </div>
            <Progress value={85} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <HomeIcon className="h-4 w-4" />
              上门成功率
            </CardDescription>
            <CardTitle className="text-3xl">{weeklyKPI?.onSiteSuccessRate || 0}%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+8% 较上月</span>
            </div>
            <Progress value={78} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              报价转化率
            </CardDescription>
            <CardTitle className="text-3xl">{weeklyKPI?.pricingConversionRate || 0}%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+12% 较上月</span>
            </div>
            <Progress value={65} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Tasks */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>今日任务</CardTitle>
                  <CardDescription>完成这些任务以提升你的技能</CardDescription>
                </div>
                <Badge variant="outline">{todayTasks.length} 个待完成</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {todayTasks.map((task) => {
                const icons = {
                  'cold-call': Phone,
                  'follow-up': Phone,
                  'on-site': HomeIcon,
                  'pricing': DollarSign,
                  'objection': Target,
                };
                const Icon = icons[task.type];
                const colors = {
                  'cold-call': 'blue',
                  'follow-up': 'blue',
                  'on-site': 'green',
                  'pricing': 'purple',
                  'objection': 'orange',
                };
                const color = colors[task.type];

                return (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`h-10 w-10 rounded-lg bg-${color}-100 flex items-center justify-center`}>
                        <Icon className={`h-5 w-5 text-${color}-600`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{task.title}</p>
                          {task.priority === 'high' && (
                            <Badge variant="destructive" className="text-xs">高优先级</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{task.description}</p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          <span>截止日期: {new Date(task.dueDate).toLocaleDateString('zh-CN')}</span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm">
                      开始 <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>最近练习</CardTitle>
              <CardDescription>查看你的练习记录</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentPractices.map((practice) => (
                <div key={practice.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{practice.title}</p>
                    <Badge 
                      variant={practice.score >= 85 ? 'success' : practice.score >= 70 ? 'default' : 'warning'}
                      className="text-xs"
                    >
                      {practice.score}分
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(practice.date).toLocaleDateString('zh-CN')}
                  </div>
                  <Progress value={practice.score} className="h-2" />
                </div>
              ))}
              <Link href="/practice/history">
                <Button variant="outline" className="w-full mt-4">
                  查看全部练习记录
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>快速入口</CardTitle>
          <CardDescription>选择一个练习类型开始训练</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/practice/cold-call">
              <Button variant="outline" className="h-24 w-full flex flex-col gap-2 hover:border-blue-500 hover:bg-blue-50">
                <Phone className="h-6 w-6 text-blue-600" />
                <span className="font-medium">电话练习</span>
                <span className="text-xs text-gray-500">首次沟通</span>
              </Button>
            </Link>
            <Link href="/practice">
              <Button variant="outline" className="h-24 w-full flex flex-col gap-2 hover:border-green-500 hover:bg-green-50">
                <HomeIcon className="h-6 w-6 text-green-600" />
                <span className="font-medium">上门模拟</span>
                <span className="text-xs text-gray-500">勘查场景</span>
              </Button>
            </Link>
            <Link href="/practice">
              <Button variant="outline" className="h-24 w-full flex flex-col gap-2 hover:border-purple-500 hover:bg-purple-50">
                <DollarSign className="h-6 w-6 text-purple-600" />
                <span className="font-medium">报价练习</span>
                <span className="text-xs text-gray-500">议价谈判</span>
              </Button>
            </Link>
            <Link href="/playbook">
              <Button variant="outline" className="h-24 w-full flex flex-col gap-2 hover:border-orange-500 hover:bg-orange-50">
                <BookOpen className="h-6 w-6 text-orange-600" />
                <span className="font-medium">内容库</span>
                <span className="text-xs text-gray-500">话术脚本</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
