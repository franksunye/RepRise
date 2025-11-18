# RepRise

管家销售赋能平台 - 通过模拟练习和持续辅导提升销售能力

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
- 学习路径 - 入职培训课程
- 模拟练习 - 电话、上门、报价、异议处理
- 内容库 - 话术、模板、清单
- 我的数据 - KPI 和能力分析

### 教练端
- 管家管理 - 团队概览和个人详情
- 辅导任务 - 布置和跟踪
- 团队分析 - 数据统计

详见 [STATUS.md](STATUS.md)

## 技术栈

- Next.js 14 + TypeScript
- Tailwind CSS + shadcn/ui
- Recharts + DiceBear

## 文档

- [产品需求](docs/prd.md)
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
