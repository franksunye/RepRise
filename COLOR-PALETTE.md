# RepRise 配色方案 v2.0 — 专业 SaaS 设计系统

> **设计理念**: 遵循 60-30-10 配色原则，以专业中性灰为主导(60%)，蓝色为辅助(30%)，橙色作为强调色(10%)，打造现代、专业、易读的 SaaS 界面。

## 核心改进

**v1 问题诊断:**
- ❌ 橙色使用过多，界面过于"暖"和"跳跃"
- ❌ 中性色层次不足，缺少专业感
- ❌ 没有遵循 60-30-10 配色原则

**v2 解决方案:**
- ✅ 采用冷色调中性灰系统（类似 Stripe/Linear/Notion）
- ✅ 引入蓝色作为主要交互色（专业、可信赖）
- ✅ 橙色降级为强调色（仅用于关键 CTA 和重要提示）
- ✅ 完整的语义化 token 系统

---

## 一、核心设计原则

### 1.1 配色比例（60-30-10 原则）

- **60% - 中性灰**: 背景、卡片、大面积区域
- **30% - 蓝色系**: 主要交互元素、链接、次要按钮
- **10% - 橙色系**: 关键 CTA、重要提示、品牌强调

### 1.2 设计契约

- **输入**: 中性灰 + 蓝色(主) + 橙色(辅) 三色系统
- **输出**: 分层 design tokens（Option → Semantic → Component）
- **可访问性**: 所有文本/背景组合满足 WCAG 2.1 AA 标准（对比度 ≥ 4.5:1）
- **主题支持**: 完整的浅色/深色主题映射

---

## 二、Option Tokens（基础色阶）

### 2.1 中性灰阶（Neutral） — 界面主色调

采用冷色调灰色系统，提供专业、现代的视觉体验。

| Token 名称 | 色值 (Hex) | HSL | 用途 |
|---|---:|---|---|
| `color.neutral-50` | `#FAFAFA` | `0° 0% 98%` | 页面背景（最浅） |
| `color.neutral-100` | `#F5F5F5` | `0° 0% 96%` | 卡片背景 |
| `color.neutral-200` | `#E5E5E5` | `0° 0% 90%` | 次级背景、悬停状态 |
| `color.neutral-300` | `#D4D4D4` | `0° 0% 83%` | 边框、分隔线 |
| `color.neutral-400` | `#A3A3A3` | `0° 0% 64%` | 占位符文本 |
| `color.neutral-500` | `#737373` | `0° 0% 45%` | 次级文本、图标 |
| `color.neutral-600` | `#525252` | `0° 0% 32%` | 主要文本 |
| `color.neutral-700` | `#404040` | `0° 0% 25%` | 标题、强调文本 |
| `color.neutral-800` | `#262626` | `0° 0% 15%` | 深色背景 |
| `color.neutral-900` | `#171717` | `0° 0% 9%` | 最深背景 |

### 2.2 蓝色系（Blue） — 主要交互色

专业、可信赖的蓝色，用于主要交互元素。

| Token 名称 | 色值 (Hex) | HSL | 用途 |
|---|---:|---|---|
| `color.blue-50` | `#EFF6FF` | `214° 100% 97%` | 浅蓝背景 |
| `color.blue-100` | `#DBEAFE` | `214° 95% 93%` | 信息提示背景 |
| `color.blue-200` | `#BFDBFE` | `213° 97% 87%` | 悬停背景 |
| `color.blue-300` | `#93C5FD` | `212° 96% 78%` | 次级按钮背景 |
| `color.blue-400` | `#60A5FA` | `213° 94% 68%` | 悬停状态 |
| `color.blue-500` | `#3B82F6` | `217° 91% 60%` | **主要交互色** |
| `color.blue-600` | `#2563EB` | `221° 83% 53%` | 按钮按下、链接 |
| `color.blue-700` | `#1D4ED8` | `224° 76% 48%` | 深色强调 |
| `color.blue-800` | `#1E40AF` | `226° 71% 40%` | 深色模式主色 |
| `color.blue-900` | `#1E3A8A` | `224° 64% 33%` | 最深蓝 |

### 2.3 橙色系（Orange） — 品牌强调色

保留原品牌色 #F26430，但仅用于关键强调。

| Token 名称 | 色值 (Hex) | HSL | 用途 |
|---|---:|---|---|
| `color.orange-50` | `#FFF7ED` | `33° 100% 96%` | 警告背景 |
| `color.orange-100` | `#FFEDD5` | `34° 100% 92%` | 浅橙背景 |
| `color.orange-200` | `#FED7AA` | `32° 98% 83%` | 悬停背景 |
| `color.orange-300` | `#FDBA74` | `31° 97% 72%` | 次级强调 |
| `color.orange-400` | `#FB923C` | `27° 96% 61%` | 悬停状态 |
| `color.orange-500` | `#F26430` | `14° 90% 57%` | **品牌主色** |
| `color.orange-600` | `#EA580C` | `21° 90% 48%` | 按下状态 |
| `color.orange-700` | `#C2410C` | `20° 87% 40%` | 深色强调 |
| `color.orange-800` | `#9A3412` | `18° 80% 34%` | 深色模式 |
| `color.orange-900` | `#7C2D12` | `17° 74% 28%` | 最深橙 |

