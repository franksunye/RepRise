# Coach Task Detail 页面集成设计

## 整体架构

```
coach/dashboard (教练仪表盘)
    ↓ 点击待处理任务
coach/tasks (任务列表)
    ↓ 点击任务标题/查看按钮
coach/tasks/[id] (任务详情) ← 核心集成枢纽
    ├─→ coach/feedback/[id] (反馈详情)
    ├─→ coach/reps/[repId] (代表详情)
    └─→ coach/dashboard (返回仪表盘)
```

## 1. 与 coach/dashboard 的集成

### 数据流向
- **Dashboard** 显示待处理任务列表（前5个）
- 点击任务 → 进入 `/coach/tasks/[id]` 详情页
- 详情页顶部有"返回"按钮 → 回到 Dashboard

### 实现细节
```typescript
// 详情页顶部导航
<Button variant="ghost" size="icon" onClick={() => router.back()}>
  <ArrowLeft className="h-4 w-4" />
</Button>
```

### 用户体验
1. 教练打开 Dashboard
2. 看到"待处理任务"卡片，显示5个任务
3. 点击某个任务 → 进入详情页
4. 查看完整信息后，点击返回 → 回到 Dashboard

---

## 2. 与 coach/tasks 的集成

### 数据流向
- **Tasks 列表页** 显示所有任务（支持过滤）
- 点击任务标题或查看按钮 → 进入 `/coach/tasks/[id]`
- 详情页完成操作后，返回列表

### 实现细节
```typescript
// 任务列表中的链接
<Link href={`/coach/tasks/${task.id}`} className="font-medium hover:text-primary">
  {task.title}
</Link>

// 查看按钮
<Button asChild>
  <Link href={`/coach/tasks/${task.id}`}>
    <Eye className="h-4 w-4" />
  </Link>
</Button>
```

### 用户体验
1. 教练进入 `/coach/tasks`
2. 使用过滤控件筛选任务
3. 点击任务标题 → 进入详情页
4. 在详情页标记完成或编辑
5. 返回列表，看到任务状态已更新

---

## 3. 与 coach/feedback 的集成

### 数据流向
- **Task Detail** 显示"复盘/反馈"部分
- 每个反馈卡片显示反馈内容、评分、标签
- 点击"查看完整反馈" → 进入 `/coach/feedback/[id]`
- 在反馈详情页可查看完整反馈和关联行动项

### 实现细节
```typescript
// 反馈卡片中的链接
<Button asChild size="sm" variant="outline">
  <Link href={`/coach/feedback/${feedback.id}`}>
    查看完整反馈
  </Link>
</Button>

// 反馈内容展示
{relatedFeedbacks.map(feedback => (
  <div key={feedback.id} className="border rounded-lg p-4">
    <Badge variant="secondary">{feedback.source}</Badge>
    <p className="text-sm text-gray-700">{feedback.content}</p>
    {feedback.score && <p className="text-2xl font-bold">{feedback.score}</p>}
  </div>
))}
```

### 用户体验
1. 教练打开任务详情页
2. 看到"复盘/反馈"部分，显示相关反馈摘要
3. 点击"查看完整反馈" → 进入反馈详情页
4. 在反馈详情页查看完整内容、评分、标签、行动项
5. 可在反馈详情页编辑行动项
6. 返回任务详情页，继续查看其他信息

---

## 4. 关键集成点

### 4.1 数据关联
```typescript
// Task 包含关联的反馈和信号 IDs
relatedSignalIds: ['sig-1', 'sig-4']
relatedFeedbackIds: ['feedback-1']
relatedActionItemIds: ['action-item-1', 'action-item-2']

// 通过 useMemo 动态获取关联数据
const relatedFeedbacks = useMemo(() => {
  return mockFeedbacks.filter(f => 
    task.relatedFeedbackIds?.includes(f.id)
  );
}, [task]);
```

### 4.2 导航链接
- **代表头像/名字** → 可链接到 `/coach/reps/[repId]`
- **反馈卡片** → 链接到 `/coach/feedback/[id]`
- **返回按钮** → 使用 `router.back()` 返回上一页
- **任务标题** → 从列表页链接到详情页

### 4.3 状态同步
```typescript
// 行动项完成状态
const [completedActionItems, setCompletedActionItems] = useState<Set<string>>(new Set());

// 完成任务按钮（仅当所有行动项完成时启用）
<Button disabled={!allActionItemsCompleted && relatedActionItems.length > 0}>
  完成任务
</Button>
```

---

## 5. 用户旅程示例

### 场景：教练需要跟进销售代表的异议处理能力

1. **Dashboard** → 看到"待处理任务"中有"异议处理专项训练"
2. **点击任务** → 进入 `/coach/tasks/4`
3. **查看任务详情**：
   - 看到任务描述：针对性练习各种客户异议的处理方法
   - 看到"关联信号"：显示 3 次异议、无下一步明确
   - 看到"复盘反馈"：上次练习的反馈摘要
4. **点击"查看完整反馈"** → 进入 `/coach/feedback/feedback-1`
5. **在反馈详情页**：
   - 查看完整反馈内容
   - 看到 3 个关联行动项
   - 标记某个行动项为完成
6. **返回任务详情页** → 看到行动项状态已更新
7. **点击"完成任务"** → 任务标记为完成
8. **返回任务列表** → 看到任务状态已更新为"已完成"

---

## 6. 技术实现要点

### 6.1 数据流
```
Mock Data (mockTasks, mockFeedbacks, mockActionItems, mockCoachingSignals)
    ↓
Task Detail Page (获取关联数据)
    ├─ relatedFeedbacks (通过 useMemo 过滤)
    ├─ relatedActionItems (通过 useMemo 过滤)
    └─ relatedSignals (通过 useMemo 过滤)
    ↓
UI 组件 (显示和交互)
    ├─ 反馈卡片 (可点击进入详情)
    ├─ 行动项列表 (可标记完成)
    └─ 信号卡片 (可查看通话)
```

### 6.2 导航模式
- **深链接**：直接访问 `/coach/tasks/1` 可进入详情页
- **面包屑**：返回按钮支持返回上一页
- **跨页面链接**：反馈卡片链接到反馈详情页
- **状态保持**：使用 `router.back()` 保持列表页的过滤状态

### 6.3 组件复用
- **Avatar + 名字** 组件在 Dashboard、Tasks、Task Detail 中复用
- **Badge** 组件用于状态、优先级、标签
- **Card** 组件用于信息分组
- **Button** 组件用于操作

---

## 7. 未来扩展

- [ ] 添加代表详情页链接 (`/coach/reps/[repId]`)
- [ ] 添加通话详情页链接 (Coaching Signals)
- [ ] 实现实时状态同步 (WebSocket)
- [ ] 添加任务编辑功能
- [ ] 添加行动项编辑功能
- [ ] 实现任务模板功能

