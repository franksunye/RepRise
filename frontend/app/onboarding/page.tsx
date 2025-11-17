import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import {
  GraduationCap,
  Clock,
  CheckCircle2,
  Circle,
  PlayCircle,
  Award,
  BookOpen,
  Target,
} from 'lucide-react';
import { mockLearningPaths, mockCourses, getUserPathProgress, getUserCourseProgress } from '@/data/mock-data';
import { getCurrentUser } from '@/data/mock-data';

export default function OnboardingPage() {
  const currentUser = getCurrentUser();
  const learningPath = mockLearningPaths[0];
  const courses = mockCourses.filter((c) => c.pathId === learningPath.id).sort((a, b) => a.order - b.order);
  const overallProgress = getUserPathProgress(currentUser.id, learningPath.id);

  const completedCount = courses.filter((course) => {
    const progress = getUserCourseProgress(currentUser.id, course.id);
    return progress.status === 'completed';
  }).length;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">学习路径</h1>
        <p className="text-gray-600 mt-1">系统化学习，快速成长为专业管家</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{learningPath.title}</CardTitle>
          <CardDescription className="mt-2">{learningPath.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={overallProgress} className="h-2" />
          <p className="text-sm text-gray-600 mt-2">进度: {overallProgress}%</p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">课程列表</h2>
        {courses.map((course) => (
          <Card key={course.id}>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold">{course.title}</h3>
              <p className="text-gray-600 mt-1">{course.description}</p>
              <div className="mt-4">
                <Link href={`/onboarding/${course.id}`}>
                  <Button>开始学习</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
