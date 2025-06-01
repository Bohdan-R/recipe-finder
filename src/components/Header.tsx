'use client';

import { Links } from '@/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links: Links[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Recipes',
    href: '/recipes',
  },
];

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600">
          Recipe Finder
        </Link>

        <nav className="space-x-4">
          {links.map(l => {
            const isActive = l.href === '/' ? pathname === '/' : pathname.startsWith(l.href);

            return (
              <Link
                key={l.label}
                href={l.href}
                className={`text-gray-700 hover:text-blue-600 transition ${
                  isActive ? 'font-semibold text-blue-600' : ''
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