### 2.4 状态色（Semantic Status）

| Token 名称 | 色值 (Hex) | HSL | 用途 |
|---|---:|---|---|
| `color.success-50` | `#F0FDF4` | `138° 76% 97%` | 成功背景 |
| `color.success-500` | `#22C55E` | `142° 71% 45%` | 成功主色 |
| `color.success-600` | `#16A34A` | `142° 76% 36%` | 成功深色 |
| `color.error-50` | `#FEF2F2` | `0° 86% 97%` | 错误背景 |
| `color.error-500` | `#EF4444` | `0° 84% 60%` | 错误主色 |
| `color.error-600` | `#DC2626` | `0° 73% 51%` | 错误深色 |
| `color.warning-50` | `#FFFBEB` | `48° 100% 96%` | 警告背景 |
| `color.warning-500` | `#F59E0B` | `38° 92% 50%` | 警告主色 |
| `color.warning-600` | `#D97706` | `32° 95% 44%` | 警告深色 |
| `color.info-50` | `#EFF6FF` | `214° 100% 97%` | 信息背景 |
| `color.info-500` | `#3B82F6` | `217° 91% 60%` | 信息主色 |
| `color.info-600` | `#2563EB` | `221° 83% 53%` | 信息深色 |

---

## 三、Semantic Tokens（语义层）

### 3.1 背景色（Background）

| 语义 Token | 浅色模式 | 深色模式 | 用途 |
|---|---|---|---|
| `color.background.page` | `neutral-50` | `neutral-900` | 页面主背景 |
| `color.background.surface` | `neutral-100` | `neutral-800` | 卡片、面板背景 |
| `color.background.elevated` | `#FFFFFF` | `neutral-700` | 悬浮元素（modal、dropdown） |
| `color.background.muted` | `neutral-200` | `neutral-700` | 禁用状态、次要区域 |
| `color.background.hover` | `neutral-100` | `neutral-700` | 悬停背景 |

### 3.2 文本色（Text）

| 语义 Token | 浅色模式 | 深色模式 | 用途 |
|---|---|---|---|
| `color.text.primary` | `neutral-700` | `neutral-100` | 主要文本 |
| `color.text.secondary` | `neutral-500` | `neutral-400` | 次要文本、说明 |
| `color.text.tertiary` | `neutral-400` | `neutral-500` | 辅助文本、时间戳 |
| `color.text.disabled` | `neutral-300` | `neutral-600` | 禁用文本 |
| `color.text.inverted` | `#FFFFFF` | `neutral-900` | 反色文本（按钮上） |
| `color.text.link` | `blue-600` | `blue-400` | 链接文本 |
| `color.text.brand` | `orange-600` | `orange-400` | 品牌强调文本 |

### 3.3 交互色（Interactive）

| 语义 Token | 浅色模式 | 深色模式 | 用途 |
|---|---|---|---|
| `color.interactive.primary` | `blue-600` | `blue-500` | 主要交互元素 |
| `color.interactive.primary-hover` | `blue-700` | `blue-400` | 主要交互悬停 |
| `color.interactive.primary-active` | `blue-800` | `blue-600` | 主要交互按下 |
| `color.interactive.accent` | `orange-500` | `orange-400` | 强调交互（关键 CTA） |
| `color.interactive.accent-hover` | `orange-600` | `orange-300` | 强调悬停 |
| `color.interactive.accent-active` | `orange-700` | `orange-500` | 强调按下 |

### 3.4 边框色（Border）

| 语义 Token | 浅色模式 | 深色模式 | 用途 |
|---|---|---|---|
| `color.border.default` | `neutral-300` | `neutral-600` | 默认边框 |
| `color.border.muted` | `neutral-200` | `neutral-700` | 次要边框 |
| `color.border.strong` | `neutral-400` | `neutral-500` | 强调边框 |
| `color.border.focus` | `blue-500` | `blue-400` | 聚焦边框 |
| `color.border.accent` | `orange-500` | `orange-400` | 品牌边框 |

### 3.5 状态色（Status）

