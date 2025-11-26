import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
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
  const params = useSearchParams();
  const initialCategory = params.get('category') || 'all';
  const [q, setQ] = useState('');
  const [category, setCategory] = useState<string>(initialCategory);
  const [tag, setTag] = useState<string>('all');
  const [author, setAuthor] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('updated_desc');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const items = mockPlaybooks;
  const allTags = useMemo(() => {
    const m = new Map<string, number>();
    items.forEach(i => {
      (i.tags || []).forEach(t => m.set(t, (m.get(t) || 0) + 1));
    });
    return Array.from(m.entries()).sort((a,b) => b[1]-a[1]);
  }, [items]);
  const filtered = useMemo(() => {
    return items.filter(i => {
      const matchesQ = q ? [i.title, i.author, (i.tags || []).join(' ')].some(t => t.toLowerCase().includes(q.toLowerCase())) : true;
      const matchesCategory = category === 'all' ? true : i.category === category;
      const matchesTag = tag === 'all' ? true : (i.tags || []).includes(tag);
      const matchesAuthor = author === 'all' ? true : i.author === author;
      return matchesQ && matchesCategory && matchesTag && matchesAuthor;
    }).sort((a,b) => {
      if (sortBy === 'updated_desc') return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      if (sortBy === 'updated_asc') return new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime();
      if (sortBy === 'popular_desc') return (b.downloads||0) - (a.downloads||0);
      if (sortBy === 'popular_asc') return (a.downloads||0) - (b.downloads||0);
      if (sortBy === 'title_asc') return a.title.localeCompare(b.title);
      if (sortBy === 'title_desc') return b.title.localeCompare(a.title);
      return 0;
    });
  }, [items, q, category, tag, author, sortBy]);
  const authors = useMemo(() => Array.from(new Set(items.map(i => i.author))), [items]);
  const popular = useMemo(() => [...items].sort((a,b) => (b.downloads||0)-(a.downloads||0)).slice(0,4), [items]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const toggleFav = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id]);
  };
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">内容中心</h1>
        <p className="text-gray-600 mt-1">查找和使用销售话术、模板和最佳实践</p>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="搜索标题/作者/标签"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <select value={category} onChange={(e)=>setCategory(e.target.value)} className="rounded-lg border px-3 py-2 text-sm">
              <option value="all">全部类型</option>
              <option value="script">话术脚本</option>
              <option value="template">报价模板</option>
              <option value="checklist">检查清单</option>
              <option value="objection-handling">异议处理</option>
            </select>
            <select value={tag} onChange={(e)=>setTag(e.target.value)} className="rounded-lg border px-3 py-2 text-sm">
              <option value="all">全部标签</option>
              {allTags.map(([t]) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <select value={author} onChange={(e)=>setAuthor(e.target.value)} className="rounded-lg border px-3 py-2 text-sm">
              <option value="all">全部作者</option>
              {authors.map(a => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
            <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)} className="rounded-lg border px-3 py-2 text-sm">
              <option value="updated_desc">更新时间（新→旧）</option>
              <option value="updated_asc">更新时间（旧→新）</option>
              <option value="popular_desc">热度（高→低）</option>
              <option value="popular_asc">热度（低→高）</option>
              <option value="title_asc">标题（A→Z）</option>
              <option value="title_desc">标题（Z→A）</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <Button variant={view==='grid'?'default':'outline'} size="sm" onClick={()=>setView('grid')}>卡片视图</Button>
            <Button variant={view==='list'?'default':'outline'} size="sm" onClick={()=>setView('list')}>列表视图</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>标签云</CardTitle>
          <CardDescription>常用标签聚合</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {allTags.map(([t,c]) => (
              <Badge key={t} variant="outline" className="text-xs">
                {t} {c}
              </Badge>
            ))}
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
            {popular.map((item) => {
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
                      <Button variant="ghost" size="sm" onClick={()=>toggleFav(item.id)}>
                        收藏
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
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>全部内容</CardTitle>
              <CardDescription>卡片/列表视图，支持搜索筛选排序</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)} className="rounded-lg border px-3 py-2 text-sm">
                <option value="updated_desc">更新时间（新→旧）</option>
                <option value="updated_asc">更新时间（旧→新）</option>
                <option value="popular_desc">热度（高→低）</option>
                <option value="popular_asc">热度（低→高）</option>
                <option value="title_asc">标题（A→Z）</option>
                <option value="title_desc">标题（Z→A）</option>
              </select>
              <Button size="sm" variant={view==='grid'?'default':'outline'} onClick={()=>setView('grid')}>卡片</Button>
              <Button size="sm" variant={view==='list'?'default':'outline'} onClick={()=>setView('list')}>列表</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {view === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map(item => {
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
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-base truncate">{item.title}</CardTitle>
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="outline" className="text-xs">{categoryNames[item.category]}</Badge>
                            <Badge variant="secondary" className="text-xs">v{item.version}</Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-4 text-xs text-gray-600">
                        <span className="flex items-center gap-1"><User className="h-3 w-3" />{item.author}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{new Date(item.lastUpdated).toLocaleDateString('zh-CN')}</span>
                        <span className="flex items-center gap-1"><Download className="h-3 w-3" />{item.downloads}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map((t, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">{t}</Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/content/${item.id}`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full">查看详情</Button>
                        </Link>
                        <Button variant="ghost" size="sm">收藏</Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map(item => (
                <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{item.title}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">{item.category}</Badge>
                        <Badge variant="secondary" className="text-xs">v{item.version}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-600">
                    <span className="flex items-center gap-1"><User className="h-3 w-3" />{item.author}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{new Date(item.lastUpdated).toLocaleDateString('zh-CN')}</span>
                    <span className="flex items-center gap-1"><Download className="h-3 w-3" />{item.downloads}</span>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/content/${item.id}`}>
                      <Button variant="outline" size="sm">查看详情</Button>
                    </Link>
                    <Button variant="ghost" size="sm">收藏</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
