
import { CoachDashboard } from '@/components/coach-dashboard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Coach Dashboard',
};

export default function CoachDashboardPage() {
  return <CoachDashboard />;
}
