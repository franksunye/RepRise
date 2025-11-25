import { Rep, Coach, Practice, CoachingTask, PlaybookItem, KPIData, Notification, LearningPath, Course, UserCourseProgress, SkillScore, TrendDataPoint, PracticeTypeStats, Feedback, ActionItem, RolePlaySession, TranscriptEntry, Note, FlaggedSegment, CallRecord, CallTranscriptEntry, CallSignal, BehaviorMetrics } from '@/types';

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
    relatedSignalIds: ['sig-1', 'sig-4'],
    relatedFeedbackIds: ['feedback-1'],
    relatedActionItemIds: ['action-item-1', 'action-item-2'],
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
    relatedFeedbackIds: ['feedback-2'],
    relatedActionItemIds: ['action-item-3'],
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
    relatedSignalIds: ['sig-1'],
    relatedFeedbackIds: ['feedback-3'],
    relatedActionItemIds: ['action-item-4'],
  },
  {
    id: 'task-4',
    repId: 'rep-3',
    coachId: 'coach-1',
    title: '异议处理专项训练',
    description: '针对性练习各种客户异议的处理方法',
    type: 'objection',
    dueDate: '2024-11-19',
    status: 'pending',
    priority: 'high',
    createdAt: '2024-11-10T08:00:00',
    relatedSignalIds: ['sig-1', 'sig-2'],
    relatedFeedbackIds: ['feedback-4'],
    relatedActionItemIds: ['action-item-5', 'action-item-6'],
  },
  {
    id: 'task-5',
    repId: 'rep-5',
    coachId: 'coach-1',
    title: '跟进电话技巧',
    description: '学习如何有效跟进潜在客户',
    type: 'follow-up',
    dueDate: '2024-11-25',
    status: 'in-progress',
    priority: 'medium',
    createdAt: '2024-11-14T10:00:00',
    relatedFeedbackIds: ['feedback-7'],
    relatedActionItemIds: ['action-item-9'],
  },
  {
    id: 'task-6',
    repId: 'rep-7',
    coachId: 'coach-1',
    title: '成交技巧演练',
    description: '练习如何在合适的时机成交',
    type: 'cold-call',
    dueDate: '2024-11-23',
    status: 'pending',
    priority: 'medium',
    createdAt: '2024-11-16T14:00:00',
    relatedFeedbackIds: ['feedback-9'],
    relatedActionItemIds: ['action-item-10', 'action-item-11'],
  },
  {
    id: 'task-7',
    repId: 'rep-9',
    coachId: 'coach-1',
    title: '客户需求分析',
    description: '学习如何深入分析客户需求',
    type: 'on-site',
    dueDate: '2024-11-21',
    status: 'in-progress',
    priority: 'high',
    createdAt: '2024-11-12T09:00:00',
    relatedFeedbackIds: ['feedback-5'],
    relatedActionItemIds: ['action-item-7', 'action-item-8'],
  },
  {
    id: 'task-8',
    repId: 'rep-11',
    coachId: 'coach-1',
    title: '价值销售方法论',
    description: '掌握价值销售的核心方法',
    type: 'pricing',
    dueDate: '2024-11-24',
    status: 'pending',
    priority: 'medium',
    createdAt: '2024-11-13T11:00:00',
    relatedFeedbackIds: ['feedback-6'],
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
  { id: 'sig-1', repId: 'rep-1', type: 'objection', snippet: '你们的价格比其他公司高太多了...', timestamp: '2024-11-17T10:30:00Z' },
  { id: 'sig-2', repId: 'rep-2', type: 'no_next_step', snippet: '好的，我再想想，到时候会联系你。', timestamp: '2024-11-17T11:15:00Z' },
  { id: 'sig-3', repId: 'rep-3', type: 'engagement', snippet: '客户在通话中显得很分心，对我们的方案不太感兴趣。', timestamp: '2024-11-16T14:45:00Z' },
  { id: 'sig-4', repId: 'rep-1', type: 'no_next_step', snippet: '先把方案发给我，我先看看再说。', timestamp: '2024-11-16T16:00:00Z' },
];

