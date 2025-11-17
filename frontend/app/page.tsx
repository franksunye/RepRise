'use client';

import { useRole } from '@/contexts/role-context';
import { RepHome } from '@/components/rep-home';
import { CoachHome } from '@/components/coach-home';

export default function HomePage() {
  const { currentRole } = useRole();

  // 根据角色显示不同的首页
  if (currentRole === 'coach') {
    return <CoachHome />;
  }

  // 默认显示管家首页
  return <RepHome />;
}
