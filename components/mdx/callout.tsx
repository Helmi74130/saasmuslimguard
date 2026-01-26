import { AlertCircle, Info, CheckCircle, AlertTriangle } from 'lucide-react';
import type { ReactNode } from 'react';

interface CalloutProps {
  type?: 'info' | 'warning' | 'success' | 'error';
  children: ReactNode;
}

export function Callout({ type = 'info', children }: CalloutProps) {
  const styles = {
    info: {
      container: 'bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-950/30 dark:border-blue-800 dark:text-blue-100',
      icon: Info,
      iconColor: 'text-blue-600 dark:text-blue-400',
    },
    warning: {
      container: 'bg-yellow-50 border-yellow-200 text-yellow-900 dark:bg-yellow-950/30 dark:border-yellow-800 dark:text-yellow-100',
      icon: AlertTriangle,
      iconColor: 'text-yellow-600 dark:text-yellow-400',
    },
    success: {
      container: 'bg-green-50 border-green-200 text-green-900 dark:bg-green-950/30 dark:border-green-800 dark:text-green-100',
      icon: CheckCircle,
      iconColor: 'text-green-600 dark:text-green-400',
    },
    error: {
      container: 'bg-red-50 border-red-200 text-red-900 dark:bg-red-950/30 dark:border-red-800 dark:text-red-100',
      icon: AlertCircle,
      iconColor: 'text-red-600 dark:text-red-400',
    },
  };

  const style = styles[type];
  const Icon = style.icon;

  return (
    <div className={`border-l-4 p-4 rounded-r my-4 flex gap-3 ${style.container}`}>
      <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${style.iconColor}`} />
      <div className="flex-1 [&>p]:m-0">{children}</div>
    </div>
  );
}