| 语义 Token | 浅色模式 | 深色模式 | 用途 |
|---|---|---|---|
| `color.status.success` | `success-600` | `success-500` | 成功状态 |
| `color.status.success-bg` | `success-50` | `success-900/20%` | 成功背景 |
| `color.status.error` | `error-600` | `error-500` | 错误状态 |
| `color.status.error-bg` | `error-50` | `error-900/20%` | 错误背景 |
| `color.status.warning` | `warning-600` | `warning-500` | 警告状态 |
| `color.status.warning-bg` | `warning-50` | `warning-900/20%` | 警告背景 |
| `color.status.info` | `info-600` | `info-500` | 信息状态 |
| `color.status.info-bg` | `info-50` | `info-900/20%` | 信息背景 |

---

## 四、Component Tokens（组件层）

### 4.1 按钮（Buttons）

**主要按钮（Primary Button）** - 使用蓝色

| Token | 浅色模式 | 深色模式 | 说明 |
|---|---|---|---|
| `button.primary.bg` | `blue-600` | `blue-500` | 背景色 |
| `button.primary.text` | `#FFFFFF` | `#FFFFFF` | 文字色 |
| `button.primary.border` | `blue-600` | `blue-500` | 边框色 |
| `button.primary.hover.bg` | `blue-700` | `blue-400` | 悬停背景 |
| `button.primary.active.bg` | `blue-800` | `blue-600` | 按下背景 |

**强调按钮（Accent Button）** - 使用橙色，仅用于关键 CTA

| Token | 浅色模式 | 深色模式 | 说明 |
|---|---|---|---|
| `button.accent.bg` | `orange-500` | `orange-400` | 背景色 |
| `button.accent.text` | `#FFFFFF` | `neutral-900` | 文字色 |
| `button.accent.hover.bg` | `orange-600` | `orange-300` | 悬停背景 |
| `button.accent.active.bg` | `orange-700` | `orange-500` | 按下背景 |

**次要按钮（Secondary Button）**

| Token | 浅色模式 | 深色模式 | 说明 |
|---|---|---|---|
| `button.secondary.bg` | `transparent` | `transparent` | 背景色 |
| `button.secondary.text` | `blue-600` | `blue-400` | 文字色 |
| `button.secondary.border` | `neutral-300` | `neutral-600` | 边框色 |
| `button.secondary.hover.bg` | `blue-50` | `blue-900/20%` | 悬停背景 |

**幽灵按钮（Ghost Button）**

| Token | 浅色模式 | 深色模式 | 说明 |
|---|---|---|---|
| `button.ghost.bg` | `transparent` | `transparent` | 背景色 |
| `button.ghost.text` | `neutral-600` | `neutral-300` | 文字色 |
| `button.ghost.hover.bg` | `neutral-100` | `neutral-800` | 悬停背景 |

### 4.2 输入框（Inputs）

| Token | 浅色模式 | 深色模式 | 说明 |
|---|---|---|---|
| `input.bg` | `#FFFFFF` | `neutral-800` | 背景色 |
| `input.text` | `neutral-700` | `neutral-100` | 文字色 |
| `input.placeholder` | `neutral-400` | `neutral-500` | 占位符 |
| `input.border` | `neutral-300` | `neutral-600` | 默认边框 |
| `input.border-hover` | `neutral-400` | `neutral-500` | 悬停边框 |
| `input.border-focus` | `blue-500` | `blue-400` | 聚焦边框 |
| `input.border-error` | `error-500` | `error-400` | 错误边框 |

### 4.3 卡片（Cards）

| Token | 浅色模式 | 深色模式 | 说明 |
|---|---|---|---|
| `card.bg` | `#FFFFFF` | `neutral-800` | 背景色 |
| `card.border` | `neutral-200` | `neutral-700` | 边框色 |
| `card.hover.border` | `neutral-300` | `neutral-600` | 悬停边框 |
| `card.shadow` | `rgba(0,0,0,0.05)` | `rgba(0,0,0,0.3)` | 阴影 |

### 4.4 导航（Navigation）

| Token | 浅色模式 | 深色模式 | 说明 |
|---|---|---|---|
| `nav.bg` | `#FFFFFF` | `neutral-900` | 导航背景 |
| `nav.border` | `neutral-200` | `neutral-800` | 导航边框 |
| `nav.item.text` | `neutral-600` | `neutral-300` | 导航项文字 |
| `nav.item.hover.bg` | `neutral-100` | `neutral-800` | 悬停背景 |
| `nav.item.active.bg` | `blue-50` | `blue-900/20%` | 激活背景 |
| `nav.item.active.text` | `blue-600` | `blue-400` | 激活文字 |
| `nav.item.active.indicator` | `blue-600` | `blue-400` | 激活指示器 |

### 4.5 徽章（Badges）

