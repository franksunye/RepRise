import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import {
  Phone,
  Home as HomeIcon,
  DollarSign,
  MessageCircle,
  Target,
  Clock,
  Award,
  TrendingUp,
} from 'lucide-react';

const practiceTypes = [
  {
    id: 'cold-call',
    title: '首次电话沟通',
    description: '练习如何在首次电话中建立信任并预约上门时间',
    icon: Phone,
    color: 'blue',
    difficulty: '初级',
    duration: '15-20分钟',
    scenarios: 3,
  },
  {
    id: 'follow-up',
    title: '电话跟进',
    description: '练习如何有效跟进客户，推进销售流程',
    icon: MessageCircle,
    color: 'indigo',
    difficulty: '中级',
    duration: '10-15分钟',
    scenarios: 2,
  },
  {
    id: 'on-site',
    title: '上门勘查对话',
    description: '练习现场勘查时的专业沟通和问题诊断',
    icon: HomeIcon,
    color: 'green',
    difficulty: '中级',
    duration: '20-25分钟',
    scenarios: 4,
  },
  {
    id: 'pricing',
    title: '报价谈判',
    description: '练习如何专业地给出报价并处理价格异议',
    icon: DollarSign,
    color: 'purple',
    difficulty: '高级',
    duration: '15-20分钟',
    scenarios: 3,
  },
  {
    id: 'objection',
    title: '异议处理',
    description: '练习处理各种客户异议和顾虑',
    icon: Target,
    color: 'orange',
    difficulty: '高级',
    duration: '10-15分钟',
    scenarios: 5,
  },
];

export default function PracticePage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">模拟练习</h1>
        <p className="text-gray-600 mt-1">选择一个练习类型，通过 AI 模拟提升你的销售技能</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>总练习次数</CardDescription>
            <CardTitle className="text-2xl">45</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>本月 +12</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>平均得分</CardDescription>
            <CardTitle className="text-2xl">85</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-green-600">
              <Award className="h-4 w-4 mr-1" />
              <span>优秀水平</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>本周练习</CardDescription>
            <CardTitle className="text-2xl">12</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-blue-600">
              <Clock className="h-4 w-4 mr-1" />
              <span>180 分钟</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>完成场景</CardDescription>
            <CardTitle className="text-2xl">17/20</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-purple-600">
              <Target className="h-4 w-4 mr-1" />
              <span>85% 完成率</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Practice Types */}
      <div>
        <h2 className="text-xl font-semibold mb-4">选择练习类型</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {practiceTypes.map((type) => {
            const Icon = type.icon;
            const difficultyColors = {
              '初级': 'success',
              '中级': 'default',
              '高级': 'warning',
            } as const;

            return (
              <Card key={type.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={`h-12 w-12 rounded-lg bg-${type.color}-100 flex items-center justify-center`}>
                      <Icon className={`h-6 w-6 text-${type.color}-600`} />
                    </div>
                    <Badge variant={difficultyColors[type.difficulty as keyof typeof difficultyColors]}>
                      {type.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="mt-4">{type.title}</CardTitle>
                  <CardDescription>{type.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{type.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="h-4 w-4" />
                      <span>{type.scenarios} 个场景</span>
                    </div>
                  </div>
                  <Link href={`/practice/${type.id}`}>
                    <Button className="w-full">开始练习</Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Practices */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>最近练习记录</CardTitle>
              <CardDescription>查看你的练习历史和成绩</CardDescription>
            </div>
            <Link href="/practice/history">
              <Button variant="outline">查看全部</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                title: '报价谈判练习',
                type: '报价谈判',
                date: '2024-11-17',
                score: 92,
                duration: 20,
              },
              {
                title: '上门勘查对话练习',
                type: '上门勘查',
                date: '2024-11-16',
                score: 78,
                duration: 25,
              },
              {
                title: '首次电话沟通练习',
                type: '电话沟通',
                date: '2024-11-15',
                score: 85,
                duration: 15,
              },
            ].map((practice, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{practice.title}</p>
                    <Badge variant="outline" className="text-xs">
                      {practice.type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                    <span>{practice.date}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {practice.duration} 分钟
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-2xl font-bold">{practice.score}</div>
                    <div className="text-xs text-gray-500">分</div>
                  </div>
                  <Button variant="ghost" size="sm">
                    查看详情
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
