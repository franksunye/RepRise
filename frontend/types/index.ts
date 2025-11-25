// 用户角色
export type UserRole = 'rep' | 'coach' | 'admin';

// 管家（销售代表）
export interface Rep {
  id: string;
  name: string;
  avatar?: string;
  role: UserRole;
  joinDate: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  coachId?: string;
}

// 教练
export interface Coach {
  id: string;
  name: string;
  avatar?: string;
  role: UserRole;
  email: string;
  phone: string;
  reps: string[]; // Rep IDs
}

// 练习类型
export type PracticeType = 'cold-call' | 'follow-up' | 'on-site' | 'pricing' | 'objection';

// 练习记录
export interface Practice {
  id: string;
  repId: string;
  type: PracticeType;
  title: string;
  description: string;
  date: string;
  duration: number; // 分钟
  score: number; // 0-100
  feedback: string;
  coachFeedback?: string;
  reflection?: string;
  status: 'completed' | 'in-progress' | 'pending';
  scores: {
    professionalism: number;
    communication: number;
    timeManagement: number;
    objectionHandling: number;
  };
}

// Role-play 会话
export interface RolePlaySession {
  id: string;
  repId: string;
  type: PracticeType;
  title?: string;
  description?: string;
  persona: string; // 买家角色 Persona 名称
  scenario: string; // 场景名称或标识
  startedAt: string;
  endedAt?: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'archived';
  durationMs?: number;
  roundCount?: number;
}

// 逐句转录条目
export interface TranscriptEntry {
  id: string;
  sessionId: string;
  speaker: 'rep' | 'ai';
  startMs: number;
  endMs: number;
  text: string;
  confidence?: number; // 可选识别置信度
}

// 练习中的笔记/注释
export interface Note {
  id: string;
  sessionId: string;
  entryId?: string; // 关联的转录条目（逐句）
  authorRole: UserRole;
  authorId: string;
  text: string;
  tags?: string[];
  createdAt: string;
}

// 标记的关键片段（用于教练信号/行动建议关联）
export interface FlaggedSegment {
  id: string;
  sessionId: string;
  startEntryId: string;
  endEntryId?: string;
  labels: string[]; // 如 'objection', 'no_next_step', 'engagement'
  severity?: 'low' | 'medium' | 'high';
  createdByRole: UserRole;
  createdById: string;
  createdAt: string;
}

// 辅导任务
export interface CoachingTask {
  id: string;
  repId: string;
  coachId: string;
  title: string;
  description: string;
  type: PracticeType;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  relatedSignalIds?: string[]; // 关联的教练信号 IDs
  relatedFeedbackIds?: string[]; // 关联的反馈 IDs
  relatedActionItemIds?: string[]; // 关联的行动建议 IDs
}

// 内容库项目
export interface PlaybookItem {
  id: string;
  title: string;
  category: 'script' | 'template' | 'checklist' | 'objection-handling';
  content: string;
  version: string;
  author: string;
  lastUpdated: string;
  tags: string[];
  downloads: number;
}

// KPI 数据
export interface KPIData {
  repId: string;
  period: string; // 'week' | 'month' | 'quarter'
  practiceCount: number;
  averageScore: number;
  onSiteSuccessRate: number; // 上门成功率
  pricingConversionRate: number; // 报价转化率
  dealCloseRate: number; // 成交率
}

// 通知
export interface Notification {
  id: string;
  userId: string;
  type: 'task' | 'feedback' | 'reminder' | 'achievement';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  link?: string;
}

// 学习路径
export interface LearningPath {
  id: string;
  title: string;
  description: string;
  targetRole: UserRole;
  courses: string[]; // Course IDs
  estimatedDuration: number; // 总时长（分钟）
}

// 课程
export interface Course {
  id: string;
  pathId: string;
  title: string;
  description: string;
  duration: number; // 分钟
  order: number; // 课程顺序
  content: string; // 课程内容（Markdown格式）
  objectives: string[]; // 学习目标
  keyPoints: string[]; // 关键要点
}

// 用户学习进度
export interface UserCourseProgress {
  userId: string;
  courseId: string;
  status: 'not-started' | 'in-progress' | 'completed';
  progress: number; // 0-100
  startedAt?: string;
  completedAt?: string;
  lastAccessedAt?: string;
}

// 用户类型（联合类型）
export type User = Rep | Coach;

// 技能评分
export interface SkillScore {
  repId: string;
  professionalism: number; // 专业性
  communication: number; // 沟通能力
  timeManagement: number; // 时间管理
  objectionHandling: number; // 异议处理
  closingSkill: number; // 成交技巧
}

// 历史趋势数据点
export interface TrendDataPoint {
  date: string;
  value: number;
}

// 练习类型统计
export interface PracticeTypeStats {
  type: string;
  count: number;
  averageScore: number;
}

// 反馈来源类型
export type FeedbackSource = 'Role-play' | 'Live Call';

// 行动建议状态
export type ActionItemStatus = 'pending' | 'in_progress' | 'done';

// 教练反馈
export interface Feedback {
  id: string;
  source: FeedbackSource;
  sourceId: string; // 关联的 Role-play ID 或 Live Call ID
  repId: string;
  coachId: string;
  timestamp: string;
  tags: string[];
  content: string;
  score?: number; // 评分 (例如 1-5)
  version?: string; // 版本号
}

// 行动建议
export interface ActionItem {
  id: string;
  feedbackId: string; // 关联的 Feedback ID
  repId: string; // 分配给的 Rep ID
  description: string;
  status: ActionItemStatus;
  dueDate: string;
}

export interface CallRecord {
  id: string;
  repId: string;
  customer: string;
  title: string;
  startedAt: string;
  durationMs: number;
  analyzed: boolean;
  starred?: boolean;
  tags?: string[];
}

export interface CallTranscriptEntry {
  id: string;
  callId: string;
  speaker: 'rep' | 'customer';
  startMs: number;
  endMs: number;
  text: string;
}

export type CallSignalType =
  | 'behavior_engagement'
  | 'event_objection'
  | 'event_no_next_step'
  | 'event_competitor'
  | 'event_buying'
  | 'behavior_structure'
  | 'behavior_emotion_tone_pace'
  | 'behavior_active_selling'
  | 'behavior_listening'
  | 'behavior_opening_completeness'
  | 'behavior_clarity'
  | 'behavior_next_step'
  | 'event_pricing'
  | 'event_schedule'
  | 'event_rejection'
  | 'event_delay'
  | 'event_urgency'
  | 'issue_rep_delay'
  | 'issue_schedule_conflict'
  | 'issue_customer_wait_long';

export type SignalCategory = 'behavior' | 'event';
// 服务问题类
// 扩展分类以支持服务问题类
export type ExtendedSignalCategory = SignalCategory | 'issue';

export interface CallSignal {
  id: string;
  callId: string;
  repId: string;
  type: CallSignalType;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  snippet: string;
  category?: ExtendedSignalCategory;
}

export interface BehaviorMetrics {
  callId: string;
  talkRatio: number;
  listenRatio: number;
  silenceCount: number;
  questionCount: number;
  sentimentScore?: number;
}
