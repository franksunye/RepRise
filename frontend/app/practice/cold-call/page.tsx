'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Phone,
  Play,
  Pause,
  RotateCcw,
  Send,
  Mic,
  MicOff,
  Volume2,
  BookOpen,
  ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';

const scenarios = [
  {
    id: 1,
    title: '场景一：首次联系 - 漏水紧急情况',
    description: '客户家里突然漏水，情绪比较焦急，需要快速建立信任并预约上门时间',
    difficulty: '初级',
    customerProfile: '张女士，35岁，家庭主妇，家里卫生间漏水',
  },
  {
    id: 2,
    title: '场景二：首次联系 - 老旧房屋防水',
    description: '客户房屋较老，担心防水问题，需要专业建议',
    difficulty: '中级',
    customerProfile: '李先生，55岁，退休人员，房龄20年',
  },
  {
    id: 3,
    title: '场景三：首次联系 - 价格敏感客户',
    description: '客户对价格比较敏感，需要在不透露具体价格的情况下预约上门',
    difficulty: '高级',
    customerProfile: '王先生，40岁，个体户，对价格比较关注',
  },
];

export default function ColdCallPracticePage() {
  const [selectedScenario, setSelectedScenario] = useState<number | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'ai' | 'user'; content: string }>>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [showScript, setShowScript] = useState(false);

  const handleStartPractice = (scenarioId: number) => {
    setSelectedScenario(scenarioId);
    setIsStarted(true);
    setMessages([
      {
        role: 'ai',
        content: '喂？哪位？',
      },
    ]);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    setMessages([...messages, { role: 'user', content: inputMessage }]);
    setInputMessage('');

    // 模拟 AI 回复
    setTimeout(() => {
      const aiResponses = [
        '嗯，我家卫生间确实有点漏水，你们能上门看看吗？',
        '大概什么时候能来？费用怎么算？',
        '好的，那明天下午两点可以吗？',
        '行，那就这么定了。你们会带什么工具来吗？',
      ];
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      setMessages((prev) => [...prev, { role: 'ai', content: randomResponse }]);
    }, 1000);
  };

  const handleReset = () => {
    setIsStarted(false);
    setSelectedScenario(null);
    setMessages([]);
    setInputMessage('');
  };

  if (!isStarted) {
    return (
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/practice">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">首次电话沟通练习</h1>
            <p className="text-gray-600 mt-1">选择一个场景开始练习</p>
          </div>
        </div>

        {/* Scenarios */}
        <div className="grid grid-cols-1 gap-6">
          {scenarios.map((scenario) => (
            <Card key={scenario.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CardTitle>{scenario.title}</CardTitle>
                      <Badge
                        variant={
                          scenario.difficulty === '初级'
                            ? 'success'
                            : scenario.difficulty === '中级'
                            ? 'default'
                            : 'warning'
                        }
                      >
                        {scenario.difficulty}
                      </Badge>
                    </div>
                    <CardDescription className="mt-2">{scenario.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-700">客户画像</p>
                  <p className="text-sm text-gray-600 mt-1">{scenario.customerProfile}</p>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => handleStartPractice(scenario.id)} className="flex-1">
                    <Play className="h-4 w-4 mr-2" />
                    开始练习
                  </Button>
                  <Button variant="outline">
                    <BookOpen className="h-4 w-4 mr-2" />
                    查看话术
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const currentScenario = scenarios.find((s) => s.id === selectedScenario);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{currentScenario?.title}</h1>
          <p className="text-gray-600 mt-1">正在进行模拟对话...</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowScript(!showScript)}>
            <BookOpen className="h-4 w-4 mr-2" />
            {showScript ? '隐藏话术' : '查看话术'}
          </Button>
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            重新开始
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Area */}
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">AI 客户</CardTitle>
                    <CardDescription>{currentScenario?.customerProfile}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Volume2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg px-4 py-2 ${
                      message.role === 'user'
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
            </CardContent>

            {/* Input */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="输入你的回复..."
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Side Panel */}
        <div className="space-y-4">
          {/* Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">练习进度</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>对话轮次</span>
                  <span className="font-medium">{Math.floor(messages.length / 2)} / 8</span>
                </div>
                <Progress value={(messages.length / 16) * 100} />
              </div>
              <div className="text-sm text-gray-600">
                <p>预计剩余时间: 10 分钟</p>
              </div>
            </CardContent>
          </Card>

          {/* Script (if shown) */}
          {showScript && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">参考话术</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-gray-900">开场白</p>
                  <p className="text-gray-600 mt-1">
                    您好，我是XX防水维修的管家[姓名]。请问您是[客户姓名]吗？
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">确认需求</p>
                  <p className="text-gray-600 mt-1">
                    了解到您家里有漏水问题，方便简单描述一下具体情况吗？
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">预约上门</p>
                  <p className="text-gray-600 mt-1">
                    根据您描述的情况，我建议安排专业勘查。我们提供免费上门勘查服务...
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">练习提示</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-gray-600">
              <p>• 保持语气友好、专业</p>
              <p>• 先倾听客户需求</p>
              <p>• 避免直接报价</p>
              <p>• 强调免费上门勘查</p>
              <p>• 确认具体预约时间</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
