import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { getRealisticAvatarUrl, getInitials } from '@/lib/avatar';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import {
  Users,
  TrendingUp,
  TrendingDown,
  Award,
  AlertCircle,
  CheckCircle,
  Clock,
  Target,
} from 'lucide-react';

// 模拟教练的管家数据
const reps = [
  {
    id: 'rep-1',
    name: '张伟',
    avatar: '',
    status: 'active',
    joinDate: '2024-01-15',
    practiceCount: 45,
    averageScore: 85,
    weeklyPractices: 12,
    trend: 'up',
    weaknesses: ['异议处理', '时间管理'],
    strengths: ['专业性', '沟通能力'],
    lastPractice: '2024-11-17',
    pendingTasks: 2,
  },
  {
    id: 'rep-2',
    name: '李娜',
    avatar: '',
    status: 'active',
    joinDate: '2024-02-01',
    practiceCount: 38,
    averageScore: 78,
    weeklyPractices: 8,
    trend: 'up',
    weaknesses: ['报价谈判', '专业性'],
    strengths: ['沟通能力'],
    lastPractice: '2024-11-16',
    pendingTasks: 3,
  },
  {
    id: 'rep-3',
    name: '王强',
    avatar: '',
    status: 'active',
    joinDate: '2024-03-10',
    practiceCount: 25,
    averageScore: 72,
    weeklyPractices: 5,
    trend: 'down',
    weaknesses: ['沟通能力', '异议处理', '时间管理'],
    strengths: ['专业性'],
    lastPractice: '2024-11-14',
    pendingTasks: 5,
  },
];

export default function CoachRepsPage() {
  const totalReps = reps.length;
  const avgScore = Math.round(reps.reduce((sum, r) => sum + r.averageScore, 0) / totalReps);
  const activeReps = reps.filter(r => r.status === 'active').length;
  const needsAttention = reps.filter(r => r.averageScore < 75 || r.weeklyPractices < 6).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">管家管理</h1>
        <p className="text-gray-600 mt-1">查看和管理你的团队成员</p>
      </div>

      {/* Summary Stats */}
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
              <span>{activeReps} 人活跃</span>
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
              <span>+3 分较上月</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              本周练习
            </CardDescription>
            <CardTitle className="text-3xl">
              {reps.reduce((sum, r) => sum + r.weeklyPractices, 0)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-blue-600">
              <Clock className="h-4 w-4 mr-1" />
              <span>平均 {Math.round(reps.reduce((sum, r) => sum + r.weeklyPractices, 0) / totalReps)} 次/人</span>
            </div>
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
            <div className="flex items-center text-sm text-orange-600">
              <AlertCircle className="h-4 w-4 mr-1" />
              <span>表现待提升</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reps List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>团队成员</CardTitle>
              <CardDescription>查看每个管家的表现和需要改进的地方</CardDescription>
            </div>
            <Button>
              <Users className="h-4 w-4 mr-2" />
              添加成员
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reps.map((rep) => (
              <div
                key={rep.id}
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={getRealisticAvatarUrl(rep.name)} alt={rep.name} />
                      <AvatarFallback className="bg-primary/10 text-primary font-medium text-lg">
                        {getInitials(rep.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg">{rep.name}</h3>
                        <Badge variant={rep.status === 'active' ? 'success' : 'secondary'}>
                          {rep.status === 'active' ? '活跃' : '非活跃'}
                        </Badge>
                        {rep.trend === 'up' ? (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            进步中
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-orange-600 border-orange-600">
                            <TrendingDown className="h-3 w-3 mr-1" />
                            需关注
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <span>入职时间: {new Date(rep.joinDate).toLocaleDateString('zh-CN')}</span>
                        <span>最近练习: {new Date(rep.lastPractice).toLocaleDateString('zh-CN')}</span>
                        <span>待办任务: {rep.pendingTasks} 个</span>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-3">
                        <div>
                          <div className="text-xs text-gray-600 mb-1">总练习次数</div>
                          <div className="text-lg font-semibold">{rep.practiceCount}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-600 mb-1">平均得分</div>
                          <div className="text-lg font-semibold">{rep.averageScore}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-600 mb-1">本周练习</div>
                          <div className="text-lg font-semibold">{rep.weeklyPractices}</div>
                        </div>
                      </div>

                      {/* Progress */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                          <span>整体表现</span>
                          <span>{rep.averageScore}%</span>
                        </div>
                        <Progress value={rep.averageScore} />
                      </div>

                      {/* Strengths & Weaknesses */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs font-medium text-gray-700 mb-1">优势</div>
                          <div className="flex flex-wrap gap-1">
                            {rep.strengths.map((strength, idx) => (
                              <Badge key={idx} variant="success" className="text-xs">
                                {strength}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs font-medium text-gray-700 mb-1">待提升</div>
                          <div className="flex flex-wrap gap-1">
                            {rep.weaknesses.map((weakness, idx) => (
                              <Badge key={idx} variant="warning" className="text-xs">
                                {weakness}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    <Link href={`/coach/reps/${rep.id}`}>
                      <Button size="sm">查看详情</Button>
                    </Link>
                    <Button size="sm" variant="outline">
                      布置任务
                    </Button>
                    <Button size="sm" variant="ghost">
                      发送消息
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
