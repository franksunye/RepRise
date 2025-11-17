import { Rep, Coach, Practice, CoachingTask, PlaybookItem, KPIData, Notification } from '@/types';

// 管家数据
export const mockReps: Rep[] = [
  {
    id: 'rep-1',
    name: '张伟',
    avatar: '',
    role: 'rep',
    joinDate: '2024-01-15',
    email: 'zhangwei@example.com',
    phone: '13800138001',
    status: 'active',
    coachId: 'coach-1',
  },
  {
    id: 'rep-2',
    name: '李娜',
    avatar: '',
    role: 'rep',
    joinDate: '2024-02-01',
    email: 'lina@example.com',
    phone: '13800138002',
    status: 'active',
    coachId: 'coach-1',
  },
  {
    id: 'rep-3',
    name: '王强',
    avatar: '',
    role: 'rep',
    joinDate: '2024-03-10',
    email: 'wangqiang@example.com',
    phone: '13800138003',
    status: 'active',
    coachId: 'coach-2',
  },
];

// 教练数据
export const mockCoaches: Coach[] = [
  {
    id: 'coach-1',
    name: '刘教练',
    avatar: '',
    role: 'coach',
    email: 'liucoach@example.com',
    phone: '13900139001',
    reps: ['rep-1', 'rep-2'],
  },
  {
    id: 'coach-2',
    name: '陈教练',
    avatar: '',
    role: 'coach',
    email: 'chencoach@example.com',
    phone: '13900139002',
    reps: ['rep-3'],
  },
];

// 练习记录
export const mockPractices: Practice[] = [
  {
    id: 'practice-1',
    repId: 'rep-1',
    type: 'cold-call',
    title: '首次电话沟通练习',
    description: '练习如何在首次电话中建立信任并预约上门时间',
    date: '2024-11-15T10:30:00',
    duration: 15,
    score: 85,
    feedback: '表现不错！语速适中，能够清晰表达服务内容。建议在处理客户疑虑时更加耐心。',
    coachFeedback: '张伟在这次练习中展现了良好的沟通技巧，继续保持！',
    reflection: '这次练习让我意识到倾听的重要性，下次要更多地让客户表达需求。',
    status: 'completed',
    scores: {
      professionalism: 88,
      communication: 85,
      timeManagement: 82,
      objectionHandling: 84,
    },
  },
  {
    id: 'practice-2',
    repId: 'rep-1',
    type: 'on-site',
    title: '上门勘查对话练习',
    description: '练习现场勘查时的专业沟通和问题诊断',
    date: '2024-11-16T14:00:00',
    duration: 25,
    score: 78,
    feedback: '勘查流程基本正确，但在解释技术问题时可以更通俗易懂。',
    status: 'completed',
    scores: {
      professionalism: 80,
      communication: 75,
      timeManagement: 78,
      objectionHandling: 79,
    },
  },
  {
    id: 'practice-3',
    repId: 'rep-1',
    type: 'pricing',
    title: '报价谈判练习',
    description: '练习如何专业地给出报价并处理价格异议',
    date: '2024-11-17T09:00:00',
    duration: 20,
    score: 92,
    feedback: '优秀！能够清晰解释价格构成，并有效处理客户的价格顾虑。',
    coachFeedback: '这次报价练习非常出色，展现了专业的谈判技巧！',
    status: 'completed',
    scores: {
      professionalism: 90,
      communication: 92,
      timeManagement: 93,
      objectionHandling: 94,
    },
  },
];

