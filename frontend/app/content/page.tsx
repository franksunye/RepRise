import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import {
  BookOpen,
  FileText,
  CheckSquare,
  MessageSquare,
  Download,
  Search,
  Filter,
  Clock,
  User,
  TrendingUp,
} from 'lucide-react';
import { mockPlaybooks } from '@/data/mock-data';

const categories = [
  { id: 'all', name: '全部', count: 12 },
  { id: 'script', name: '话术脚本', count: 5, icon: MessageSquare },
  { id: 'template', name: '报价模板', count: 3, icon: FileText },
  { id: 'checklist', name: '检查清单', count: 2, icon: CheckSquare },
  { id: 'objection-handling', name: '异议处理', count: 2, icon: MessageSquare },
];

export default function ContentCenterPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">内容中心</h1>
        <p className="text-gray-600 mt-1">查找和使用销售话术、模板和最佳实践</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="搜索话术、模板、清单..."
                className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              筛选
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => {
          const Icon = category.icon || BookOpen;
          return (
            <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{category.name}</div>
                    <div className="text-sm text-gray-600">{category.count} 项</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>热门内容</CardTitle>
              <CardDescription>最常使用的话术和模板</CardDescription>
            </div>
            <Badge variant="outline" className="text-sm">
              <TrendingUp className="h-3 w-3 mr-1" />
              本周热门
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockPlaybooks.map((item) => {
              const categoryIcons = {
                script: MessageSquare,
                template: FileText,
                checklist: CheckSquare,
                'objection-handling': MessageSquare,
              };
              const Icon = categoryIcons[item.category];
              const categoryNames = {
                script: '话术脚本',
                template: '报价模板',
                checklist: '检查清单',
                'objection-handling': '异议处理',
              };
              return (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <Icon className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg mb-1">{item.title}</CardTitle>
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="outline" className="text-xs">
                              {categoryNames[item.category]}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              v{item.version}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {item.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(item.lastUpdated).toLocaleDateString('zh-CN')}
                      </span>
                      <span className="flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        {item.downloads}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/content/${item.id}`} className="flex-1">
                        <Button variant="outline" className="w-full" size="sm">
                          <BookOpen className="h-4 w-4 mr-2" />
                          查看详情
                        </Button>
                      </Link>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>所有内容</CardTitle>
          <CardDescription>浏览全部话术、模板和清单</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                id: 3,
                title: '异议处理话术集',
                category: '异议处理',
                version: '1.0.0',
                author: '刘教练',
                lastUpdated: '2024-11-08',
                downloads: 145,
                tags: ['异议', '话术', '谈判'],
              },
              {
                id: 4,
                title: '标准报价单模板',
                category: '报价模板',
                version: '2.1.0',
                author: '陈教练',
                lastUpdated: '2024-11-05',
                downloads: 189,
                tags: ['报价', '模板', '标准化'],
              },
              {
                id: 5,
                title: '客户跟进话术',
                category: '话术脚本',
                version: '1.3.0',
                author: '刘教练',
                lastUpdated: '2024-11-01',
                downloads: 167,
                tags: ['跟进', '电话', '客户关系'],
              },
            ].map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4 flex-1">
                  <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{item.title}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">{item.category}</Badge>
                      <Badge variant="secondary" className="text-xs">v{item.version}</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link href={`/content/${item.id}`}>
                    <Button variant="outline" size="sm">查看详情</Button>
                  </Link>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
