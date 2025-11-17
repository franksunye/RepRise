import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  User,
  Target,
} from 'lucide-react';

const tasks = [
  {
    id: 1,
    repId: 'rep-1',
    repName: '张伟',
    title: '电话模拟练习',
    description: '完成3次首次电话沟通练习，重点提升预约成功率',
    type: '电话沟通',
    dueDate: '2024-11-20',
    status: 'in-progress',
    priority: 'high',
    createdAt: '2024-11-15',
    progress: 2,
    total: 3,
  },
  {
    id: 2,
    repId: 'rep-1',
    repName: '张伟',
    title: '上门勘查模拟',
    description: '练习现场勘查沟通，提升专业形象',
    type: '上门勘查',
    dueDate: '2024-11-18',
    status: 'pending',
    priority: 'medium',
    createdAt: '2024-11-16',
    progress: 0,
    total: 2,
  },
  {
    id: 3,
    repId: 'rep-2',
    repName: '李娜',
    title: '报价谈判练习',
    description: '练习报价流程和异议处理技巧',
    type: '报价谈判',
    dueDate: '2024-11-22',
    status: 'pending',
    priority: 'high',
    createdAt: '2024-11-17',
    progress: 0,
    total: 3,
  },
  {
    id: 4,
    repId: 'rep-3',
    repName: '王强',
    title: '异议处理专项训练',
    description: '针对性练习各种客户异议的处理方法',
    type: '异议处理',
    dueDate: '2024-11-19',
    status: 'overdue',
    priority: 'high',
    createdAt: '2024-11-10',
    progress: 1,
    total: 5,
  },
];

export default function CoachTasksPage() {
  const totalTasks = tasks.length;
  const inProgress = tasks.filter(t => t.status === 'in-progress').length;
  const pending = tasks.filter(t => t.status === 'pending').length;
  const overdue = tasks.filter(t => t.status === 'overdue').length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">辅导任务</h1>
          <p className="text-gray-600 mt-1">管理和跟踪你布置的所有任务</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          新建任务
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              总任务数
            </CardDescription>
            <CardTitle className="text-3xl">{totalTasks}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-600">本月布置</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              进行中
            </CardDescription>
            <CardTitle className="text-3xl">{inProgress}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-blue-600">正在执行</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              待开始
            </CardDescription>
            <CardTitle className="text-3xl">{pending}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-600">等待执行</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              已逾期
            </CardDescription>
            <CardTitle className="text-3xl">{overdue}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-red-600">需要关注</div>
          </CardContent>
        </Card>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {/* In Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              进行中的任务
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {tasks
              .filter(t => t.status === 'in-progress')
              .map((task) => (
                <div key={task.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                          {task.repName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{task.title}</h4>
                          {task.priority === 'high' && (
                            <Badge variant="destructive" className="text-xs">
                              高优先级
                            </Badge>
                          )}
                          <Badge variant="outline" className="text-xs">
                            {task.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {task.repName}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            截止: {new Date(task.dueDate).toLocaleDateString('zh-CN')}
                          </span>
                          <span className="flex items-center gap-1">
                            <Target className="h-3 w-3" />
                            进度: {task.progress}/{task.total}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button size="sm" variant="outline">
                        查看详情
                      </Button>
                      <Button size="sm" variant="ghost">
                        编辑
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>

        {/* Pending */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-gray-600" />
              待开始的任务
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {tasks
              .filter(t => t.status === 'pending')
              .map((task) => (
                <div key={task.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                          {task.repName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{task.title}</h4>
                          {task.priority === 'high' && (
                            <Badge variant="destructive" className="text-xs">
                              高优先级
                            </Badge>
                          )}
                          <Badge variant="outline" className="text-xs">
                            {task.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {task.repName}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            截止: {new Date(task.dueDate).toLocaleDateString('zh-CN')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button size="sm" variant="outline">
                        查看详情
                      </Button>
                      <Button size="sm" variant="ghost">
                        编辑
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>

        {/* Overdue */}
        {overdue > 0 && (
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <AlertCircle className="h-5 w-5" />
                已逾期的任务
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {tasks
                .filter(t => t.status === 'overdue')
                .map((task) => (
                  <div key={task.id} className="border border-red-200 rounded-lg p-4 bg-red-50">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-red-100 text-red-600 font-medium">
                            {task.repName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{task.title}</h4>
                            <Badge variant="destructive" className="text-xs">
                              已逾期
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {task.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {task.repName}
                            </span>
                            <span className="flex items-center gap-1 text-red-600">
                              <Calendar className="h-3 w-3" />
                              截止: {new Date(task.dueDate).toLocaleDateString('zh-CN')}
                            </span>
                            <span className="flex items-center gap-1">
                              <Target className="h-3 w-3" />
                              进度: {task.progress}/{task.total}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button size="sm" variant="destructive">
                          提醒管家
                        </Button>
                        <Button size="sm" variant="outline">
                          调整截止日期
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