// 辅导任务
export const mockTasks: CoachingTask[] = [
  {
    id: 'task-1',
    repId: 'rep-1',
    coachId: 'coach-1',
    title: '电话模拟练习',
    description: '完成3次首次电话沟通练习，重点提升预约成功率',
    type: 'cold-call',
    dueDate: '2024-11-20',
    status: 'in-progress',
    priority: 'high',
    createdAt: '2024-11-15T08:00:00',
  },
  {
    id: 'task-2',
    repId: 'rep-1',
    coachId: 'coach-1',
    title: '上门勘查模拟',
    description: '练习现场勘查沟通，提升专业形象',
    type: 'on-site',
    dueDate: '2024-11-18',
    status: 'pending',
    priority: 'medium',
    createdAt: '2024-11-16T10:00:00',
  },
  {
    id: 'task-3',
    repId: 'rep-1',
    coachId: 'coach-1',
    title: '报价谈判练习',
    description: '练习报价流程和异议处理技巧',
    type: 'pricing',
    dueDate: '2024-11-22',
    status: 'pending',
    priority: 'high',
    createdAt: '2024-11-17T09:00:00',
  },
];

// 内容库
export const mockPlaybooks: PlaybookItem[] = [
  {
    id: 'playbook-1',
    title: '首次电话沟通话术',
    category: 'script',
    content: `
# 首次电话沟通话术

## 开场白
您好，我是XX防水维修的管家[姓名]。请问您是[客户姓名]吗？

## 确认需求
了解到您家里有漏水问题，方便简单描述一下具体情况吗？

## 预约上门
根据您描述的情况，我建议安排专业勘查。我们提供免费上门勘查服务...
    `,
    version: '1.2.0',
    author: '刘教练',
    lastUpdated: '2024-11-10',
    tags: ['电话', '首次沟通', '预约'],
    downloads: 156,
  },
  {
    id: 'playbook-2',
    title: '上门勘查检查清单',
    category: 'checklist',
    content: `
# 上门勘查检查清单

## 准备工作
- [ ] 工具包准备齐全
- [ ] 客户信息确认
- [ ] 预约时间确认

## 现场勘查
- [ ] 漏水位置确认
- [ ] 漏水原因分析
- [ ] 拍照记录
- [ ] 测量尺寸
    `,
    version: '2.0.0',
    author: '陈教练',
    lastUpdated: '2024-11-12',
    tags: ['勘查', '检查清单', '现场'],
    downloads: 203,
  },
];

// KPI 数据
export const mockKPIData: KPIData[] = [
  {
    repId: 'rep-1',
    period: 'week',
    practiceCount: 12,
    averageScore: 85,
    onSiteSuccessRate: 78,
    pricingConversionRate: 65,
    dealCloseRate: 58,
  },
  {
    repId: 'rep-1',
    period: 'month',
    practiceCount: 45,
    averageScore: 82,
    onSiteSuccessRate: 72,
    pricingConversionRate: 60,
    dealCloseRate: 55,
  },
];

// 通知
export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    userId: 'rep-1',
    type: 'task',
    title: '新任务分配',
    message: '刘教练为您分配了新的练习任务：电话模拟练习',
    read: false,
    createdAt: '2024-11-17T08:00:00',
    link: '/tasks/task-1',
  },
  {
    id: 'notif-2',
    userId: 'rep-1',
    type: 'feedback',
    title: '收到新反馈',
    message: '刘教练对您的报价谈判练习给出了反馈',
    read: false,
    createdAt: '2024-11-17T10:30:00',
    link: '/practice/practice-3',
  },
  {
    id: 'notif-3',
    userId: 'rep-1',
    type: 'reminder',
    title: '任务提醒',
    message: '您有一个任务即将到期：上门勘查模拟（11月18日）',
    read: false,
    createdAt: '2024-11-17T09:00:00',
    link: '/tasks/task-2',
  },
];

// 获取当前用户（模拟）
export const getCurrentUser = () => mockReps[0];

// 获取用户的练习记录
export const getUserPractices = (userId: string) => 
  mockPractices.filter(p => p.repId === userId);

// 获取用户的任务
export const getUserTasks = (userId: string) => 
  mockTasks.filter(t => t.repId === userId);

// 获取用户的 KPI 数据
export const getUserKPI = (userId: string, period: string) => 
  mockKPIData.find(k => k.repId === userId && k.period === period);

// 获取用户的通知
export const getUserNotifications = (userId: string) => 
  mockNotifications.filter(n => n.userId === userId);
