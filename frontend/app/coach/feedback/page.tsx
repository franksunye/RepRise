'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getAllFeedbacks, mockReps } from '@/data/mock-data';
import { Feedback } from '@/types';
import { ArrowRight } from 'lucide-react';

// Helper function to get rep name from ID
const getRepName = (repId: string) => {
  const rep = mockReps.find(r => r.id === repId);
  return rep ? rep.name : '未知';
};

export default function CoachingFeedbackPage() {
  const feedbacks = useMemo(() => {
    return getAllFeedbacks().sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, []);

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">教练反馈</h1>

      <div className="space-y-6">
        {feedbacks.map((feedback: Feedback) => (
          <Card key={feedback.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <span className="text-lg font-semibold">{feedback.source}: {feedback.sourceId}</span>
                <span className="text-sm font-medium text-gray-500">
                  {new Date(feedback.timestamp).toLocaleString()}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="font-medium">管家: {getRepName(feedback.repId)}</div>
              </div>

              <div className="mb-4">
                {feedback.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="mr-2 mb-2">{tag}</Badge>
                ))}
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" asChild>
                  <Link href="#">跳转到任务</Link>
                </Button>
                <Button asChild>
                  <Link href={`/coach/feedback/${feedback.id}`}>
                    查看详情 <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
