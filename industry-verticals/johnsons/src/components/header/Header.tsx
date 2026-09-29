import React, { JSX } from 'react';
import { ComponentProps } from '@/lib/component-props';
import { Placeholder } from '@sitecore-content-sdk/nextjs';

export type HeaderProps = ComponentProps & {
  params: { [key: string]: string };
};

export const Default = (props: HeaderProps): JSX.Element => {
  const { styles, RenderingIdentifier: id, DynamicPlaceholderId } = props.params;

  return (
    <div className={`component header bg-background sticky top-0 z-200 ${styles}`} id={id}>
      {/* J&J-style top utility bar */}
      <div className="bg-utility text-background hidden text-sm lg:block">
        <div className="container flex items-stretch justify-between">
          <div className="flex items-stretch" role="navigation" aria-label="Audience segments">
            <span className="bg-background text-foreground inline-flex items-center px-5 py-2.5 font-medium">
              Discover J&amp;J
            </span>
            <span className="text-background/80 hover:text-background inline-flex items-center px-5 py-2.5 transition-colors">
              Medicines &amp; therapies
            </span>
            <span className="text-background/80 hover:text-background inline-flex items-center px-5 py-2.5 transition-colors">
              Medical devices &amp; technology
            </span>
          </div>
          <div className="flex items-center gap-6" role="navigation" aria-label="Utility links">
            <span className="hover:text-background/80 transition-colors">Media</span>
            <span className="hover:text-background/80 transition-colors">Contact</span>
            <span className="hover:text-background/80 inline-flex items-center gap-1 transition-colors">
              US
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                aria-hidden="true"
                className="opacity-80"
              >
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </span>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="border-border bg-background border-b">
        <div className="container flex items-center gap-3 lg:gap-8 lg:py-1">
          <div className="max-lg:order-1 lg:flex-[1_1]">
            <Placeholder name={`header-left-${DynamicPlaceholderId}`} rendering={props.rendering} />
          </div>
          <div className="max-lg:order-0 max-lg:mr-auto max-lg:w-2/3 lg:flex-[4_1]">
            <Placeholder name={`header-nav-${DynamicPlaceholderId}`} rendering={props.rendering} />
          </div>
          <div className="max-lg:order-2 lg:flex-[0_0_auto]">
            <Placeholder
              name={`header-right-${DynamicPlaceholderId}`}
              rendering={props.rendering}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
