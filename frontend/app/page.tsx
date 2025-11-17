import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Phone, Home as HomeIcon, DollarSign, TrendingUp } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">欢迎回来，张伟！</h1>
        <p className="text-gray-600 mt-1">继续你的学习之旅，提升销售技能</p>
      </div>

      {/* Today's Tasks */}
      <Card>
        <CardHeader>
          <CardTitle>今日任务</CardTitle>
          <CardDescription>完成这些任务以提升你的技能</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Phone className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">电话模拟练习</p>
                <p className="text-sm text-gray-600">练习首次电话沟通技巧</p>
              </div>
            </div>
            <Button size="sm">
              开始练习 <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                <HomeIcon className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium">上门勘查模拟</p>
                <p className="text-sm text-gray-600">练习现场勘查沟通</p>
              </div>
            </div>
            <Button size="sm" variant="outline">
              开始练习 <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium">报价谈判练习</p>
                <p className="text-sm text-gray-600">提升议价和异议处理能力</p>
              </div>
            </div>
            <Button size="sm" variant="outline">
              开始练习 <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* KPI Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>本周练习次数</CardDescription>
            <CardTitle className="text-3xl">12</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+20% 较上周</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>平均得分</CardDescription>
            <CardTitle className="text-3xl">85</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+5 分较上周</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>上门成功率</CardDescription>
            <CardTitle className="text-3xl">78%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+8% 较上月</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>报价转化率</CardDescription>
            <CardTitle className="text-3xl">65%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+12% 较上月</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>快速入口</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-24 flex flex-col gap-2">
              <Phone className="h-6 w-6" />
              <span>电话练习</span>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col gap-2">
              <HomeIcon className="h-6 w-6" />
              <span>上门模拟</span>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col gap-2">
              <DollarSign className="h-6 w-6" />
              <span>报价练习</span>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col gap-2">
              <HomeIcon className="h-6 w-6" />
              <span>查看内容库</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
