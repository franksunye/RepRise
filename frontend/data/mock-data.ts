import { Rep, Coach, Practice, CoachingTask, PlaybookItem, KPIData, Notification, LearningPath, Course, UserCourseProgress, SkillScore, TrendDataPoint, PracticeTypeStats } from '@/types';

// 管家数据 (15名)
export const mockReps: Rep[] = [
  {
    id: 'rep-1',
    name: '张伟',
    avatar: '',
    role: 'rep',
    joinDate: '2024-01-15',
    email: 'zhangwei@example.com',
    phone: '13800000001',
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
    phone: '13800000002',
    status: 'active',
    coachId: 'coach-2',
  },
  {
    id: 'rep-3',
    name: '王强',
    avatar: '',
    role: 'rep',
    joinDate: '2024-03-10',
    email: 'wangqiang@example.com',
    phone: '13800000003',
    status: 'active',
    coachId: 'coach-1',
  },
  {
    id: 'rep-4',
    name: '刘芳',
    avatar: '',
    role: 'rep',
    joinDate: '2024-04-05',
    email: 'liufang@example.com',
    phone: '13800000004',
    status: 'active',
    coachId: 'coach-2',
  },
  {
    id: 'rep-5',
    name: '陈明',
    avatar: '',
    role: 'rep',
    joinDate: '2024-05-12',
    email: 'chenming@example.com',
    phone: '13800000005',
    status: 'active',
    coachId: 'coach-1',
  },
  {
    id: 'rep-6',
    name: '杨静',
    avatar: '',
    role: 'rep',
    joinDate: '2024-06-08',
    email: 'yangjing@example.com',
    phone: '13800000006',
    status: 'active',
    coachId: 'coach-2',
  },
  {
    id: 'rep-7',
    name: '赵磊',
    avatar: '',
    role: 'rep',
    joinDate: '2024-07-15',
    email: 'zhaolei@example.com',
    phone: '13800000007',
    status: 'active',
    coachId: 'coach-1',
  },
  {
    id: 'rep-8',
    name: '周敏',
    avatar: '',
    role: 'rep',
    joinDate: '2024-08-20',
    email: 'zhoumin@example.com',
    phone: '13800000008',
    status: 'active',
    coachId: 'coach-2',
  },
  {
    id: 'rep-9',
    name: '吴刚',
    avatar: '',
    role: 'rep',
    joinDate: '2024-09-05',
    email: 'wugang@example.com',
    phone: '13800000009',
    status: 'active',
    coachId: 'coach-1',
  },
  {
    id: 'rep-10',
    name: '徐丽',
    avatar: '',
    role: 'rep',
    joinDate: '2024-09-18',
    email: 'xuli@example.com',
    phone: '13800000010',
    status: 'active',
    coachId: 'coach-2',
  },
  {
    id: 'rep-11',
    name: '孙涛',
    avatar: '',
    role: 'rep',
    joinDate: '2024-10-02',
    email: 'suntao@example.com',
    phone: '13800000011',
    status: 'active',
    coachId: 'coach-1',
  },
  {
    id: 'rep-12',
    name: '马婷',
    avatar: '',
    role: 'rep',
    joinDate: '2024-10-15',
    email: 'mating@example.com',
    phone: '13800000012',
    status: 'active',
    coachId: 'coach-2',
  },
  {
    id: 'rep-13',
    name: '朱勇',
    avatar: '',
    role: 'rep',
    joinDate: '2024-10-28',
    email: 'zhuyong@example.com',
    phone: '13800000013',
    status: 'active',
    coachId: 'coach-1',
  },
  {
    id: 'rep-14',
    name: '胡艳',
    avatar: '',
    role: 'rep',
    joinDate: '2024-11-05',
    email: 'huyan@example.com',
    phone: '13800000014',
    status: 'active',
    coachId: 'coach-2',
  },
  {
    id: 'rep-15',
    name: '郭峰',
    avatar: '',
    role: 'rep',
    joinDate: '2024-11-12',
    email: 'guofeng@example.com',
    phone: '13800000015',
    status: 'active',
    coachId: 'coach-1',
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
    reps: ['rep-1', 'rep-3', 'rep-5', 'rep-7', 'rep-9', 'rep-11', 'rep-13', 'rep-15'],
  },
  {
    id: 'coach-2',
    name: '陈教练',
    avatar: '',
    role: 'coach',
    email: 'chencoach@example.com',
    phone: '13900139002',
    reps: ['rep-2', 'rep-4', 'rep-6', 'rep-8', 'rep-10', 'rep-12', 'rep-14'],
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


// 学习路径
export const mockLearningPaths: LearningPath[] = [
  {
    id: 'path-1',
    title: '新管家入职路径',
    description: '帮助新入职管家快速掌握防水维修服务的基础知识和销售技能',
    targetRole: 'rep' as const,
    courses: ['course-1', 'course-2', 'course-3', 'course-4'],
    estimatedDuration: 120,
  },
];

// 课程
export const mockCourses: Course[] = [
  {
    id: 'course-1',
    pathId: 'path-1',
    title: '漏水类型识别',
    description: '学习识别常见的漏水类型，为客户提供专业诊断',
    duration: 30,
    order: 1,
    objectives: [
      '了解常见漏水类型及其特征',
      '掌握漏水原因分析方法',
      '学会向客户解释漏水问题',
    ],
    keyPoints: [
      '屋顶漏水',
      '墙体渗水',
      '管道漏水',
      '地下室渗水',
    ],
    content: '# 漏水类型识别\n\n作为防水维修服务的管家，准确识别漏水类型是提供专业服务的第一步。\n\n## 1. 屋顶漏水\n特征：天花板出现水渍或霉斑，雨天或雨后漏水加重。\n\n## 2. 墙体渗水\n特征：墙面出现潮湿、发霉，墙纸脱落或起泡。\n\n## 3. 管道漏水\n特征：持续性漏水，与天气无关，水表持续走动。\n\n## 4. 地下室渗水\n特征：地下室墙面或地面潮湿，雨季或地下水位高时加重。',
  },
  {
    id: 'course-2',
    pathId: 'path-1',
    title: '维修流程介绍',
    description: '了解从接单到完工的完整服务流程',
    duration: 25,
    order: 2,
    objectives: [
      '掌握标准服务流程',
      '了解每个环节的关键要点',
      '学会向客户介绍服务流程',
    ],
    keyPoints: [
      '接单与预约',
      '上门勘查',
      '方案制定',
      '施工与验收',
    ],
    content: '# 维修流程介绍\n\n完整的服务流程包括：接单与预约、上门勘查、方案制定与报价、施工实施、验收与交付。\n\n每个环节都需要专业的态度和良好的沟通。',
  },
  {
    id: 'course-3',
    pathId: 'path-1',
    title: '报价基础知识',
    description: '掌握报价原则和技巧，提高成交率',
    duration: 35,
    order: 3,
    objectives: [
      '了解报价构成要素',
      '掌握报价沟通技巧',
      '学会处理价格异议',
    ],
    keyPoints: [
      '报价构成',
      '价值呈现',
      '异议处理',
      '成交技巧',
    ],
    content: '# 报价基础知识\n\n报价不仅是数字，更是价值沟通。\n\n## 报价构成\n包括材料成本、人工成本和其他成本。\n\n## 价值呈现\n强调解决方案的价值，而不仅仅是价格。',
  },
  {
    id: 'course-4',
    pathId: 'path-1',
    title: '客户沟通技巧',
    description: '提升沟通能力，建立客户信任',
    duration: 30,
    order: 4,
    objectives: [
      '掌握有效沟通技巧',
      '学会倾听和提问',
      '建立客户信任关系',
    ],
    keyPoints: [
      '倾听技巧',
      '提问技巧',
      '同理心沟通',
      '信任建立',
    ],
    content: '# 客户沟通技巧\n\n优秀的沟通能力是成功的关键。\n\n## 倾听技巧\n全神贯注，积极回应，确认理解。\n\n## 提问技巧\n使用开放式和封闭式提问，引导客户表达需求。',
  },
];

// 用户学习进度
export const mockUserProgress: UserCourseProgress[] = [
  {
    userId: 'rep-1',
    courseId: 'course-1',
    status: 'completed' as const,
    progress: 100,
    startedAt: '2024-11-10T09:00:00',
    completedAt: '2024-11-10T09:35:00',
    lastAccessedAt: '2024-11-10T09:35:00',
  },
  {
    userId: 'rep-1',
    courseId: 'course-2',
    status: 'completed' as const,
    progress: 100,
    startedAt: '2024-11-11T10:00:00',
    completedAt: '2024-11-11T10:30:00',
    lastAccessedAt: '2024-11-11T10:30:00',
  },
  {
    userId: 'rep-1',
    courseId: 'course-3',
    status: 'in-progress' as const,
    progress: 60,
    startedAt: '2024-11-12T14:00:00',
    lastAccessedAt: '2024-11-15T16:20:00',
  },
  {
    userId: 'rep-1',
    courseId: 'course-4',
    status: 'not-started' as const,
    progress: 0,
  },
];

// 获取学习路径
export const getLearningPath = (pathId: string) =>
  mockLearningPaths.find(p => p.id === pathId);

// 获取课程
export const getCourse = (courseId: string) =>
  mockCourses.find(c => c.id === courseId);

// 获取用户在某个课程的进度
export const getUserCourseProgress = (userId: string, courseId: string) =>
  mockUserProgress.find(p => p.userId === userId && p.courseId === courseId) || {
    userId,
    courseId,
    status: 'not-started' as const,
    progress: 0,
  };

// 获取用户在学习路径中的总进度
export const getUserPathProgress = (userId: string, pathId: string) => {
  const path = getLearningPath(pathId);
  if (!path) return 0;
  
  const courseProgresses = path.courses.map(courseId => 
    getUserCourseProgress(userId, courseId).progress
  );
  
  return Math.round(
    courseProgresses.reduce((sum, progress) => sum + progress, 0) / path.courses.length
  );
};

// 技能评分数据
export const mockSkillScores: SkillScore[] = [
  {
    repId: 'rep-1',
    professionalism: 88,
    communication: 85,
    timeManagement: 78,
    objectionHandling: 82,
    closingSkill: 80,
  },
  {
    repId: 'rep-2',
    professionalism: 92,
    communication: 90,
    timeManagement: 85,
    objectionHandling: 88,
    closingSkill: 86,
  },
];

// 练习次数趋势（最近7天）
export const mockPracticeTrend: Record<string, TrendDataPoint[]> = {
  'rep-1': [
    { date: '11-11', value: 2 },
    { date: '11-12', value: 3 },
    { date: '11-13', value: 1 },
    { date: '11-14', value: 4 },
    { date: '11-15', value: 2 },
    { date: '11-16', value: 3 },
    { date: '11-17', value: 2 },
  ],
};

// 得分趋势（最近7天）
export const mockScoreTrend: Record<string, TrendDataPoint[]> = {
  'rep-1': [
    { date: '11-11', value: 82 },
    { date: '11-12', value: 85 },
    { date: '11-13', value: 83 },
    { date: '11-14', value: 87 },
    { date: '11-15', value: 84 },
    { date: '11-16', value: 86 },
    { date: '11-17', value: 88 },
  ],
};

// 练习类型统计
export const mockPracticeTypeStats: Record<string, PracticeTypeStats[]> = {
  'rep-1': [
    { type: '电话沟通', count: 15, averageScore: 85 },
    { type: '上门勘查', count: 12, averageScore: 82 },
    { type: '报价谈判', count: 10, averageScore: 80 },
    { type: '异议处理', count: 8, averageScore: 78 },
  ],
};

// 获取用户技能评分
export const getUserSkillScore = (userId: string) =>
  mockSkillScores.find(s => s.repId === userId);

// 获取用户练习趋势
export const getUserPracticeTrend = (userId: string) =>
  mockPracticeTrend[userId] || [];

// 获取用户得分趋势
export const getUserScoreTrend = (userId: string) =>
  mockScoreTrend[userId] || [];

// 获取用户练习类型统计
export const getUserPracticeTypeStats = (userId: string) =>
  mockPracticeTypeStats[userId] || [];

// Coaching Signals
export const mockCoachingSignals = [
  { id: 'sig-1', repId: 'rep-1', type: 'objection', snippet: 'Your price is much higher than others...', timestamp: '2024-11-17T10:30:00Z' },
  { id: 'sig-2', repId: 'rep-2', type: 'no_next_step', snippet: 'Okay, I will think about it and let you know.', timestamp: '2024-11-17T11:15:00Z' },
  { id: 'sig-3', repId: 'rep-3', type: 'engagement', snippet: 'The customer seemed distracted and uninterested during the call.', timestamp: '2024-11-16T14:45:00Z' },
  { id: 'sig-4', repId: 'rep-1', type: 'no_next_step', snippet: 'Just send me the proposal, I will check it later.', timestamp: '2024-11-16T16:00:00Z' },
];

// Coaching Feedback
export const mockFeedback = [
  { id: 'fb-1', repId: 'rep-1', coachId: 'coach-1', summary: 'Great job handling the price objection. Try to focus more on value next time.', timestamp: '2024-11-17T12:00:00Z' },
  { id: 'fb-2', repId: 'rep-2', coachId: 'coach-2', summary: 'Good rapport building, but remember to always establish a clear next step.', timestamp: '2024-11-17T11:30:00Z' },
  { id: 'fb-3', repId: 'rep-3', coachId: 'coach-1', summary: 'Need to work on asking more engaging questions to keep the customer interested.', timestamp: '2024-11-16T15:00:00Z' },
];
