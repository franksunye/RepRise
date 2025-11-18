import { memo } from 'react';

interface TimeRangeButtonProps {
  range: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

/**
 * TimeRangeButton - 时间范围选择按钮组件
 * 使用 memo 优化性能，避免不必要的重新渲染
 */
export const TimeRangeButton = memo(function TimeRangeButton({
  label,
  isActive,
  onClick,
}: TimeRangeButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-gray-100 ${
        isActive
          ? 'bg-blue-50 text-blue-600 font-medium'
          : 'text-gray-700'
      }`}
    >
      {label}
    </button>
  );
});
