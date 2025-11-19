import {
  Home,
  GraduationCap,
  MessageSquare,
  ClipboardList,
  BookOpen,
  BarChart3,
  Users,
  Phone,
  TrendingUp,
  Award,
  FileText,
  Settings,
  Target,
  Lightbulb,
  Trophy,
  PieChart,
  type LucideIcon,
} from 'lucide-react';

export interface NavigationItem {
  name: string;
  href?: string;
  icon: LucideIcon;
  badge?: number;
  children?: NavigationItem[];
}

export interface RoleNavigation {
  rep: NavigationItem[];
  coach: NavigationItem[];
  admin: NavigationItem[];
}

/**
 * RevRise 营收赋能系统 - 菜单配置
 * 基于 docs/revrise-architecture.md 和 docs/prd-patch-revrise.md
 */
export const navigation: RoleNavigation = {
  // 管家端菜单
  rep: [
    {
      name: '首页',
      href: '/',
      icon: Home,
    },
    {
      name: '学习与练习',
      icon: GraduationCap,
      children: [
        { name: '微课程', href: '/onboarding', icon: BookOpen },
        { name: '角色扮演', href: '/practice', icon: MessageSquare },
        { name: '反思日志', href: '/reflection', icon: FileText },
        { name: '内容库', href: '/playbook', icon: BookOpen },
      ],
    },
    {
      name: '对话分析',
      icon: Phone,
      children: [
        { name: '通话记录', href: '/conversations', icon: Phone },
        { name: '行为评分', href: '/conversations/scoring', icon: Target },
        { name: '洞察建议', href: '/conversations/insights', icon: Lightbulb },
      ],
    },
    {
      name: '教练管理',
      icon: Users,
      children: [
        { name: '我的任务', href: '/tasks', icon: ClipboardList },
        { name: '反馈记录', href: '/coaching/feedback', icon: MessageSquare },
      ],
    },
    {
      name: '业绩',
      icon: TrendingUp,
      children: [
        { name: '我的商机', href: '/performance/pipeline', icon: Target },
        { name: '签约赢单', href: '/performance/deals', icon: Trophy },
        { name: '业绩目标', href: '/performance/goals', icon: Target },
      ],
    },
    {
      name: '激励与奖励',
      icon: Award,
      children: [
        { name: '积分徽章', href: '/rewards/badges', icon: Award },
        { name: '排行榜', href: '/rewards/leaderboard', icon: Trophy },
        { name: '奖励历史', href: '/rewards/history', icon: FileText },
      ],
    },
    {
      name: '我的数据',
      href: '/analytics',
      icon: BarChart3,
    },
  ],

  // 教练端菜单
  coach: [
    {
      name: '首页',
      href: '/',
      icon: Home,
    },
    {
      name: '教练管理',
      icon: Users,
      children: [
        { name: '教练仪表盘', href: '/coach/dashboard', icon: BarChart3 },
        { name: '管家管理', href: '/coach/reps', icon: Users },
        { name: '辅导任务', href: '/coach/tasks', icon: ClipboardList },
        { name: '反馈标注', href: '/coach/feedback', icon: MessageSquare },
      ],
    },
    {
      name: '对话分析',
      icon: Phone,
      children: [
        { name: '通话记录', href: '/coach/conversations', icon: Phone },
        { name: '行为评分', href: '/coach/conversations/scoring', icon: Target },
        { name: '风险机遇', href: '/coach/conversations/alerts', icon: Lightbulb },
      ],
    },
    {
      name: '业绩',
      icon: TrendingUp,
      children: [
        { name: '团队商机', href: '/coach/performance/pipeline', icon: Target },
        { name: '业绩趋势', href: '/coach/performance/trends', icon: TrendingUp },
        { name: '行为绩效关联', href: '/coach/performance/attribution', icon: PieChart },
      ],
    },
    {
      name: '分析报告',
      icon: BarChart3,
      children: [
        { name: '团队分析', href: '/coach/analytics', icon: BarChart3 },
        { name: '练习分析', href: '/coach/analytics/practice', icon: MessageSquare },
        { name: '教练互动分析', href: '/coach/analytics/coaching', icon: Users },
        { name: 'Enablement ROI', href: '/coach/analytics/roi', icon: TrendingUp },
      ],
    },
    {
      name: '内容库',
      href: '/playbook',
      icon: BookOpen,
    },
  ],

  // 管理员菜单
  admin: [
    {
      name: '首页',
      href: '/',
      icon: Home,
    },
    {
      name: '系统管理',
      icon: Settings,
      children: [
        { name: '用户角色管理', href: '/admin/users', icon: Users },
        { name: '权限控制', href: '/admin/permissions', icon: Settings },
        { name: '内容治理', href: '/admin/content', icon: BookOpen },
        { name: '系统配置', href: '/admin/settings', icon: Settings },
      ],
    },
  ],
};

