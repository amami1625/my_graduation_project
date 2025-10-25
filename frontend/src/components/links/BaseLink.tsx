import Link from 'next/link';
import { ReactNode } from 'react';

interface BaseLinkProps {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'detail';
  icon?: ReactNode;
}

const LINK_STYLES = {
  primary: 'text-blue-600 hover:bg-blue-50',
  secondary: 'text-gray-600 hover:bg-gray-50',
  detail: 'text-blue-600 hover:bg-blue-50',
};

const BASE_STYLES = 'inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition';

export default function BaseLink({ href, children, variant = 'primary', icon }: BaseLinkProps) {
  return (
    <Link href={href} className={`${BASE_STYLES} ${LINK_STYLES[variant]}`}>
      {icon}
      {children}
    </Link>
  );
}