// =================================================================
// START: Jules's additions for coach feedback feature
// =================================================================

// 教练反馈数据（统一的反馈系统）
export const mockFeedbacks: Feedback[] = [
  {
    id: 'feedback-1',
    source: 'Role-play',
    sourceId: 'practice-1',
    repId: 'rep-1',
    coachId: 'coach-1',
    timestamp: '2024-11-15T11:00:00',
    tags: ['异议处理', '提问技巧'],
    content: '在处理客户关于价格的异议时，你的回答非常专业，能够清晰地解释价值所在。在提问方面，可以尝试使用更多开放式问题来引导客户说出更深层次的需求。',
    score: 4,
    version: '1.0',
  },
  {
    id: 'feedback-2',
    source: 'Live Call',
    sourceId: 'live-call-xyz',
    repId: 'rep-2',
    coachId: 'coach-2',
    timestamp: '2024-11-16T15:30:00',
    tags: ['勘查技巧', '沟通能力'],
    content: '现场勘查流程很规范，能够主动发现问题。但在与客户沟通维修方案时，可以更自信一些，用更肯定的语气给出建议。',
    score: 5,
  },
  {
    id: 'feedback-3',
    source: 'Role-play',
    sourceId: 'practice-3',
    repId: 'rep-1',
    coachId: 'coach-1',
    timestamp: '2024-11-17T09:45:00',
    tags: ['关闭能力', '报价谈判'],
    content: '这次的报价谈判练习非常成功！你成功地营造了紧迫感，并最终引导客户做出了决定。下次可以尝试在报价前做更多的价值铺垫。',
    version: '2.1',
  },
  {
    id: 'feedback-4',
    source: 'Live Call',
    sourceId: 'call-20241114-001',
    repId: 'rep-3',
    coachId: 'coach-1',
    timestamp: '2024-11-14T14:20:00',
    tags: ['电话技巧', '异议处理', '成交'],
    content: '在这次电话中，你展现了很好的节奏控制，但在处理客户"价格太高"的异议时可以更有策略性。建议尝试价值对标法或分期付款方案来降低客户心理障碍。总体表现不错！',
    score: 3,
    version: '1.0',
  },
  {
    id: 'feedback-5',
    source: 'Role-play',
    sourceId: 'practice-5',
    repId: 'rep-4',
    coachId: 'coach-2',
    timestamp: '2024-11-13T10:15:00',
    tags: ['倾听技巧', '需求发现'],
    content: '你在这次角色扮演中展现了很好的倾听能力，能够深入挖掘客户的真实需求。但在给出解决方案时略显被动，建议更主动地提出 2-3 个选项让客户选择。',
    score: 4,
    version: '1.0',
  },
  {
    id: 'feedback-6',
    source: 'Live Call',
    sourceId: 'call-20241112-002',
    repId: 'rep-5',
    coachId: 'coach-1',
    timestamp: '2024-11-12T16:45:00',
    tags: ['专业形象', '信任建立'],
    content: '李娜在这次通话中表现专业，客户满意度很高。特别是在建立信任方面做得很好，能够清晰地解释我们的服务流程。继续保持这个势头！',
    score: 5,
    version: '1.0',
  },
  {
    id: 'feedback-7',
    source: 'Role-play',
    sourceId: 'practice-7',
    repId: 'rep-3',
    coachId: 'coach-1',
    timestamp: '2024-11-11T09:30:00',
    tags: ['时间管理', '跟进管理'],
    content: '这次练习中你在时间管理上有所进步，但跟进客户时应该建立更明确的下一步期望。例如，约定具体的回访时间和内容，而不是说"我会稍后联系你"。',
    score: 3,
    version: '1.1',
  },
  {
    id: 'feedback-8',
    source: 'Live Call',
    sourceId: 'call-20241110-003',
    repId: 'rep-6',
    coachId: 'coach-2',
    timestamp: '2024-11-10T13:00:00',
    tags: ['产品知识', '场景应用'],
    content: '你对我们的产品和服务了解充分，能够针对客户的具体情况提出有针对性的方案。只需要在压力处理上再多积累一些经验，当客户拒绝时不要过于被动。',
    score: 4,
    version: '1.0',
  },
  {
    id: 'feedback-9',
    source: 'Role-play',
    sourceId: 'practice-9',
    repId: 'rep-2',
    coachId: 'coach-2',
    timestamp: '2024-11-09T11:20:00',
    tags: ['关闭技巧', '成交意愿'],
    content: '在关闭方面，你有一定的进步。但在客户表现出购买意愿时，需要更坚定地促成交易，而不是继续询问。建议学习"假定成交法"和"选择性成交法"。',
    score: 3,
    version: '1.0',
  },
  {
    id: 'feedback-10',
    source: 'Live Call',
    sourceId: 'call-20241108-004',
    repId: 'rep-4',
    coachId: 'coach-2',
    timestamp: '2024-11-08T15:30:00',
    tags: ['客户沟通', '异议处理'],
    content: '你在这次通话中很好地处理了客户的多个异议，展现了冷静和专业的态度。客户最终同意了上门勘查，很好地推进了销售流程。继续发挥这样的水平！',
    score: 5,
    version: '1.0',
  },
];

