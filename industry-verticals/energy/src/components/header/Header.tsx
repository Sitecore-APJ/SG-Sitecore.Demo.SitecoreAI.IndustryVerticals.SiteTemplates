'use client';

import React, { JSX, useState, useEffect } from 'react';
import { ComponentProps } from '@/lib/component-props';
import { Placeholder } from '@sitecore-content-sdk/nextjs';
import { Drawer, DrawerTrigger, DrawerContent, DrawerClose } from '@/shadcn/components/ui/drawer';
import { Menu, Search, X } from 'lucide-react';
import { usePathname, useSearchParams } from 'next/navigation';
import PreviewSearch from '../non-sitecore/search/PreviewSearch';
import { PREVIEW_WIDGET_ID } from '@/constants/search';

export type HeaderProps = ComponentProps & {
  params: { [key: string]: string };
};

export const Default = (props: HeaderProps): JSX.Element => {
  const { styles, RenderingIdentifier: id, DynamicPlaceholderId } = props.params;
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsSearchOpen(false);
  }, [pathname, searchParams]);

  return (
    <header className={`component header ${styles}`} id={id}>
      {/* Gov-style utility strip */}
      <div className="border-border bg-background text-foreground-muted border-b text-xs">
        <div className="container flex min-h-8 items-center justify-center py-1.5 md:justify-start">
          <span>A Singapore Government Agency Website</span>
        </div>
      </div>

      <div className="bg-background border-border border-b">
        <div className="container flex items-center gap-4 py-3 lg:gap-6 lg:py-4">
          <div className="header-block *:shrink max-lg:w-full max-lg:justify-between lg:shrink-0">
            <Placeholder name={`header-left-${DynamicPlaceholderId}`} rendering={props.rendering} />
          </div>
          <div className="hidden! lg:flex! lg:shrink lg:basis-full">
            <Placeholder name={`header-nav-${DynamicPlaceholderId}`} rendering={props.rendering} />
          </div>

          <button
            type="button"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-expanded={isSearchOpen}
            aria-label="Open search"
            className="text-primary hover:text-primary/80 shrink-0 p-2 transition-colors"
          >
            <Search className="size-5" strokeWidth={2} />
          </button>

          <div className="lg:hidden">
            <Drawer direction="left">
              <DrawerTrigger asChild>
                <button
                  type="button"
                  aria-label="Open menu"
                  className="text-foreground hover:text-primary p-2 transition-colors"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </DrawerTrigger>

              <DrawerContent className="bg-background-accent w-xl! max-w-full! p-5">
                <div className="flex h-full flex-col">
                  <div className="mb-14 flex items-center justify-between self-end">
                    <DrawerClose asChild>
                      <button type="button" aria-label="Close menu">
                        <X className="h-5 w-5" />
                      </button>
                    </DrawerClose>
                  </div>

                  <div className="mb-6 flex flex-col gap-y-6 px-6">
                    <Placeholder
                      name={`header-nav-${DynamicPlaceholderId}`}
                      rendering={props.rendering}
                    />
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>

      {isSearchOpen && (
        <div className="border-border bg-background absolute top-full right-0 left-0 z-50 border-b shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-2">
              <PreviewSearch
                rfkId={PREVIEW_WIDGET_ID}
                isOpen={isSearchOpen}
                setIsSearchOpen={setIsSearchOpen}
              />

              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="text-foreground-muted hover:text-foreground shrink-0 p-3 transition-colors"
                aria-label="Close search"
              >
                <X className="size-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