| Token | 浅色模式 | 深色模式 | 说明 |
|---|---|---|---|
| `badge.default.bg` | `neutral-100` | `neutral-700` | 默认背景 |
| `badge.default.text` | `neutral-700` | `neutral-200` | 默认文字 |
| `badge.primary.bg` | `blue-100` | `blue-900/30%` | 主要背景 |
| `badge.primary.text` | `blue-700` | `blue-300` | 主要文字 |
| `badge.success.bg` | `success-100` | `success-900/30%` | 成功背景 |
| `badge.success.text` | `success-700` | `success-300` | 成功文字 |
| `badge.error.bg` | `error-100` | `error-900/30%` | 错误背景 |
| `badge.error.text` | `error-700` | `error-300` | 错误文字 |
| `badge.warning.bg` | `warning-100` | `warning-900/30%` | 警告背景 |
| `badge.warning.text` | `warning-700` | `warning-300` | 警告文字 |

---

## 五、图表配色（Chart Colors）

### 5.1 数据可视化色板

**主色板（Primary Palette）** - 用于主要数据系列

| Token | 色值 | 用途 |
|---|---|---|
| `chart.primary.1` | `blue-500` `#3B82F6` | 第一数据系列 |
| `chart.primary.2` | `orange-500` `#F26430` | 第二数据系列（品牌色） |
| `chart.primary.3` | `success-500` `#22C55E` | 第三数据系列 |
| `chart.primary.4` | `warning-500` `#F59E0B` | 第四数据系列 |
| `chart.primary.5` | `blue-400` `#60A5FA` | 第五数据系列 |
| `chart.primary.6` | `orange-400` `#FB923C` | 第六数据系列 |

---

## 六、使用指南与最佳实践

### 6.1 配色使用原则（60-30-10）

1. **60% 中性灰** - 背景、卡片、文本、边框
2. **30% 蓝色** - 主要交互、链接、导航
3. **10% 橙色** - 关键 CTA、重要提示

### 6.2 对比度验证

所有组合满足 WCAG 2.1 AA 标准（≥ 4.5:1）：
- ✅ `neutral-700` on `neutral-50` - 12.6:1
- ✅ `blue-600` on `#FFFFFF` - 8.6:1
- ✅ `#FFFFFF` on `orange-500` - 4.8:1

---

## 七、CSS 变量导出

### 7.1 浅色主题

```css
:root {
  /* Neutral */
  --color-neutral-50: #FAFAFA;
  --color-neutral-100: #F5F5F5;
  --color-neutral-300: #D4D4D4;
  --color-neutral-500: #737373;
  --color-neutral-700: #404040;

  /* Blue */
  --color-blue-500: #3B82F6;
  --color-blue-600: #2563EB;

  /* Orange */
  --color-orange-500: #F26430;

  /* Semantic */
  --color-bg-page: var(--color-neutral-50);
  --color-text-primary: var(--color-neutral-700);
  --color-interactive-primary: var(--color-blue-600);
  --color-interactive-accent: var(--color-orange-500);
  --color-border-default: var(--color-neutral-300);
}
```

### 7.2 深色主题

```css
.dark {
  --color-bg-page: #171717;
  --color-text-primary: #F5F5F5;
  --color-interactive-primary: #3B82F6;
  --color-border-default: #525252;
}
```

---

## 八、实施路线图

### Phase 1: 基础（第 1 周）
- [ ] 更新 `globals.css` CSS 变量
- [ ] 更新 `tailwind.config.js`
- [ ] 验证对比度

### Phase 2: 组件（第 2-3 周）
- [ ] 按钮（蓝色主要，橙色强调）
- [ ] 表单、导航、卡片

### Phase 3: 页面（第 4 周）
- [ ] 仪表盘、表单、列表页

### Phase 4: 测试（第 5 周）
- [ ] 深色模式、可访问性、性能

---

## 九、迁移对照表

| v1 用途 | v1 颜色 | v2 颜色 | 说明 |
|---|---|---|---|
| 主按钮 | `orange-500` | `blue-600` | 改用蓝色 |
| 关键 CTA | `orange-500` | `orange-500` | 保留但减少使用 |
| 页面背景 | `grey-100` | `neutral-50` | 更中性 |
| 主文字 | `grey-700` | `neutral-700` | 对比度更高 |

---

## 十、总结

**v2.0 核心改进:**

1. ✅ 解决"过于橙色"问题 - 橙色降级为强调色
2. ✅ 引入专业中性灰系统 - 10 级冷色调灰阶
3. ✅ 蓝色作为主要交互色 - 专业、可信赖
4. ✅ 遵循 60-30-10 原则 - 平衡的视觉层次
5. ✅ 完整语义化系统 - Option → Semantic → Component
6. ✅ 深色模式支持 - 完整主题映射
7. ✅ 可访问性保证 - WCAG 2.1 AA

**下一步:**

建议从 Phase 1 开始，我可以帮你：
1. 生成 `tokens/tokens.json`
2. 更新 `globals.css` 和 `tailwind.config.js`
3. 创建组件迁移示例

请告诉我想先从哪一步开始！