// 行动建议数据
export const mockActionItems: ActionItem[] = [
  {
    id: 'action-item-1',
    feedbackId: 'feedback-1',
    repId: 'rep-1',
    description: '学习并练习三种不同的开放式提问技巧。',
    status: 'pending',
    dueDate: '2024-11-22',
  },
  {
    id: 'action-item-2',
    feedbackId: 'feedback-1',
    repId: 'rep-1',
    description: '完成一次关于“价值销售”的微课程学习。',
    status: 'in_progress',
    dueDate: '2024-11-25',
  },
  {
    id: 'action-item-3',
    feedbackId: 'feedback-2',
    repId: 'rep-2',
    description: '观看《如何自信地沟通》视频，并提交学习心得。',
    status: 'done',
    dueDate: '2024-11-20',
  },
    {
    id: 'action-item-4',
    feedbackId: 'feedback-3',
    repId: 'rep-1',
    description: '整理一套自己的价值铺垫话术，并与教练进行一次1对1演练。',
    status: 'pending',
    dueDate: '2024-11-24',
  },
  {
    id: 'action-item-5',
    feedbackId: 'feedback-4',
    repId: 'rep-3',
    description: '学习"价值对标法"和"分期付款方案"的销售话术。',
    status: 'pending',
    dueDate: '2024-11-26',
  },
  {
    id: 'action-item-6',
    feedbackId: 'feedback-4',
    repId: 'rep-3',
    description: '进行2次以上关于异议处理的角色扮演练习。',
    status: 'in_progress',
    dueDate: '2024-11-28',
  },
  {
    id: 'action-item-7',
    feedbackId: 'feedback-5',
    repId: 'rep-4',
    description: '练习主动提出多个解决方案选项的表达方式。',
    status: 'pending',
    dueDate: '2024-11-23',
  },
  {
    id: 'action-item-8',
    feedbackId: 'feedback-5',
    repId: 'rep-4',
    description: '完成"解决方案销售"在线课程。',
    status: 'pending',
    dueDate: '2024-11-30',
  },
  {
    id: 'action-item-9',
    feedbackId: 'feedback-7',
    repId: 'rep-3',
    description: '制定一份跟进客户的标准话术和流程模板。',
    status: 'pending',
    dueDate: '2024-11-27',
  },
  {
    id: 'action-item-10',
    feedbackId: 'feedback-9',
    repId: 'rep-2',
    description: '学习"假定成交法"和"选择性成交法"。',
    status: 'pending',
    dueDate: '2024-11-25',
  },
  {
    id: 'action-item-11',
    feedbackId: 'feedback-9',
    repId: 'rep-2',
    description: '进行3次关于关闭技巧的模拟成交练习。',
    status: 'in_progress',
    dueDate: '2024-11-29',
  },
];

// 获取所有反馈
export const getAllFeedbacks = () => mockFeedbacks;

// 根据ID获取反馈
export const getFeedbackById = (feedbackId: string) =>
  mockFeedbacks.find(f => f.id === feedbackId);

