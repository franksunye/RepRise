import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  ArrowLeft,
  Download,
  Share2,
  Clock,
  User,
  FileText,
  History,
  ThumbsUp,
} from 'lucide-react';

export default function PlaybookDetailPage() {
  const playbook = {
    id: 'playbook-1',
    title: '首次电话沟通话术',
    category: '话术脚本',
    version: '1.2.0',
    author: '刘教练',
    lastUpdated: '2024-11-10',
    downloads: 156,
    likes: 45,
    tags: ['电话', '首次沟通', '预约'],
    description:
      '用于首次与客户沟通时的标准话术，提升专业性与转化率，覆盖开场、需求确认、建立信任、预约上门、结束语与常见异议处理等环节。',
    contentType: 'script',
    format: 'docx',
    purpose: ['培训材料', '内部参考', '销售话术'],
    productLine: ['防水维修服务'],
    language: '中文',
    ownerTeam: 'Enablement 团队',
    createdAt: '2024-09-01T10:00:00Z',
    lastModifiedAt: '2024-11-10T08:30:00Z',
    status: '已发布',
    industryVertical: ['家庭维修', '物业维护'],
    buyerPersona: ['价格敏感型客户', '忙碌决策者'],
    dealStage: '线索/初次沟通',
    region: ['国内', '华东'],
    usageRights: '内部使用，仅限员工',
    notes:
      '上架前已由教练审核；适用于首次通话，后续跟进另有脚本；如用于对外，请先征得市场部许可。',
    relatedAssets: [
      { id: 'checklist-1', title: '上门勘查检查清单', href: '/playbook/playbook-2' },
      { id: 'objection-collection', title: '异议处理话术集', href: '#' },
    ],
    customFields: {
      campaign: 'Q4-Conversion-Boost',
      projectCode: 'ENBL-PLBK-0001',
    },
    content: `
# 首次电话沟通话术

## 一、开场白

**目标**: 快速建立信任，确认客户身份

**话术**:
> 您好，我是XX防水维修的管家[姓名]。请问您是[客户姓名]吗？

**要点**:
- 语气友好、专业
- 清晰报出公司和自己的名字
- 确认客户身份

---

## 二、确认需求

**目标**: 了解客户具体情况，展现专业性

**话术**:
> 了解到您家里有漏水问题，方便简单描述一下具体情况吗？
> - 是哪个位置漏水？（卫生间/厨房/阳台/外墙）
> - 大概什么时候发现的？
> - 漏水情况严重吗？

**要点**:
- 认真倾听客户描述
- 适时提问，了解详细情况
- 记录关键信息

---

## 三、建立信任

**目标**: 展现专业性，消除客户顾虑

**话术**:
> 根据您描述的情况，[简单分析]。我们公司专业从事防水维修已经[X]年，
> 处理过很多类似的情况。为了给您提供最准确的解决方案和报价，
> 我建议安排我们的专业师傅上门勘查一下。

**要点**:
- 简单分析问题，展现专业性
- 强调公司经验和专业性
- 自然引出上门勘查

---

## 四、预约上门

**目标**: 确定具体的上门时间

**话术**:
> 我们提供免费上门勘查服务，师傅会带专业工具现场检查，
> 然后给您一个详细的维修方案和报价。您看明天[时间段]或者后天[时间段]，
> 哪个时间方便？

**要点**:
- 强调"免费上门勘查"
- 说明上门会做什么
- 提供2-3个时间选项
- 确认具体时间和地址

---

## 五、结束语

**目标**: 确认信息，留下良好印象

**话术**:
> 好的，那我们约定[日期][时间]，师傅会准时到达。
> 请您保持电话畅通，如果有任何变化请及时联系我。
> 我的电话是[号码]，有任何问题都可以随时联系我。

**要点**:
- 重复确认时间和地址
- 留下联系方式
- 表达期待和感谢

---

## 六、常见异议处理

### 异议1: "你们收费怎么样？"

**回应**:
> 具体费用需要师傅上门勘查后才能确定，因为不同的漏水原因和维修方案，
> 费用是不一样的。我们的报价都是透明的，会详细说明每一项的费用。
> 而且上门勘查是免费的，您可以先了解情况再决定。

### 异议2: "我再考虑考虑"

**回应**:
> 完全理解您需要考虑。不过漏水问题如果不及时处理，可能会越来越严重，
> 也会影响到楼下邻居。我们的免费勘查服务可以帮您先了解具体情况，
> 您看是否先安排师傅上门看看？

### 异议3: "我要比较几家"

**回应**:
> 这个很正常，货比三家是应该的。我们的优势是[公司优势]，
> 而且上门勘查是免费的，不会耽误您太多时间。您可以先让我们的师傅看看，
> 了解具体情况后再做决定。

---

## 七、注意事项

1. **语速适中**: 不要太快，让客户能听清楚
2. **积极倾听**: 让客户充分表达，不要打断
3. **记录信息**: 记录客户的关键信息和需求
4. **保持耐心**: 对客户的疑问要耐心解答
5. **确认信息**: 结束前一定要确认时间和地址
6. **及时跟进**: 预约后要及时在系统中记录

---

## 八、成功案例

**案例1**: 张女士家卫生间漏水
- 情况: 卫生间天花板漏水，比较着急
- 处理: 当天安排上门，快速响应赢得信任
- 结果: 顺利成交，客户满意度高

**案例2**: 李先生老房子防水
- 情况: 房龄20年，担心防水问题
- 处理: 详细解释防水重要性，提供专业建议
- 结果: 客户认可专业性，签约整体防水

---

## 版本历史

- **v1.2.0** (2024-11-10): 增加成功案例，优化异议处理话术
- **v1.1.0** (2024-10-15): 增加常见异议处理部分
- **v1.0.0** (2024-09-01): 初始版本
    `,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex gap-4 items-center">
        <Link href="/playbook">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex gap-2 items-center mb-1">
            <h1 className="text-3xl font-bold text-gray-900">{playbook.title}</h1>
            <Badge variant="outline">{playbook.category}</Badge>
            <Badge variant="secondary">v{playbook.version}</Badge>
          </div>
          <div className="flex gap-4 items-center text-sm text-gray-600">
            <span className="flex gap-1 items-center">
              <User className="w-4 h-4" />
              {playbook.author}
            </span>
            <span className="flex gap-1 items-center">
              <Clock className="w-4 h-4" />
              更新于 {new Date(playbook.lastUpdated).toLocaleDateString('zh-CN')}
            </span>
            <span className="flex gap-1 items-center">
              <Download className="w-4 h-4" />
              {playbook.downloads} 次下载
            </span>
            <span className="flex gap-1 items-center">
              <ThumbsUp className="w-4 h-4" />
              {playbook.likes} 人点赞
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button>
            <Download className="mr-2 w-4 h-4" />
            下载 PDF
          </Button>
          <Button variant="outline">
            <Share2 className="mr-2 w-4 h-4" />
            分享
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex gap-2 items-center">
                <FileText className="w-5 h-5" />
                内容详情
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-w-none prose prose-sm">
                <div className="text-sm leading-relaxed">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code: (props: any) => {
                        const { inline, className, children, ...rest } = props;
                        const match = /language-(\w+)/.exec(className || '');
                        if (!inline && match) {
                          return (
                            <pre className="overflow-auto p-4 text-xs text-white bg-gray-900 rounded-md">
                              <code className={className} {...rest}>
                                {String(children).replace(/\n$/, '')}
                              </code>
                            </pre>
                          );
                        }
                        return (
                          <code className="px-1 text-xs bg-gray-100 rounded" {...rest}>
                            {children}
                          </code>
                        );
                      },
                      a: (props: any) => {
                        const { href, children, ...rest } = props;
                        const isExternal = typeof href === 'string' && !href.startsWith('/');
                        return (
                          <a
                            href={href}
                            {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                            {...rest}
                            className="text-primary hover:underline"
                          >
                            {children}
                          </a>
                        );
                      },
                    }}
                  >
                    {playbook.content}
                  </ReactMarkdown>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Metadata */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">元数据</CardTitle>
              <CardDescription>内容资产的基础信息与扩展字段</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="text-xs text-gray-500">必填字段</div>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex gap-4 justify-between">
                    <span className="text-sm text-gray-600">唯一标识</span>
                    <span className="text-sm font-medium">{playbook.id}</span>
                  </div>
                  <div className="flex gap-4 justify-between">
                    <span className="text-sm text-gray-600">标题</span>
                    <span className="text-sm font-medium">{playbook.title}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-gray-600">摘要</span>
                    <span className="text-sm">{playbook.description}</span>
                  </div>
                  <div className="flex gap-4 justify-between">
                    <span className="text-sm text-gray-600">内容类型</span>
                    <Badge variant="outline" className="text-xs">{playbook.contentType}</Badge>
                  </div>
                  <div className="flex gap-4 justify-between">
                    <span className="text-sm text-gray-600">文件格式</span>
                    <Badge variant="secondary" className="text-xs">{playbook.format}</Badge>
                  </div>
                  <div className="flex gap-4 justify-between">
                    <span className="text-sm text-gray-600">语言</span>
                    <span className="text-sm">{playbook.language}</span>
                  </div>
                  <div className="flex gap-4 justify-between">
                    <span className="text-sm text-gray-600">归属团队</span>
                    <span className="text-sm">{playbook.ownerTeam}</span>
                  </div>
                  <div className="flex gap-4 justify-between">
                    <span className="text-sm text-gray-600">创建时间</span>
                    <span className="text-sm">{new Date(playbook.createdAt).toLocaleString('zh-CN')}</span>
                  </div>
                  <div className="flex gap-4 justify-between">
                    <span className="text-sm text-gray-600">最近修改</span>
                    <span className="text-sm">{new Date(playbook.lastModifiedAt).toLocaleString('zh-CN')}</span>
                  </div>
                  <div className="flex gap-4 justify-between">
                    <span className="text-sm text-gray-600">状态</span>
                    <Badge className="text-xs">{playbook.status}</Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs text-gray-500">推荐字段</div>
                <div className="space-y-2">
                  <div>
                    <div className="mb-1 text-sm text-gray-600">用途/场景</div>
                    <div className="flex flex-wrap gap-2">
                      {playbook.purpose.map((p: string, i: number) => (
                        <Badge key={i} variant="outline" className="text-xs">{p}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 text-sm text-gray-600">产品/业务线</div>
                    <div className="flex flex-wrap gap-2">
                      {playbook.productLine.map((p: string, i: number) => (
                        <Badge key={i} variant="secondary" className="text-xs">{p}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 text-sm text-gray-600">行业(Vertical)</div>
                    <div className="flex flex-wrap gap-2">
                      {playbook.industryVertical.map((v: string, i: number) => (
                        <Badge key={i} variant="outline" className="text-xs">{v}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 text-sm text-gray-600">买家画像</div>
                    <div className="flex flex-wrap gap-2">
                      {playbook.buyerPersona.map((v: string, i: number) => (
                        <Badge key={i} variant="outline" className="text-xs">{v}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-4 justify-between">
                    <span className="text-sm text-gray-600">销售阶段</span>
                    <span className="text-sm">{playbook.dealStage}</span>
                  </div>
                  <div>
                    <div className="mb-1 text-sm text-gray-600">区域/市场</div>
                    <div className="flex flex-wrap gap-2">
                      {playbook.region.map((r: string, i: number) => (
                        <Badge key={i} variant="outline" className="text-xs">{r}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-4 justify-between">
                    <span className="text-sm text-gray-600">使用权限</span>
                    <span className="text-sm">{playbook.usageRights}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-gray-600">备注</span>
                    <span className="text-sm">{playbook.notes}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs text-gray-500">关联与扩展</div>
                <div className="space-y-3">
                  <div>
                    <div className="mb-1 text-sm text-gray-600">关联内容</div>
                    <div className="space-y-1">
                      {playbook.relatedAssets.map((a: any) => (
                        <div key={a.id} className="flex justify-between items-center">
                          <Link href={a.href} className="text-sm font-medium hover:text-primary">{a.title}</Link>
                          <Badge variant="outline" className="text-xs">{a.id}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 text-sm text-gray-600">自定义字段</div>
                    <pre className="overflow-auto p-3 text-xs bg-gray-100 rounded">
                      {JSON.stringify(playbook.customFields, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">标签</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {playbook.tags.map((tag, idx) => (
                  <Badge key={idx} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Version History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex gap-2 items-center text-lg">
                <History className="w-4 h-4" />
                版本历史
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">v1.2.0</span>
                  <Badge variant="success" className="text-xs">
                    当前版本
                  </Badge>
                </div>
                <p className="text-xs text-gray-600">2024-11-10</p>
                <p className="mt-1 text-xs text-gray-600">
                  增加成功案例，优化异议处理话术
                </p>
              </div>
              <div className="text-sm">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">v1.1.0</span>
                </div>
                <p className="text-xs text-gray-600">2024-10-15</p>
                <p className="mt-1 text-xs text-gray-600">增加常见异议处理部分</p>
              </div>
              <div className="text-sm">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">v1.0.0</span>
                </div>
                <p className="text-xs text-gray-600">2024-09-01</p>
                <p className="mt-1 text-xs text-gray-600">初始版本</p>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">操作</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" variant="outline">
                <ThumbsUp className="mr-2 w-4 h-4" />
                点赞
              </Button>
              <Button className="w-full" variant="outline">
                <Share2 className="mr-2 w-4 h-4" />
                分享给同事
              </Button>
              <Button className="w-full" variant="outline">
                打印
              </Button>
            </CardContent>
          </Card>

          {/* Related Content */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">相关内容</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <Link href="/playbook/playbook-2" className="font-medium hover:text-primary">
                  上门勘查检查清单
                </Link>
                <p className="mt-1 text-xs text-gray-600">勘查 · 检查清单</p>
              </div>
              <div className="text-sm">
                <Link href="#" className="font-medium hover:text-primary">
                  电话跟进话术
                </Link>
                <p className="mt-1 text-xs text-gray-600">跟进 · 话术脚本</p>
              </div>
              <div className="text-sm">
                <Link href="#" className="font-medium hover:text-primary">
                  异议处理话术集
                </Link>
                <p className="mt-1 text-xs text-gray-600">异议 · 话术脚本</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
