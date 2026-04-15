import { Badge } from '../ui/badge';

interface StatusBadgeProps {
  status: 'pending' | 'approved' | 'rejected' | 'available' | 'disabled' | 'active' | 'blocked';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const variants: Record<string, { className: string; label: string }> = {
    pending: { className: 'bg-yellow-100 text-yellow-800 border-yellow-300', label: 'Pending' },
    approved: { className: 'bg-green-100 text-green-800 border-green-300', label: 'Approved' },
    rejected: { className: 'bg-red-100 text-red-800 border-red-300', label: 'Rejected' },
    available: { className: 'bg-green-100 text-green-800 border-green-300', label: 'Available' },
    disabled: { className: 'bg-gray-100 text-gray-800 border-gray-300', label: 'Disabled' },
    active: { className: 'bg-green-100 text-green-800 border-green-300', label: 'Active' },
    blocked: { className: 'bg-red-100 text-red-800 border-red-300', label: 'Blocked' },
  };

  const config = variants[status];

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
}
