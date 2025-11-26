import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Download, Share2, Clock, User, FileText, History, ThumbsUp } from 'lucide-react';

export default function ContentDetailPage() {
  const playbook = {
    id: 'playbook-1',
    title: '首次电话沟通话术',
    category: '话术脚本',
    version: '1.2.0',
    author: '刘教练',
    lastUpdated: '2024-11-10',
    downloads: 156,
    likes: 78,
    tags: ['电话', '首次沟通', '预约上门'],
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
      { id: 'checklist-1', title: '上门勘查检查清单', href: '/content/playbook-2' },
    ],
    customFields: {
      campaign: 'Q4-Conversion-Boost',
      projectCode: 'ENBL-PLBK-0001',
    },
    content: `
## 目的

用于首次与客户沟通时的标准话术，提升专业性与转化率

---

## 版本历史

- **v1.2.0** (2024-11-10): 增加成功案例，优化异议处理话术
- **v1.1.0** (2024-10-15): 增加常见异议处理部分
- **v1.0.0** (2024-09-01): 初始版本
    `,
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/content">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-3xl font-bold text-gray-900">{playbook.title}</h1>
            <Badge variant="outline">{playbook.category}</Badge>
            <Badge variant="secondary">v{playbook.version}</Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {playbook.author}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              更新于 {new Date(playbook.lastUpdated).toLocaleDateString('zh-CN')}
            </span>
            <span className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              {playbook.downloads} 次下载
            </span>
            <span className="flex items-center gap-1">
              <ThumbsUp className="h-4 w-4" />
              {playbook.likes} 人点赞
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button>
            <Download className="h-4 w-4 mr-2" />
            下载 PDF
          </Button>
          <Button variant="outline">
            <Share2 className="h-4 w-4 mr-2" />
            分享
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                内容详情
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
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

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">元数据</CardTitle>
              <CardDescription>内容资产的基础信息与扩展字段</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="text-xs text-gray-500">必填字段</div>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-600 text-sm">唯一标识</span>
                    <span className="text-sm font-medium">{playbook.id}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-600 text-sm">标题</span>
                    <span className="text-sm font-medium">{playbook.title}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-600 text-sm">摘要</span>
                    <span className="text-sm">{playbook.description}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-600 text-sm">内容类型</span>
                    <Badge variant="outline" className="text-xs">{playbook.contentType}</Badge>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-600 text-sm">文件格式</span>
                    <Badge variant="secondary" className="text-xs">{playbook.format}</Badge>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-600 text-sm">语言</span>
                    <span className="text-sm">{playbook.language}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-600 text-sm">归属团队</span>
                    <span className="text-sm">{playbook.ownerTeam}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-600 text-sm">创建时间</span>
                    <span className="text-sm">{new Date(playbook.createdAt).toLocaleString('zh-CN')}</span>
                  </div>
                  <div className="flex justify之间 gap-4">
                    <span className="text-gray-600 text-sm">最近修改</span>
                    <span className="text-sm">{new Date(playbook.lastModifiedAt).toLocaleString('zh-CN')}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-600 text-sm">状态</span>
                    <Badge className="text-xs">{playbook.status}</Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs text-gray-500">推荐字段</div>
                <div className="space-y-2">
                  <div>
                    <div className="text-gray-600 text-sm mb-1">用途/场景</div>
                    <div className="flex flex-wrap gap-2">
                      {playbook.purpose.map((p: string, i: number) => (
                        <Badge key={i} variant="outline" className="text-xs">{p}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600 text-sm mb-1">产品/业务线</div>
                    <div className="flex flex-wrap gap-2">
                      {playbook.productLine.map((p: string, i: number) => (
                        <Badge key={i} variant="secondary" className="text-xs">{p}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600 text-sm mb-1">行业(Vertical)</div>
                    <div className="flex flex-wrap gap-2">
                      {playbook.industryVertical.map((v: string, i: number) => (
                        <Badge key={i} variant="outline" className="text-xs">{v}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600 text-sm mb-1">买家画像</div>
                    <div className="flex flex-wrap gap-2">
                      {playbook.buyerPersona.map((v: string, i: number) => (
                        <Badge key={i} variant="outline" className="text-xs">{v}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-600 text-sm">销售阶段</span>
                    <span className="text-sm">{playbook.dealStage}</span>
                  </div>
                  <div>
                    <div className="text-gray-600 text-sm mb-1">区域/市场</div>
                    <div className="flex flex-wrap gap-2">
                      {playbook.region.map((r: string, i: number) => (
                        <Badge key={i} variant="outline" className="text-xs">{r}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-600 text-sm">使用权限</span>
                    <span className="text-sm">{playbook.usageRights}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-600 text-sm">备注</span>
                    <span className="text-sm">{playbook.notes}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs text-gray-500">关联与扩展</div>
                <div className="space-y-3">
                  <div>
                    <div className="text-gray-600 text-sm mb-1">关联内容</div>
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
                    <div className="text-gray-600 text-sm mb-1">自定义字段</div>
                    <pre className="bg-gray-100 rounded p-3 text-xs overflow-auto">
                      {JSON.stringify(playbook.customFields, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
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
                  <Badge variant="success" className="text-xs">当前版本</Badge>
                </div>
                <p className="text-xs text-gray-600">2024-11-10</p>
                <p className="mt-1 text-xs text-gray-600">增加成功案例，优化异议处理话术</p>
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
              <Button className="w-full" variant="outline">打印</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">相关内容</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {playbook.relatedAssets.map((a: any) => (
                <div key={a.id} className="text-sm">
                  <Link href={a.href} className="font-medium hover:text-primary">
                    {a.title}
                  </Link>
                  <p className="text-gray-600 text-xs mt-1">关联 ID：{a.id}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
