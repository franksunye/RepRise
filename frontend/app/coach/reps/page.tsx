'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { getRealisticAvatarUrl, getInitials } from '@/lib/avatar';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import {
  Users,
  TrendingUp,
  TrendingDown,
  Award,
  AlertCircle,
  CheckCircle,
  Clock,
  Target,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { mockReps, mockPractices, mockTasks, mockCoaches } from '@/data/mock-data';

export default function CoachRepsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  
  // 获取当前教练的管家
  const currentCoach = mockCoaches[0];
  const allReps = mockReps.filter(rep => currentCoach.reps.includes(rep.id));
  
  // 为每个管家计算统计数据
  const repsWithStats = allReps.map(rep => {
    const practices = mockPractices.filter(p => p.repId === rep.id);
    const tasks = mockTasks.filter(t => t.repId === rep.id);
    const avgScore = practices.length > 0
      ? Math.round(practices.reduce((sum, p) => sum + p.score, 0) / practices.length)
      : 0;
    
    // 计算本周练习次数
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weeklyPractices = practices.filter(p => new Date(p.date) >= weekAgo).length;
    
    // 确定趋势
    const trend = weeklyPractices >= 6 ? 'up' : 'down';
    
    // 最后练习时间
    const lastPractice = practices.length > 0
      ? practices.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0].date
      : null;
    
    // 待办任务
    const pendingTasks = tasks.filter(t => t.status === 'pending' || t.status === 'in-progress').length;
    
    // 弱项和优势（基于得分）
    const weaknesses = avgScore < 75 ? ['异议处理', '时间管理'] : avgScore < 85 ? ['报价谈判'] : [];
    const strengths = avgScore >= 85 ? ['专业性', '沟通能力'] : avgScore >= 75 ? ['专业性'] : [];
    
    return {
      ...rep,
      practiceCount: practices.length,
      averageScore: avgScore,
      weeklyPractices,
      trend,
      weaknesses,
      strengths,
      lastPractice,
      pendingTasks,
    };
  });
  
  // 分页
  const totalPages = Math.ceil(repsWithStats.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReps = repsWithStats.slice(startIndex, endIndex);
  
  // 统计数据
  const totalReps = repsWithStats.length;
  const avgScore = totalReps > 0
    ? Math.round(repsWithStats.reduce((sum, r) => sum + r.averageScore, 0) / totalReps)
    : 0;
  const activeReps = repsWithStats.filter(r => r.status === 'active').length;
  const needsAttention = repsWithStats.filter(r => r.averageScore < 75 || r.weeklyPractices < 6).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">管家管理</h1>
        <p className="text-gray-600 mt-1">查看和管理你的团队成员</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              团队人数
            </CardDescription>
            <CardTitle className="text-3xl">{totalReps}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-green-600">
              <CheckCircle className="h-4 w-4 mr-1" />
              <span>{activeReps} 人活跃</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              平均得分
            </CardDescription>
            <CardTitle className="text-3xl">{avgScore}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-blue-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>稳步提升</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              本周练习
            </CardDescription>
            <CardTitle className="text-3xl">
              {repsWithStats.reduce((sum, r) => sum + r.weeklyPractices, 0)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-600">总练习次数</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              需要关注
            </CardDescription>
            <CardTitle className="text-3xl">{needsAttention}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-orange-600">表现待提升</div>
          </CardContent>
        </Card>
      </div>

      {/* Reps List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>团队成员</CardTitle>
              <CardDescription>
                显示 {startIndex + 1}-{Math.min(endIndex, totalReps)} / 共 {totalReps} 名管家
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentReps.map((rep) => (
              <div
                key={rep.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={getRealisticAvatarUrl(rep.name)} alt={rep.name} />
                      <AvatarFallback className="bg-primary/10 text-primary font-medium">
                        {getInitials(rep.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-gray-900">{rep.name}</h3>
                        {rep.trend === 'up' ? (
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-orange-600" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        入职时间: {new Date(rep.joinDate).toLocaleDateString('zh-CN')}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      rep.averageScore >= 85
                        ? 'success'
                        : rep.averageScore >= 70
                        ? 'default'
                        : 'destructive'
                    }
                  >
                    {rep.averageScore} 分
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <p className="text-gray-600">总练习</p>
                      <p className="font-medium">{rep.practiceCount} 次</p>
                    </div>
                    <div>
                      <p className="text-gray-600">本周</p>
                      <p className="font-medium">{rep.weeklyPractices} 次</p>
                    </div>
                    <div>
                      <p className="text-gray-600">待办</p>
                      <p className="font-medium">{rep.pendingTasks} 个</p>
                    </div>
                  </div>

                  {rep.weaknesses.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-600 mb-1">弱项</p>
                      <div className="flex flex-wrap gap-1">
                        {rep.weaknesses.map((weakness, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {weakness}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {rep.strengths.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-600 mb-1">优势</p>
                      <div className="flex flex-wrap gap-1">
                        {rep.strengths.map((strength, idx) => (
                          <Badge key={idx} variant="success" className="text-xs">
                            {strength}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {rep.lastPractice && (
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Clock className="h-3 w-3" />
                      <span>
                        最后练习: {new Date(rep.lastPractice).toLocaleDateString('zh-CN')}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t">
                  <Link href={`/coach/reps/${rep.id}`}>
                    <Button variant="outline" className="w-full" size="sm">
                      查看详情
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-6 border-t">
              <div className="text-sm text-gray-600">
                第 {currentPage} 页，共 {totalPages} 页
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  上一页
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  下一页
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
