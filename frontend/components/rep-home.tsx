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
  BookOpen,
  CheckCircle,
  MessageSquare,
  Calendar,
  Star
} from 'lucide-react';
import {
  getUserTasks,
  getUserKPI,
  getUserPractices,
  mockReps,
  getActionItemsByRepId,
  getFeedbacksByRepId,
  getCurrentUser
} from '@/data/mock-data';

export function RepHome() {
  const currentUser = getCurrentUser();
  const tasks = getUserTasks(currentUser.id);
  const weeklyKPI = getUserKPI(currentUser.id, 'week');
  const practices = getUserPractices(currentUser.id);
  const actionItems = getActionItemsByRepId(currentUser.id);
  const feedbacks = getFeedbacksByRepId(currentUser.id);

  // 计算今日任务
  const todayTasks = tasks.filter(t => t.status === 'pending' || t.status === 'in-progress').slice(0, 3);

  // 最近的练习
  const recentPractices = practices.slice(0, 3);

  // 待处理的行动建议
  const pendingActionItems = actionItems
    .filter(a => a.status === 'pending' || a.status === 'in_progress')
    .slice(0, 3);

  // 最新反馈
  const recentFeedbacks = feedbacks
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 3);

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
              {todayTasks.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Target className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                  <p>暂无待完成任务</p>
                </div>
              ) : (
                todayTasks.map((task) => {
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
                    <Link key={task.id} href={`/tasks/${task.id}`}>
                      <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
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
                            <p className="text-sm text-gray-600 line-clamp-1">{task.description}</p>
                            <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                              <Clock className="h-3 w-3" />
                              <span>截止日期: {new Date(task.dueDate).toLocaleDateString('zh-CN')}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-primary">
                          查看 <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </Link>
                  );
                })
              )}
              <Link href="/tasks">
                <Button variant="outline" className="w-full mt-4">
                  查看全部任务
                </Button>
              </Link>
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

      {/* Action Items and Feedbacks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Action Items */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  我的行动建议
                </CardTitle>
                <CardDescription>教练建议你完成的行动项</CardDescription>
              </div>
              <Badge variant="outline">{pendingActionItems.length} 个待完成</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingActionItems.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <CheckCircle className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                <p>暂无行动建议</p>
                <p className="text-sm mt-1">教练会给你任务后这里显示改进建议</p>
              </div>
            ) : (
              <>
                {pendingActionItems.map((item) => {
                  const isOverdue = new Date(item.dueDate) < new Date() && item.status !== 'done';
                  return (
                    <div
                      key={item.id}
                      className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`mt-1 ${item.status === 'in_progress' ? 'text-yellow-500' : 'text-gray-400'}`}>
                          <CheckCircle className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 line-clamp-2">{item.description}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                            <span className={`flex items-center gap-1 ${isOverdue ? 'text-red-600 font-medium' : ''}`}>
                              <Calendar className="h-3 w-3" />
                              截止: {item.dueDate}
                            </span>
                            <Badge
                              variant={item.status === 'in_progress' ? 'outline' : 'secondary'}
                              className="text-xs"
                            >
                              {item.status === 'in_progress' ? '进行中' : '待处理'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <Link href="/tasks">
                  <Button variant="outline" className="w-full mt-4">
                    查看全部行动建议
                  </Button>
                </Link>
              </>
            )}
          </CardContent>
        </Card>

        {/* Recent Feedbacks */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-blue-500" />
                  最新反馈
                </CardTitle>
                <CardDescription>教练给你的最新反馈</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentFeedbacks.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <MessageSquare className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                <p>暂无反馈</p>
                <p className="text-sm mt-1">教练会在这里给你反馈和建议</p>
              </div>
            ) : (
              <>
                {recentFeedbacks.map((feedback) => (
                  <Link key={feedback.id} href={`/coaching/feedback/${feedback.id}`}>
                    <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant="secondary" className="text-xs">{feedback.source}</Badge>
                        {feedback.score && (
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                            <span className="text-sm font-bold text-yellow-700">{feedback.score}</span>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-700 line-clamp-2 mb-2">{feedback.content}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>{new Date(feedback.timestamp).toLocaleDateString('zh-CN')}</span>
                      </div>
                    </div>
                  </Link>
                ))}
                <Link href="/coaching/feedback">
                  <Button variant="outline" className="w-full mt-4">
                    查看全部反馈
                  </Button>
                </Link>
              </>
            )}
          </CardContent>
        </Card>
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
