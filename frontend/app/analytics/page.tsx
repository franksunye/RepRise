'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  TrendingUp,
  Target,
  Award,
  Home as HomeIcon,
  DollarSign,
  CheckCircle,
  BarChart3,
  Calendar,
} from 'lucide-react';
import {
  getCurrentUser,
  getUserKPI,
  getUserSkillScore,
  getUserPracticeTrend,
  getUserScoreTrend,
  getUserPracticeTypeStats,
  getUserPractices,
} from '@/data/mock-data';
import { useState } from 'react';

export default function AnalyticsPage() {
  const currentUser = getCurrentUser();
  const [period, setPeriod] = useState<'week' | 'month'>('week');
  
  const kpiData = getUserKPI(currentUser.id, period);
  const skillScore = getUserSkillScore(currentUser.id);
  const practiceTrend = getUserPracticeTrend(currentUser.id);
  const scoreTrend = getUserScoreTrend(currentUser.id);
  const practiceTypeStats = getUserPracticeTypeStats(currentUser.id);
  const recentPractices = getUserPractices(currentUser.id).slice(0, 5);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">我的数据</h1>
          <p className="text-gray-600 mt-1">查看你的练习数据和业务表现</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={period === 'week' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPeriod('week')}
          >
            本周
          </Button>
          <Button
            variant={period === 'month' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPeriod('month')}
          >
            本月
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              练习次数
            </CardDescription>
            <CardTitle className="text-3xl">{kpiData?.practiceCount || 0}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+20% 较上{period === 'week' ? '周' : '月'}</span>
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
            <CardTitle className="text-3xl">{kpiData?.averageScore || 0}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+5 分较上{period === 'week' ? '周' : '月'}</span>
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
            <CardTitle className="text-3xl">{kpiData?.onSiteSuccessRate || 0}%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+8% 较上月</span>
            </div>
            <Progress value={kpiData?.onSiteSuccessRate || 0} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              报价转化率
            </CardDescription>
            <CardTitle className="text-3xl">{kpiData?.pricingConversionRate || 0}%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+12% 较上月</span>
            </div>
            <Progress value={kpiData?.pricingConversionRate || 0} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              成交率
            </CardDescription>
            <CardTitle className="text-3xl">{kpiData?.dealCloseRate || 0}%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+6% 较上月</span>
            </div>
            <Progress value={kpiData?.dealCloseRate || 0} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>练习趋势</CardTitle>
            <CardDescription>最近7天的练习次数</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {practiceTrend.map((point, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-16 text-sm text-gray-600">{point.date}</div>
                  <div className="flex-1">
                    <Progress value={(point.value / 5) * 100} className="h-2" />
                  </div>
                  <div className="w-8 text-sm font-medium text-right">{point.value}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>得分趋势</CardTitle>
            <CardDescription>最近7天的平均得分</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {scoreTrend.map((point, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-16 text-sm text-gray-600">{point.date}</div>
                  <div className="flex-1">
                    <Progress value={point.value} className="h-2" />
                  </div>
                  <div className="w-8 text-sm font-medium text-right">{point.value}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>能力分析</CardTitle>
            <CardDescription>各项技能得分评估</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span>专业性</span>
                <span className="font-medium">{skillScore?.professionalism || 0}</span>
              </div>
              <Progress value={skillScore?.professionalism || 0} />
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span>沟通能力</span>
                <span className="font-medium">{skillScore?.communication || 0}</span>
              </div>
              <Progress value={skillScore?.communication || 0} />
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span>时间管理</span>
                <span className="font-medium">{skillScore?.timeManagement || 0}</span>
              </div>
              <Progress value={skillScore?.timeManagement || 0} />
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span>异议处理</span>
                <span className="font-medium">{skillScore?.objectionHandling || 0}</span>
              </div>
              <Progress value={skillScore?.objectionHandling || 0} />
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span>成交技巧</span>
                <span className="font-medium">{skillScore?.closingSkill || 0}</span>
              </div>
              <Progress value={skillScore?.closingSkill || 0} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>练习类型分布</CardTitle>
            <CardDescription>各类型练习次数和得分</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {practiceTypeStats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{stat.type}</span>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="text-xs">
                      {stat.count} 次
                    </Badge>
                    <span className="text-sm text-gray-600">
                      平均 {stat.averageScore} 分
                    </span>
                  </div>
                </div>
                <Progress value={stat.averageScore} className="h-1.5" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>最近练习</CardTitle>
          <CardDescription>查看最近的练习记录</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentPractices.map((practice) => (
              <div
                key={practice.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    practice.score >= 85 ? 'bg-green-100' :
                    practice.score >= 70 ? 'bg-blue-100' :
                    'bg-yellow-100'
                  }`}>
                    <BarChart3 className={`h-5 w-5 ${
                      practice.score >= 85 ? 'text-green-600' :
                      practice.score >= 70 ? 'text-blue-600' :
                      'text-yellow-600'
                    }`} />
                  </div>
                  <div>
                    <p className="font-medium">{practice.type}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-3 w-3" />
                      <span>{practice.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={practice.score >= 85 ? 'success' : 'default'}>
                    {practice.score} 分
                  </Badge>
                  <Badge variant="outline">{practice.status === 'completed' ? '已完成' : '进行中'}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
