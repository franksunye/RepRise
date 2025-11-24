'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getFeedbacksByRepId, getCurrentUser, mockCoaches } from '@/data/mock-data';
import { Feedback } from '@/types';
import { ArrowRight, MessageSquare, Star, Calendar } from 'lucide-react';

// Helper function to get coach name from ID
const getCoachName = (coachId: string) => {
  const coach = mockCoaches.find(c => c.id === coachId);
  return coach ? coach.name : '未知';
};

export default function RepFeedbackPage() {
  const currentUser = getCurrentUser();
  
  const feedbacks = useMemo(() => {
    return getFeedbacksByRepId(currentUser.id).sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }, [currentUser.id]);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">我的反馈</h1>
        <p className="text-gray-600 mt-1">查看教练给你的反馈和建议</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>总反馈数</CardDescription>
            <CardTitle className="text-3xl">{feedbacks.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>本周反馈</CardDescription>
            <CardTitle className="text-3xl">
              {feedbacks.filter(f => {
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                return new Date(f.timestamp) > weekAgo;
              }).length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>平均评分</CardDescription>
            <CardTitle className="text-3xl">
              {feedbacks.filter(f => f.score).length > 0
                ? (feedbacks.reduce((sum, f) => sum + (f.score || 0), 0) / 
                   feedbacks.filter(f => f.score).length).toFixed(1)
                : 'N/A'}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Feedback List */}
      <div className="space-y-4">
        {feedbacks.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">暂无反馈</h3>
              <p className="text-gray-600">教练会在这里给你反馈和建议</p>
            </CardContent>
          </Card>
        ) : (
          feedbacks.map((feedback: Feedback) => (
            <Card key={feedback.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{feedback.source}</Badge>
                      <span className="text-sm text-gray-500">
                        {new Date(feedback.timestamp).toLocaleString('zh-CN')}
                      </span>
                    </div>
                    <CardTitle className="text-lg">
                      来自 {getCoachName(feedback.coachId)} 的反馈
                    </CardTitle>
                  </div>
                  {feedback.score && (
                    <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-bold text-yellow-700">{feedback.score}</span>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4 line-clamp-2">{feedback.content}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {feedback.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex justify-end">
                  <Button asChild>
                    <Link href={`/coaching/feedback/${feedback.id}`}>
                      查看详情 <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

