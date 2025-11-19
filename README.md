# RevRise

营收赋能系统 - 连接培训、对话分析、教练与业绩，用行为驱动营收增长

## 快速开始

```bash
cd frontend
npm install
npm run dev
```

访问 http://localhost:3000

## 在线演示

https://reprise.vercel.app

## 功能概览

### 管家端
- 首页 - 任务、业绩、练习摘要
- 学习与练习 - 微课程、角色扮演、反思日志、内容库
- 对话分析 - 通话记录、行为评分、洞察建议
- 教练管理 - 我的任务、反馈记录
- 业绩 - 我的商机、签约赢单、业绩目标
- 激励与奖励 - 积分徽章、排行榜、奖励历史
- 我的数据 - KPI 和能力分析

### 教练端
- 首页 - 教练仪表盘
- 教练管理 - 管家管理、辅导任务、反馈标注
- 对话分析 - 通话记录、行为评分、风险机遇
- 业绩 - 团队商机、业绩趋势、行为绩效关联
- 分析报告 - 团队分析、练习分析、教练互动分析、Enablement ROI
- 内容库 - 话术、模板、清单

详见 [STATUS.md](STATUS.md)

## 技术栈

- Next.js 14 + TypeScript
- Tailwind CSS + shadcn/ui
- Recharts + DiceBear

## 文档

- [产品需求](docs/prd.md)
- [PRD 补丁 - 营收赋能](docs/prd-patch-revrise.md)
- [系统架构](docs/revrise-architecture.md)
- [设计原则](docs/design-principles.md)
- [项目状态](STATUS.md)

## 项目结构

```
frontend/
├── app/              # 页面路由
├── components/       # UI 组件
├── data/            # 模拟数据
├── types/           # 类型定义
└── lib/             # 工具函数
```

## License

MIT
