# Coach 模块集成代码示例

## 1. Dashboard → Task Detail 集成

### Dashboard 中的任务卡片
```typescript
// components/coach-dashboard.tsx
const pendingTasks = mockTasks.filter(task =>
  task.coachId === currentCoach.id && 
  (task.status === 'pending' || task.status === 'in-progress')
).slice(0, 5);

{pendingTasks.map(task => (
  <Link href={`/coach/tasks/${task.id}`} key={task.id}>
    <div className="p-3 border rounded-lg hover:bg-gray-50">
      <h4 className="font-medium">{task.title}</h4>
      <p className="text-sm text-gray-600">{task.description}</p>
    </div>
  </Link>
))}
```

---

## 2. Task List → Task Detail 集成

### 任务列表中的链接
```typescript
// app/coach/tasks/page.tsx
{filteredTasks.map((task) => (
  <div key={task.id} className="border rounded-lg p-4">
    <Link href={`/coach/tasks/${task.id}`} 
          className="font-medium hover:text-primary">
      {task.title}
    </Link>
    
    {/* 查看按钮 */}
    <Button asChild size="sm" variant="ghost">
      <Link href={`/coach/tasks/${task.id}`}>
        <Eye className="h-4 w-4" />
      </Link>
    </Button>
  </div>
))}
```

---

## 3. Task Detail → Feedback Detail 集成

### 反馈卡片中的链接
```typescript
// app/coach/tasks/[id]/page.tsx
{relatedFeedbacks.map(feedback => (
  <div key={feedback.id} className="border rounded-lg p-4">
    <Badge variant="secondary">{feedback.source}</Badge>
    <p className="text-sm text-gray-700">{feedback.content}</p>
    {feedback.score && (
      <p className="text-2xl font-bold text-yellow-500">
        {feedback.score}
      </p>
    )}
    
    {/* 链接到反馈详情页 */}
    <Button asChild size="sm" variant="outline">
      <Link href={`/coach/feedback/${feedback.id}`}>
        查看完整反馈
      </Link>
    </Button>
  </div>
))}
```

---

## 4. Task Detail 中的数据关联

### 获取关联数据
```typescript
// app/coach/tasks/[id]/page.tsx
const relatedSignals = useMemo(() => {
  if (!task) return [];
  return mockCoachingSignals.filter(s => 
    task.relatedSignalIds?.includes(s.id)
  );
}, [task]);

const relatedFeedbacks = useMemo(() => {
  if (!task) return [];
  return mockFeedbacks.filter(f => 
    task.relatedFeedbackIds?.includes(f.id)
  );
}, [task]);

const relatedActionItems = useMemo(() => {
  if (!task) return [];
  return mockActionItems.filter(a => 
    task.relatedActionItemIds?.includes(a.id)
  );
}, [task]);
```

---

## 5. 行动项状态管理

### 标记完成
```typescript
const [completedActionItems, setCompletedActionItems] = 
  useState<Set<string>>(new Set());

const handleMarkActionItemComplete = (itemId: string) => {
  setCompletedActionItems(prev => {
    const newSet = new Set(prev);
    if (newSet.has(itemId)) {
      newSet.delete(itemId);
    } else {
      newSet.add(itemId);
    }
    return newSet;
  });
};

// 检查所有行动项是否完成
const allActionItemsCompleted = relatedActionItems.every(a => 
  completedActionItems.has(a.id) || a.status === 'done'
);

// 完成任务按钮（仅当所有行动项完成时启用）
<Button disabled={!allActionItemsCompleted && relatedActionItems.length > 0}>
  完成任务
</Button>
```

---

## 6. 导航返回

### 返回上一页
```typescript
const router = useRouter();

<Button 
  variant="ghost" 
  size="icon" 
  onClick={() => router.back()}
>
  <ArrowLeft className="h-4 w-4" />
</Button>
```

---

## 7. 代表信息链接（未来扩展）

### 代表头像可链接到代表详情页
```typescript
// 当前实现
<Avatar className="h-10 w-10">
  <AvatarImage src={getRealisticAvatarUrl(rep?.name || '')} />
  <AvatarFallback>{getInitials(rep?.name || '')}</AvatarFallback>
</Avatar>

// 未来可扩展为
<Link href={`/coach/reps/${rep?.id}`}>
  <Avatar className="h-10 w-10 hover:ring-2 ring-primary">
    <AvatarImage src={getRealisticAvatarUrl(rep?.name || '')} />
    <AvatarFallback>{getInitials(rep?.name || '')}</AvatarFallback>
  </Avatar>
</Link>
```

---

## 8. 数据流示例

### 完整的用户交互流程
```
1. Dashboard 加载
   ↓
2. 显示 5 个待处理任务
   ↓
3. 用户点击"电话模拟练习"任务
   ↓
4. 进入 /coach/tasks/1
   ↓
5. 页面加载任务详情、关联反馈、行动项
   ↓
6. 用户看到：
   - 任务信息（类型、优先级、状态）
   - 关联信号（3 次异议）
   - 复盘反馈（上次练习的反馈）
   - 行动建议（3 个待完成的行动项）
   ↓
7. 用户点击"查看完整反馈"
   ↓
8. 进入 /coach/feedback/feedback-1
   ↓
9. 查看完整反馈内容、评分、标签
   ↓
10. 用户返回任务详情页
    ↓
11. 标记行动项为完成
    ↓
12. 点击"完成任务"
    ↓
13. 任务状态更新为"已完成"
    ↓
14. 返回任务列表
    ↓
15. 看到任务状态已更新
```

---

## 9. 关键集成点总结

| 集成点 | 源页面 | 目标页面 | 触发方式 |
|--------|--------|---------|---------|
| 任务详情 | Dashboard | Task Detail | 点击任务卡片 |
| 任务详情 | Task List | Task Detail | 点击标题/查看按钮 |
| 反馈详情 | Task Detail | Feedback Detail | 点击"查看完整反馈" |
| 返回 | Task Detail | Task List | 点击返回按钮 |
| 返回 | Task Detail | Dashboard | 点击返回按钮 |
| 返回 | Feedback Detail | Task Detail | 点击返回按钮 |

---

## 10. 状态同步机制

### 任务完成流程
```typescript
// 1. 标记行动项完成
handleMarkActionItemComplete(itemId)

// 2. 检查所有行动项是否完成
allActionItemsCompleted = relatedActionItems.every(...)

// 3. 启用"完成任务"按钮
<Button disabled={!allActionItemsCompleted}>完成任务</Button>

// 4. 点击完成任务
handleCompleteTask()

// 5. 更新任务状态
setTaskStatus('completed')

// 6. 返回列表，看到状态已更新
```

