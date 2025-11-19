# RevRise 菜单结构设计

> 基于 [revrise-architecture.md](./revrise-architecture.md) 和 [prd-patch-revrise.md](./prd-patch-revrise.md) 设计的新菜单结构

## 设计原则

1. **模块化分层**: 一级菜单代表核心功能模块，二级菜单提供具体功能入口
2. **角色差异化**: 不同角色(管家/教练/管理员)看到不同的菜单结构
3. **可扩展性**: 支持未来新增模块和功能
4. **用户体验**: 清晰的信息架构，减少认知负担

## 菜单结构对比

### 旧版菜单 (RepRise)

**管家端 (6项):**
- 首页
- 学习路径
- 模拟练习
- 我的任务
- 内容库
- 我的数据

**教练端 (5项):**
- 首页
- 管家管理
- 辅导任务
- 内容库
- 团队分析

### 新版菜单 (RevRise)

**管家端 (7个一级模块, 20+个二级功能):**

1. **首页** (Dashboard)
   - 总览、任务、业绩快照、通话摘要

2. **学习与练习** (Enablement)
   - 微课程
   - 角色扮演
   - 反思日志
   - 内容库

3. **对话分析** (Conversation Intelligence) 🆕
   - 通话记录
   - 行为评分
   - 洞察建议

4. **教练管理** (Coaching)
   - 我的任务
   - 反馈记录

5. **业绩** (Performance/Revenue) 🆕
   - 我的商机
   - 签约赢单
   - 业绩目标

6. **激励与奖励** (Rewards) 🆕
   - 积分徽章
   - 排行榜
   - 奖励历史

7. **我的数据** (Analytics)
   - KPI 和能力分析

**教练端 (6个一级模块, 15+个二级功能):**

1. **首页** (Dashboard)
   - 教练仪表盘

2. **教练管理** (Coaching)
   - 教练仪表盘
   - 管家管理
   - 辅导任务
   - 反馈标注

3. **对话分析** (Conversation Intelligence) 🆕
   - 通话记录
   - 行为评分
   - 风险机遇

4. **业绩** (Performance) 🆕
   - 团队商机
   - 业绩趋势
   - 行为绩效关联

5. **分析报告** (Analytics & Reports)
   - 团队分析
   - 练习分析
   - 教练互动分析
   - Enablement ROI

6. **内容库** (Playbook)
   - 话术、模板、清单

**管理员端 (2个一级模块):**

1. **首页** (Dashboard)

2. **系统管理** (Admin/Settings) 🆕
   - 用户角色管理
   - 权限控制
   - 内容治理
   - 系统配置

## 核心变化

### 新增模块 (🆕)

1. **对话分析** - 真实通话录音、转录、行为评分
2. **业绩** - CRM 集成、商机管理、业绩目标
3. **激励与奖励** - 积分、徽章、排行榜
4. **系统管理** - 用户、权限、内容治理

### 整合优化

- "学习路径" + "模拟练习" → **学习与练习**
- "我的任务" + "辅导任务" → **教练管理**
- "我的数据" + "团队分析" → **分析报告** (教练端)

## 技术实现

### 菜单配置文件

位置: `frontend/config/navigation.ts`

```typescript
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
```

### Sidebar 组件

位置: `frontend/components/sidebar.tsx`

**核心功能:**
- 支持二级菜单展开/收起
- 根据角色动态加载菜单
- 路径高亮显示
- 响应式设计

## 未来扩展

### 计划中的功能

1. **三级菜单支持** - 更复杂的功能层级
2. **菜单搜索** - 快速定位功能
3. **收藏夹** - 用户自定义常用功能
4. **快捷键** - 键盘导航支持
5. **菜单个性化** - 用户自定义菜单顺序

### 权限控制

- 基于角色的菜单可见性
- 功能级权限控制
- 动态菜单加载

## 参考文档

- [RevRise 系统架构](./revrise-architecture.md)
- [PRD 补丁 - 营收赋能](./prd-patch-revrise.md)
- [原始 PRD](./prd.md)

