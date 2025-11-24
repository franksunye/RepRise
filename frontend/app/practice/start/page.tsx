'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Users, Target, PlayCircle } from 'lucide-react';

const personaPresets = [
  { id: 'price-sensitive', name: '价格敏感型客户', desc: '关注价格与优惠，需要更多价值铺垫' },
  { id: 'busy-decision-maker', name: '忙碌决策者', desc: '时间有限，偏好直奔主题与明确下一步' },
  { id: 'tech-expert', name: '技术专家', desc: '重视技术细节与专业解释' },
];

const typeOptions = [
  { id: 'cold-call', name: '电话沟通', difficulty: '初级' },
  { id: 'follow-up', name: '电话跟进', difficulty: '中级' },
  { id: 'on-site', name: '上门勘查', difficulty: '中级' },
  { id: 'pricing', name: '报价谈判', difficulty: '高级' },
  { id: 'objection', name: '异议处理', difficulty: '高级' },
];

export default function PracticeStartPage() {
  const router = useRouter();
  const params = useSearchParams();
  const presetSessionId = params.get('sessionId');

  const [persona, setPersona] = useState<string>(personaPresets[0].name);
  const [type, setType] = useState<string>('cold-call');

  const startPractice = () => {
    if (type === 'cold-call') {
      router.push('/practice/cold-call');
      return;
    }
    // 其他类型暂用占位，后续扩展到对应页面
    router.push('/practice');
  };

  return (
    <Suspense fallback={null}>
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/practice/sessions">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">开始练习</h1>
          <p className="text-gray-600 mt-1">选择买家角色 Persona 与练习类型</p>
        </div>
      </div>

      {presetSessionId && (
        <Card>
          <CardHeader>
            <CardTitle>继续未完成的会话</CardTitle>
            <CardDescription>会话ID：{presetSessionId}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">将基于该会话继续进行练习。</p>
          </CardContent>
        </Card>
      )}

      {/* Persona 选择 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>选择买家角色 (Persona)</CardTitle>
              <CardDescription>根据目标客户设定模拟角色与语气</CardDescription>
            </div>
            <Users className="h-5 w-5 text-gray-400" />
          </div>
        </CardHeader>
        <CardContent>
          <Select value={persona} onValueChange={setPersona}>
            <SelectTrigger className="w-full md:w-1/2">
              <SelectValue placeholder="选择 Persona" />
            </SelectTrigger>
            <SelectContent>
              {personaPresets.map((p) => (
                <SelectItem key={p.id} value={p.name}>{p.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {personaPresets.map((p) => (
              <Card key={p.id} className={`border ${persona === p.name ? 'border-primary' : ''}`}>
                <CardHeader>
                  <CardTitle className="text-base">{p.name}</CardTitle>
                  <CardDescription>{p.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 练习类型 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>选择练习类型</CardTitle>
              <CardDescription>电话/跟进/上门勘查/报价/异议处理</CardDescription>
            </div>
            <Target className="h-5 w-5 text-gray-400" />
          </div>
        </CardHeader>
        <CardContent>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-full md:w-1/2">
              <SelectValue placeholder="选择练习类型" />
            </SelectTrigger>
            <SelectContent>
              {typeOptions.map((t) => (
                <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-4">
            {typeOptions.map((t) => (
              <Card key={t.id} className={`border ${type === t.id ? 'border-primary' : ''}`}>
                <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{t.name}</CardTitle>
                  <Badge variant={t.difficulty === '初级' ? 'success' : t.difficulty === '中级' ? 'default' : 'warning'}>
                    {t.difficulty}
                  </Badge>
                </div>
                <CardDescription>示例场景：3-5个</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Start Btn */}
      <div className="flex items-center gap-2">
        <Button onClick={startPractice}>
          <PlayCircle className="h-4 w-4 mr-2" />
          开始练习
        </Button>
        <Link href="/practice">
          <Button variant="outline">返回练习主页</Button>
        </Link>
      </div>
    </div>
    </Suspense>
  );
}
