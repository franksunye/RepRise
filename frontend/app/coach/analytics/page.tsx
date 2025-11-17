'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  TrendingUp,
  Target,
  Award,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Download,
  Calendar,
} from 'lucide-react';
import { getRealisticAvatarUrl, getInitials } from '@/lib/avatar';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import { mockReps, mockTasks, mockPractices, mockCoaches } from '@/data/mock-data';

export default function CoachAnalyticsPage() {
  const currentCoach = mockCoaches[0];
  const myReps = mockReps.filter(rep => currentCoach.reps.includes(rep.id));
  const allTasks = mockTasks.filter(task => task.coachId === currentCoach.id);
  const allPractices = mockPractices.filter(p => 
    myReps.some(rep => rep.id === p.repId)
  );

  // 计算统计数据
  const totalPractices = allPractices.length;
  const avgScore = allPractices.length > 0
    ? Math.round(allPractices.reduce((sum, p) => sum + p.score, 0) / allPractices.length)
    : 0;
  const completedTasks = allTasks.filter(t => t.status === 'completed').length;
  const taskCompletionRate = allTasks.length > 0
    ? Math.round((completedTasks / allTasks.length) * 100)
    : 0;

  // 练习趋势数据（最近7天）
  const practiceTrendData = [
    { date: '11-11', practices: 8, avgScore: 82 },
    { date: '11-12', practices: 12, avgScore: 85 },
    { date: '11-13', practices: 10, avgScore: 83 },
    { date: '11-14', practices: 15, avgScore: 87 },
    { date: '11-15', practices: 18, avgScore: 88 },
    { date: '11-16', practices: 14, avgScore: 86 },
    { date: '11-17', practices: 20, avgScore: 90 },
  ];

  // 练习类型分布
  const practiceTypeData = [
    { name: '电话沟通', value: 35, color: '#3b82f6' },
    { name: '上门勘查', value: 25, color: '#10b981' },
    { name: '报价谈判', value: 30, color: '#8b5cf6' },
    { name: '异议处理', value: 10, color: '#f59e0b' },
  ];

  // 管家绩效对比
  const repPerformanceData = myReps.map(rep => {
    const practices = mockPractices.filter(p => p.repId === rep.id);
    const avgScore = practices.length > 0
      ? Math.round(practices.reduce((sum, p) => sum + p.score, 0) / practices.length)
      : 0;
    return {
      name: rep.name,
      practices: practices.length,
      avgScore,
      tasks: allTasks.filter(t => t.repId === rep.id).length,
    };
  });

  // 能力维度分析（团队平均）
  const skillsData = [
    { skill: '专业性', score: 85 },
    { skill: '沟通能力', score: 82 },
    { skill: '时间管理', score: 78 },
    { skill: '异议处理', score: 80 },
    { skill: '成交技巧', score: 83 },
  ];

  // KPI 关联数据
  const kpiCorrelationData = [
    { week: '第1周', practices: 15, successRate: 65, conversionRate: 45 },
    { week: '第2周', practices: 20, successRate: 70, conversionRate: 50 },
    { week: '第3周', practices: 25, successRate: 75, conversionRate: 55 },
    { week: '第4周', practices: 30, successRate: 78, conversionRate: 60 },
  ];

  // 教练互动数据
  const coachingActivityData = [
    { month: '8月', tasks: 12, feedback: 25, sessions: 8 },
    { month: '9月', tasks: 15, feedback: 30, sessions: 10 },
    { month: '10月', tasks: 18, feedback: 35, sessions: 12 },
    { month: '11月', tasks: 20, feedback: 40, sessions: 15 },
  ];

  // 弱项分布
  const weaknessData = [
    { weakness: '异议处理', count: 5 },
    { weakness: '时间管理', count: 4 },
    { weakness: '报价谈判', count: 3 },
    { weakness: '沟通能力', count: 2 },
    { weakness: '专业性', count: 1 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">团队分析</h1>
          <p className="text-gray-600 mt-1">深入了解团队表现和辅导效果</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            选择时间范围
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            导出报表
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              总练习次数
            </CardDescription>
            <CardTitle className="text-3xl">{totalPractices}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+25% 较上月</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              团队平均分
            </CardDescription>
            <CardTitle className="text-3xl">{avgScore}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+8 分较上月</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              辅导互动
            </CardDescription>
            <CardTitle className="text-3xl">{allTasks.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-blue-600">
              <span>本月任务数</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              任务完成率
            </CardDescription>
            <CardTitle className="text-3xl">{taskCompletionRate}%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+12% 较上月</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Different Views */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">总览</TabsTrigger>
          <TabsTrigger value="performance">绩效分析</TabsTrigger>
          <TabsTrigger value="coaching">辅导效果</TabsTrigger>
          <TabsTrigger value="skills">能力分析</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Practice Trend */}
            <Card>
              <CardHeader>
                <CardTitle>练习趋势</CardTitle>
                <CardDescription>最近7天的练习次数和平均得分</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={practiceTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="practices"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      name="练习次数"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="avgScore"
                      stroke="#10b981"
                      strokeWidth={2}
                      name="平均得分"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Practice Type Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>练习类型分布</CardTitle>
                <CardDescription>各类型练习的占比情况</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={practiceTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {practiceTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Rep Performance Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>管家绩效对比</CardTitle>
                <CardDescription>各管家的练习次数和平均得分</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={repPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="practices" fill="#3b82f6" name="练习次数" />
                    <Bar dataKey="avgScore" fill="#10b981" name="平均得分" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Weakness Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>团队弱项分布</CardTitle>
                <CardDescription>需要重点改进的能力领域</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weaknessData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="weakness" type="category" width={100} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#f59e0b" name="人数" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* KPI Correlation */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>练习与业务指标关联分析</CardTitle>
                <CardDescription>练习次数与上门成功率、报价转化率的关系</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={kpiCorrelationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="practices"
                      stackId="1"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.6}
                      name="练习次数"
                    />
                    <Area
                      type="monotone"
                      dataKey="successRate"
                      stackId="2"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.6}
                      name="上门成功率(%)"
                    />
                    <Area
                      type="monotone"
                      dataKey="conversionRate"
                      stackId="3"
                      stroke="#8b5cf6"
                      fill="#8b5cf6"
                      fillOpacity={0.6}
                      name="报价转化率(%)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Individual Rep Performance */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>管家个人绩效详情</CardTitle>
                <CardDescription>每位管家的详细表现数据</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {repPerformanceData.map((rep, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={getRealisticAvatarUrl(rep.name)} alt={rep.name} />
                            <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
                              {getInitials(rep.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{rep.name}</p>
                            <p className="text-sm text-gray-600">
                              {rep.practices} 次练习 · {rep.tasks} 个任务
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant={rep.avgScore >= 85 ? 'success' : rep.avgScore >= 70 ? 'default' : 'destructive'}
                        >
                          {rep.avgScore} 分
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">练习频率</p>
                          <p className="font-medium">{Math.round(rep.practices / 4)} 次/周</p>
                        </div>
                        <div>
                          <p className="text-gray-600">任务完成</p>
                          <p className="font-medium">{Math.round((rep.tasks / allTasks.length) * 100)}%</p>
                        </div>
                        <div>
                          <p className="text-gray-600">进步趋势</p>
                          <div className="flex items-center gap-1 font-medium text-green-600">
                            <TrendingUp className="h-4 w-4" />
                            <span>上升</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Coaching Tab */}
        <TabsContent value="coaching" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Coaching Activity Trend */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>辅导活动趋势</CardTitle>
                <CardDescription>任务布置、反馈次数和辅导会话的月度趋势</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={coachingActivityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="tasks"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      name="任务布置"
                    />
                    <Line
                      type="monotone"
                      dataKey="feedback"
                      stroke="#10b981"
                      strokeWidth={2}
                      name="反馈次数"
                    />
                    <Line
                      type="monotone"
                      dataKey="sessions"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      name="辅导会话"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Coaching ROI */}
            <Card>
              <CardHeader>
                <CardTitle>辅导投入产出比</CardTitle>
                <CardDescription>辅导活动与团队绩效提升的关系</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">辅导频率</span>
                    <span className="font-medium">15 次/月</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">团队平均分提升</span>
                    <span className="font-medium text-green-600">+8 分</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">任务完成率提升</span>
                    <span className="font-medium text-green-600">+12%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">练习参与度提升</span>
                    <span className="font-medium text-green-600">+25%</span>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-medium">辅导效果显著</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    持续的辅导活动显著提升了团队整体表现
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Coaching Impact */}
            <Card>
              <CardHeader>
                <CardTitle>辅导影响力分析</CardTitle>
                <CardDescription>不同辅导方式的效果对比</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">一对一辅导</span>
                      <Badge variant="success">高效</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">任务布置</span>
                      <Badge variant="default">有效</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">书面反馈</span>
                      <Badge variant="default">有效</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">团队分享</span>
                      <Badge variant="outline">一般</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gray-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Skills Tab */}
        <TabsContent value="skills" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Team Skills Radar */}
            <Card>
              <CardHeader>
                <CardTitle>团队能力雷达图</CardTitle>
                <CardDescription>团队在各维度的平均能力水平</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <RadarChart data={skillsData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="skill" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar
                      name="团队平均"
                      dataKey="score"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.6}
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Skills Improvement */}
            <Card>
              <CardHeader>
                <CardTitle>能力提升趋势</CardTitle>
                <CardDescription>各维度能力的月度提升情况</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skillsData.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{skill.skill}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">{skill.score}/100</span>
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${skill.score}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skill Development Recommendations */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>能力发展建议</CardTitle>
                <CardDescription>基于数据分析的针对性改进建议</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4 bg-orange-50 border-orange-200">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-orange-900">时间管理需加强</h4>
                        <p className="text-sm text-orange-700 mt-1">
                          团队在时间管理维度得分较低（78分），建议增加相关练习
                        </p>
                        <Button size="sm" variant="outline" className="mt-2">
                          布置时间管理任务
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 bg-blue-50 border-blue-200">
                    <div className="flex items-start gap-3">
                      <Target className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-900">异议处理待提升</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          异议处理能力有提升空间（80分），可安排专项训练
                        </p>
                        <Button size="sm" variant="outline" className="mt-2">
                          查看训练方案
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 bg-green-50 border-green-200">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-green-900">专业性表现优秀</h4>
                        <p className="text-sm text-green-700 mt-1">
                          团队专业性维度表现突出（85分），继续保持
                        </p>
                        <Button size="sm" variant="outline" className="mt-2">
                          分享最佳实践
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 bg-purple-50 border-purple-200">
                    <div className="flex items-start gap-3">
                      <Award className="h-5 w-5 text-purple-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-purple-900">成交技巧稳步提升</h4>
                        <p className="text-sm text-purple-700 mt-1">
                          成交技巧持续进步（83分），建议继续强化
                        </p>
                        <Button size="sm" variant="outline" className="mt-2">
                          安排进阶训练
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
