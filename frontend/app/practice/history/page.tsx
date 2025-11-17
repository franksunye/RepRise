import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import {
  ArrowLeft,
  Phone,
  Home as HomeIcon,
  DollarSign,
  Clock,
  Calendar,
  TrendingUp,
  Award,
} from 'lucide-react';
import { getUserPractices, getCurrentUser } from '@/data/mock-data';

export default function PracticeHistoryPage() {
  const currentUser = getCurrentUser();
  const practices = getUserPractices(currentUser.id);

  const getTypeIcon = (type: string) => {
    const icons = {
      'cold-call': Phone,
      'follow-up': Phone,
      'on-site': HomeIcon,
      'pricing': DollarSign,
      'objection': DollarSign,
    };
    return icons[type as keyof typeof icons] || Phone;
  };

  const getTypeName = (type: string) => {
    const names = {
      'cold-call': '电话沟通',
      'follow-up': '电话跟进',
      'on-site': '上门勘查',
      'pricing': '报价谈判',
      'objection': '异议处理',
    };
    return names[type as keyof typeof names] || type;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/practice">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">练习历史记录</h1>
          <p className="text-gray-600 mt-1">查看你的所有练习记录和成绩</p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>总练习次数</CardDescription>
            <CardTitle className="text-2xl">{practices.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-blue-600">
              <Calendar className="h-4 w-4 mr-1" />
              <span>最近30天</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>平均得分</CardDescription>
            <CardTitle className="text-2xl">
              {Math.round(practices.reduce((sum, p) => sum + p.score, 0) / practices.length)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>优秀水平</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>总练习时长</CardDescription>
            <CardTitle className="text-2xl">
              {practices.reduce((sum, p) => sum + p.duration, 0)} 分钟
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-purple-600">
              <Clock className="h-4 w-4 mr-1" />
              <span>约 {Math.round(practices.reduce((sum, p) => sum + p.duration, 0) / 60)} 小时</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>最高得分</CardDescription>
            <CardTitle className="text-2xl">
              {Math.max(...practices.map(p => p.score))}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-yellow-600">
              <Award className="h-4 w-4 mr-1" />
              <span>报价谈判</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Practice List */}
      <Card>
        <CardHeader>
          <CardTitle>所有练习记录</CardTitle>
          <CardDescription>按时间倒序排列</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {practices.map((practice) => {
              const Icon = getTypeIcon(practice.type);
              return (
                <div
                  key={practice.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-gray-900">{practice.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {getTypeName(practice.type)}
                          </Badge>
                          {practice.status === 'completed' && (
                            <Badge variant="success" className="text-xs">
                              已完成
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{practice.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(practice.date).toLocaleDateString('zh-CN')}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {practice.duration} 分钟
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 ml-4">
                      <div className="text-right">
                        <div className="text-3xl font-bold text-gray-900">{practice.score}</div>
                        <div className="text-xs text-gray-500">总分</div>
                      </div>
                    </div>
                  </div>

                  {/* Score Breakdown */}
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                        <span>专业性</span>
                        <span className="font-medium">{practice.scores.professionalism}</span>
                      </div>
                      <Progress value={practice.scores.professionalism} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                        <span>沟通能力</span>
                        <span className="font-medium">{practice.scores.communication}</span>
                      </div>
                      <Progress value={practice.scores.communication} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                        <span>时间管理</span>
                        <span className="font-medium">{practice.scores.timeManagement}</span>
                      </div>
                      <Progress value={practice.scores.timeManagement} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                        <span>异议处理</span>
                        <span className="font-medium">{practice.scores.objectionHandling}</span>
                      </div>
                      <Progress value={practice.scores.objectionHandling} className="h-2" />
                    </div>
                  </div>

                  {/* Feedback */}
                  {practice.feedback && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-900 mb-1">系统反馈</p>
                      <p className="text-sm text-blue-700">{practice.feedback}</p>
                    </div>
                  )}

                  {practice.coachFeedback && (
                    <div className="mt-2 p-3 bg-green-50 rounded-lg">
                      <p className="text-sm font-medium text-green-900 mb-1">教练反馈</p>
                      <p className="text-sm text-green-700">{practice.coachFeedback}</p>
                    </div>
                  )}

                  {practice.reflection && (
                    <div className="mt-2 p-3 bg-purple-50 rounded-lg">
                      <p className="text-sm font-medium text-purple-900 mb-1">我的反思</p>
                      <p className="text-sm text-purple-700">{practice.reflection}</p>
                    </div>
                  )}

                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm">
                      查看详情
                    </Button>
                    <Button variant="ghost" size="sm">
                      重新练习
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
