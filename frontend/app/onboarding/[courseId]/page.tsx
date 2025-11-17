'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Target,
  BookOpen,
} from 'lucide-react';
import { mockCourses, getUserCourseProgress, mockLearningPaths } from '@/data/mock-data';
import { getCurrentUser } from '@/data/mock-data';
import { useState } from 'react';

export default function CoursePage() {
  const params = useParams();
  const courseId = params.courseId as string;
  const currentUser = getCurrentUser();
  
  const course = mockCourses.find((c) => c.id === courseId);
  const progress = getUserCourseProgress(currentUser.id, courseId);
  
  const [isCompleted, setIsCompleted] = useState(progress.status === 'completed');

  if (!course) {
    return <div className="p-6">课程未找到</div>;
  }

  const learningPath = mockLearningPaths.find((p) => p.id === course.pathId);
  const allCourses = mockCourses
    .filter((c) => c.pathId === course.pathId)
    .sort((a, b) => a.order - b.order);
  
  const currentIndex = allCourses.findIndex((c) => c.id === courseId);
  const prevCourse = currentIndex > 0 ? allCourses[currentIndex - 1] : null;
  const nextCourse = currentIndex < allCourses.length - 1 ? allCourses[currentIndex + 1] : null;

  const handleMarkComplete = () => {
    setIsCompleted(true);
    alert('恭喜！课程已标记为完成');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/onboarding">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
            <Link href="/onboarding" className="hover:text-primary">
              {learningPath?.title}
            </Link>
            <span>/</span>
            <span>第 {course.order} 课</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
        </div>
        {isCompleted && (
          <Badge variant="success" className="text-sm px-3 py-1">
            <CheckCircle2 className="h-4 w-4 mr-1" />
            已完成
          </Badge>
        )}
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">课程时长</span>
              </div>
              <p className="text-lg font-semibold">{course.duration} 分钟</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <Target className="h-4 w-4" />
                <span className="text-sm font-medium">学习目标</span>
              </div>
              <p className="text-lg font-semibold">{course.objectives.length} 个</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <BookOpen className="h-4 w-4" />
                <span className="text-sm font-medium">关键要点</span>
              </div>
              <p className="text-lg font-semibold">{course.keyPoints.length} 个</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>学习目标</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {course.objectives.map((objective, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="mt-1">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-medium text-primary">{index + 1}</span>
                  </div>
                </div>
                <span className="text-gray-700">{objective}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>关键要点</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {course.keyPoints.map((point, index) => (
              <Badge key={index} variant="secondary" className="text-sm px-3 py-1">
                {point}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>课程内容</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {course.content}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              {prevCourse ? (
                <Link href={`/onboarding/${prevCourse.id}`}>
                  <Button variant="outline">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    上一课：{prevCourse.title}
                  </Button>
                </Link>
              ) : (
                <Link href="/onboarding">
                  <Button variant="outline">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    返回学习路径
                  </Button>
                </Link>
              )}
            </div>

            <div className="flex items-center gap-3">
              {!isCompleted && (
                <Button onClick={handleMarkComplete}>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  标记为完成
                </Button>
              )}
              {nextCourse ? (
                <Link href={`/onboarding/${nextCourse.id}`}>
                  <Button variant={isCompleted ? 'default' : 'outline'}>
                    下一课：{nextCourse.title}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              ) : (
                <Link href="/onboarding">
                  <Button variant="default">
                    完成学习路径
                    <CheckCircle2 className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