// 根据反馈ID获取行动建议
export const getActionItemsByFeedbackId = (feedbackId: string) =>
  mockActionItems.filter(a => a.feedbackId === feedbackId);

// 根据ID获取任务
export const getTaskById = (taskId: string) =>
  mockTasks.find(t => t.id === taskId);

// 根据 Rep ID 获取反馈
export const getFeedbacksByRepId = (repId: string) =>
  mockFeedbacks.filter(f => f.repId === repId);

// 根据 Rep ID 获取行动建议
export const getActionItemsByRepId = (repId: string) =>
  mockActionItems.filter(a => a.repId === repId);

// =================================================================
// END: Jules's additions for coach feedback feature
// =================================================================

// ================================================================
// Role-play 会话 / 转录 / 注释 / 标注（Mock）
// ================================================================

// 会话列表（示例数据）
export const mockRolePlaySessions: RolePlaySession[] = [
  {
    id: 'rps-1',
    repId: 'rep-1',
    type: 'cold-call',
    title: '首次电话沟通 - 价格敏感客户',
    description: '建立信任并预约上门，避免直接报价',
    persona: '价格敏感型客户',
    scenario: '首次联系/预约',
    startedAt: '2024-11-17T09:00:00Z',
    endedAt: '2024-11-17T09:15:00Z',
    status: 'completed',
    durationMs: 15 * 60 * 1000,
    roundCount: 8,
  },
  {
    id: 'rps-2',
    repId: 'rep-1',
    type: 'pricing',
    title: '报价谈判 - 忙碌决策者',
    description: '快速价值呈现与异议处理',
    persona: '忙碌的决策者',
    scenario: '报价与异议',
    startedAt: '2024-11-18T10:00:00Z',
    status: 'in-progress',
    durationMs: 6 * 60 * 1000,
    roundCount: 4,
  },
  {
    id: 'rps-3',
    repId: 'rep-1',
    type: 'on-site',
    title: '上门勘查 - 技术专家客户',
    description: '通俗解释技术问题，建立专业形象',
    persona: '技术专家',
    scenario: '现场诊断',
    startedAt: '2024-11-16T14:00:00Z',
    endedAt: '2024-11-16T14:25:00Z',
    status: 'completed',
    durationMs: 25 * 60 * 1000,
    roundCount: 10,
  },
];

// 逐句转录（示例，仅针对 rps-1）
export const mockTranscriptEntries: TranscriptEntry[] = [
  { id: 'te-1', sessionId: 'rps-1', speaker: 'ai', startMs: 0, endMs: 2000, text: '喂？哪位？', confidence: 0.98 },
  { id: 'te-2', sessionId: 'rps-1', speaker: 'rep', startMs: 2200, endMs: 7000, text: '您好，我是XX防水维修的管家张伟，想确认下您是不是王先生？', confidence: 0.96 },
  { id: 'te-3', sessionId: 'rps-1', speaker: 'ai', startMs: 7200, endMs: 11000, text: '是的，家里卫生间最近有点漏水。', confidence: 0.97 },
  { id: 'te-4', sessionId: 'rps-1', speaker: 'rep', startMs: 11400, endMs: 18000, text: '了解，我们可以安排免费上门勘查，您看明天下午两点方便吗？', confidence: 0.95 },
  { id: 'te-5', sessionId: 'rps-1', speaker: 'ai', startMs: 18200, endMs: 22000, text: '可以，不过价格是不是很贵啊？', confidence: 0.94 },
  { id: 'te-6', sessionId: 'rps-1', speaker: 'rep', startMs: 22400, endMs: 30000, text: '我们会根据实际情况给出详细方案与报价，先安排勘查更准确。', confidence: 0.93 },
];

// 笔记/注释（示例）
export const mockNotes: Note[] = [
  { id: 'note-1', sessionId: 'rps-1', entryId: 'te-5', authorRole: 'rep', authorId: 'rep-1', text: '客户对价格敏感，需价值铺垫', tags: ['pricing', 'value'], createdAt: '2024-11-17T09:08:00Z' },
  { id: 'note-2', sessionId: 'rps-1', authorRole: 'coach', authorId: 'coach-1', text: '勘查前引导更明确的下一步', tags: ['no_next_step'], createdAt: '2024-11-17T09:16:00Z' },
];

