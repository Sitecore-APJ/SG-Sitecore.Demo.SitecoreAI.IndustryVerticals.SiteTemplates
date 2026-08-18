'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';

const UTILITY_LINKS = [
  { href: '/about-us', label: 'About Us' },
  { href: '/contact-us', label: 'Contact Us' },
];

export const HeaderUtilityBar = () => {
  const [segment, setSegment] = useState<'households' | 'businesses'>('households');

  return (
    <div className="header-utility">
      <div className="container flex flex-wrap items-center justify-between gap-3 py-2">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            className={`segment-tab ${segment === 'households' ? 'segment-tab-active' : 'segment-tab-inactive'}`}
            aria-pressed={segment === 'households'}
            onClick={() => setSegment('households')}
          >
            For Households
          </button>
          <button
            type="button"
            className={`segment-tab ${segment === 'businesses' ? 'segment-tab-active' : 'segment-tab-inactive'}`}
            aria-pressed={segment === 'businesses'}
            onClick={() => setSegment('businesses')}
          >
            For Businesses
          </button>
        </div>

        <div className="flex items-center gap-3 text-sm font-medium sm:gap-4">
          {UTILITY_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hidden whitespace-nowrap text-white/90 transition-colors hover:text-white md:inline"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/search"
            className="hidden items-center gap-1.5 text-white/90 transition-colors hover:text-white md:inline-flex"
            aria-label="Search"
          >
            <Search className="size-4" />
            <span>Search</span>
          </Link>
          <Link href="/login" className="login-btn">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};
