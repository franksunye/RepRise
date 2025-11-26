import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{playbook.content}</ReactMarkdown>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
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
              <CardTitle className="text-lg">相关内容</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <Link href="/content/playbook-2" className="font-medium hover:text-primary">
                  上门勘查检查清单
                </Link>
                <p className="text-gray-600 text-xs mt-1">勘查 · 检查清单</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