// 片段标注（示例）
export const mockFlaggedSegments: FlaggedSegment[] = [
  { id: 'fs-1', sessionId: 'rps-1', startEntryId: 'te-5', labels: ['objection'], severity: 'medium', createdByRole: 'coach', createdById: 'coach-1', createdAt: '2024-11-17T09:16:30Z' },
];

// 获取会话列表（按 Rep）
export const getRolePlaySessionsByRepId = (repId: string) =>
  mockRolePlaySessions.filter(s => s.repId === repId);

// 获取会话详情
export const getRolePlaySessionById = (sessionId: string) =>
  mockRolePlaySessions.find(s => s.id === sessionId);

// 获取转录（按会话）
export const getTranscriptEntriesBySessionId = (sessionId: string) =>
  mockTranscriptEntries.filter(e => e.sessionId === sessionId);

// 获取笔记（按会话）
export const getNotesBySessionId = (sessionId: string) =>
  mockNotes.filter(n => n.sessionId === sessionId);

// 获取标注（按会话）
export const getFlaggedSegmentsBySessionId = (sessionId: string) =>
  mockFlaggedSegments.filter(f => f.sessionId === sessionId);

// 追加写入（模拟持久化到内存）
export const addRolePlaySession = (session: RolePlaySession) => {
  mockRolePlaySessions.unshift(session);
  return session;
};

export const updateRolePlaySession = (sessionId: string, patch: Partial<RolePlaySession>) => {
  const idx = mockRolePlaySessions.findIndex(s => s.id === sessionId);
  if (idx >= 0) {
    mockRolePlaySessions[idx] = { ...mockRolePlaySessions[idx], ...patch };
    return mockRolePlaySessions[idx];
  }
  return undefined;
};

export const addTranscriptEntries = (entries: TranscriptEntry[]) => {
  mockTranscriptEntries.push(...entries);
};

export const addNote = (note: Note) => {
  mockNotes.unshift(note);
  return note;
};

export const addFlaggedSegment = (segment: FlaggedSegment) => {
  mockFlaggedSegments.unshift(segment);
  return segment;
};

// ================================================================
// Conversation Intelligence - Calls / Transcripts / Signals / Metrics (Mock)
// ================================================================

export const mockCallRecords: CallRecord[] = [
  { id: 'call-20241117-001', repId: 'rep-1', customer: '王先生', title: '首次电话沟通 - 预约上门', startedAt: '2024-11-17T10:25:00Z', durationMs: 16 * 60 * 1000, analyzed: true, starred: true, tags: ['cold-call'] },
  { id: 'call-20241116-002', repId: 'rep-1', customer: '李女士', title: '报价沟通 - 预算探讨', startedAt: '2024-11-16T15:40:00Z', durationMs: 21 * 60 * 1000, analyzed: true, tags: ['pricing'] },
  { id: 'call-20241115-003', repId: 'rep-1', customer: '张先生', title: '跟进电话 - 方案确认', startedAt: '2024-11-15T09:10:00Z', durationMs: 12 * 60 * 1000, analyzed: false, tags: ['follow-up'] },
];

export const mockCallTranscriptEntries: CallTranscriptEntry[] = [
  { id: 'cte-1', callId: 'call-20241117-001', speaker: 'customer', startMs: 0, endMs: 2500, text: '你好，我家卫生间有点漏水。' },
  { id: 'cte-2', callId: 'call-20241117-001', speaker: 'rep', startMs: 2700, endMs: 8200, text: '了解，我们可以安排免费上门勘查，您看明天下午两点是否方便？' },
  { id: 'cte-3', callId: 'call-20241117-001', speaker: 'customer', startMs: 8400, endMs: 12200, text: '可以，不过我比较关心费用是否很高。' },
  { id: 'cte-4', callId: 'call-20241117-001', speaker: 'rep', startMs: 12500, endMs: 18500, text: '我们先勘查，根据实际情况提供详细方案与报价。' },
];

export const mockCallSignals: CallSignal[] = [
  // call-20241117-001 （完整示例）
  { id: 'cs-1', callId: 'call-20241117-001', repId: 'rep-1', type: 'event_objection', severity: 'medium', timestamp: '2024-11-17T10:33:00Z', snippet: '我比较关心费用是否很高。', category: 'event' },
  { id: 'cs-2', callId: 'call-20241117-001', repId: 'rep-1', type: 'event_no_next_step', severity: 'low', timestamp: '2024-11-17T10:39:00Z', snippet: '先把方案发给我，我先看看再说。', category: 'event' },
  { id: 'cs-3', callId: 'call-20241117-001', repId: 'rep-1', type: 'event_pricing', severity: 'high', timestamp: '2024-11-17T10:34:00Z', snippet: '多少钱？', category: 'event' },
  { id: 'cs-4', callId: 'call-20241117-001', repId: 'rep-1', type: 'event_schedule', severity: 'medium', timestamp: '2024-11-17T10:35:00Z', snippet: '明天方便吗？', category: 'event' },
  { id: 'cs-5', callId: 'call-20241117-001', repId: 'rep-1', type: 'event_rejection', severity: 'high', timestamp: '2024-11-17T10:36:00Z', snippet: '不需要上门。', category: 'event' },
  { id: 'cs-5b', callId: 'call-20241117-001', repId: 'rep-1', type: 'event_competitor', severity: 'medium', timestamp: '2024-11-17T10:36:30Z', snippet: '之前用过友商的方案。', category: 'event' },
  { id: 'cs-5c', callId: 'call-20241117-001', repId: 'rep-1', type: 'event_buying', severity: 'high', timestamp: '2024-11-17T10:36:45Z', snippet: '这个很合适，尽快安排吧。', category: 'event' },
  { id: 'cs-6', callId: 'call-20241117-001', repId: 'rep-1', type: 'behavior_active_selling', severity: 'medium', timestamp: '2024-11-17T10:31:00Z', snippet: '主动提出解决方案与上门勘查。', category: 'behavior' },
  { id: 'cs-7', callId: 'call-20241117-001', repId: 'rep-1', type: 'behavior_listening', severity: 'high', timestamp: '2024-11-17T10:33:30Z', snippet: '积极倾听客户对费用的顾虑。', category: 'behavior' },
  { id: 'cs-8', callId: 'call-20241117-001', repId: 'rep-1', type: 'behavior_opening_completeness', severity: 'high', timestamp: '2024-11-17T10:25:10Z', snippet: '开场白完整，自我介绍与目的明确。', category: 'behavior' },
  { id: 'cs-9', callId: 'call-20241117-001', repId: 'rep-1', type: 'behavior_clarity', severity: 'low', timestamp: '2024-11-17T10:37:00Z', snippet: '解释存在术语，不够通俗易懂。', category: 'behavior' },
  { id: 'cs-10', callId: 'call-20241117-001', repId: 'rep-1', type: 'behavior_next_step', severity: 'low', timestamp: '2024-11-17T10:40:00Z', snippet: '未明确下一步的跟进与确认。', category: 'behavior' },
  { id: 'cs-10b', callId: 'call-20241117-001', repId: 'rep-1', type: 'behavior_structure', severity: 'medium', timestamp: '2024-11-17T10:28:00Z', snippet: '交流结构清晰，有开场、需求、方案、下一步。', category: 'behavior' },
  { id: 'cs-10c', callId: 'call-20241117-001', repId: 'rep-1', type: 'behavior_emotion_tone_pace', severity: 'medium', timestamp: '2024-11-17T10:29:00Z', snippet: '态度友好、语速适中、情绪稳定。', category: 'behavior' },
  // Issue Signals
  { id: 'cs-10d', callId: 'call-20241117-001', repId: 'rep-1', type: 'issue_rep_delay', severity: 'medium', timestamp: '2024-11-17T10:41:00Z', snippet: '因管家安排导致上门延迟。', category: 'issue' },
  { id: 'cs-10e', callId: 'call-20241117-001', repId: 'rep-1', type: 'issue_schedule_conflict', severity: 'medium', timestamp: '2024-11-17T10:42:00Z', snippet: '预约时间冲突需要调整。', category: 'issue' },
  { id: 'cs-10f', callId: 'call-20241117-001', repId: 'rep-1', type: 'issue_customer_wait_long', severity: 'high', timestamp: '2024-11-17T10:43:00Z', snippet: '客户等待过久，表达不满。', category: 'issue' },

  // call-20241116-002（简化示例）
  { id: 'cs-11', callId: 'call-20241116-002', repId: 'rep-1', type: 'event_objection', severity: 'medium', timestamp: '2024-11-16T15:50:00Z', snippet: '总价有点高，能不能便宜一点？', category: 'event' },
  { id: 'cs-12', callId: 'call-20241116-002', repId: 'rep-1', type: 'event_pricing', severity: 'high', timestamp: '2024-11-16T15:45:00Z', snippet: '这个方案要多少钱？', category: 'event' },
  { id: 'cs-13', callId: 'call-20241116-002', repId: 'rep-1', type: 'behavior_listening', severity: 'medium', timestamp: '2024-11-16T15:42:00Z', snippet: '倾听客户预算限制。', category: 'behavior' },
  { id: 'cs-13b', callId: 'call-20241116-002', repId: 'rep-1', type: 'event_delay', severity: 'medium', timestamp: '2024-11-16T15:52:00Z', snippet: '我再考虑一下。', category: 'event' },
  { id: 'cs-13c', callId: 'call-20241116-002', repId: 'rep-1', type: 'issue_schedule_conflict', severity: 'low', timestamp: '2024-11-16T15:53:00Z', snippet: '预约出现时间冲突。', category: 'issue' },

  // call-20241115-003（简化示例）
  { id: 'cs-14', callId: 'call-20241115-003', repId: 'rep-1', type: 'event_no_next_step', severity: 'low', timestamp: '2024-11-15T09:12:00Z', snippet: '发个方案我再看', category: 'event' },
  { id: 'cs-15', callId: 'call-20241115-003', repId: 'rep-1', type: 'event_schedule', severity: 'medium', timestamp: '2024-11-15T09:11:00Z', snippet: '下周三方便吗？', category: 'event' },
  { id: 'cs-16', callId: 'call-20241115-003', repId: 'rep-1', type: 'behavior_active_selling', severity: 'medium', timestamp: '2024-11-15T09:10:30Z', snippet: '介绍勘查流程与报价步骤。', category: 'behavior' },
  { id: 'cs-16b', callId: 'call-20241115-003', repId: 'rep-1', type: 'event_urgency', severity: 'high', timestamp: '2024-11-15T09:09:30Z', snippet: '尽快上门。', category: 'event' },
  { id: 'cs-16c', callId: 'call-20241115-003', repId: 'rep-1', type: 'issue_customer_wait_long', severity: 'medium', timestamp: '2024-11-15T09:08:30Z', snippet: '客户等待较久，表示不满。', category: 'issue' },
];

export const mockBehaviorMetrics: BehaviorMetrics[] = [
  { callId: 'call-20241117-001', talkRatio: 0.58, listenRatio: 0.42, silenceCount: 3, questionCount: 5, sentimentScore: 0.62 },
  { callId: 'call-20241116-002', talkRatio: 0.65, listenRatio: 0.35, silenceCount: 2, questionCount: 4, sentimentScore: 0.55 },
];

export const getCallRecordsByRepId = (repId: string) =>
  mockCallRecords.filter(c => c.repId === repId);

export const getCallById = (callId: string) =>
  mockCallRecords.find(c => c.id === callId);

export const getCallTranscriptByCallId = (callId: string) =>
  mockCallTranscriptEntries.filter(e => e.callId === callId);

export const getBehaviorMetricsByCallId = (callId: string) =>
  mockBehaviorMetrics.find(m => m.callId === callId);

export const getSignalsByCallId = (callId: string) =>
  mockCallSignals.filter(s => s.callId === callId);

export const toggleCallStar = (callId: string, starred: boolean) => {
  const idx = mockCallRecords.findIndex(c => c.id === callId);
  if (idx >= 0) mockCallRecords[idx].starred = starred;
};
