'use client';

import { ComponentProps } from '@/lib/component-props';
import { Field, NextImage as ContentSdkImage, Text } from '@sitecore-content-sdk/nextjs';
import { Destination } from '@/types/destination';
import Link from 'next/link';
import { useI18n } from 'next-localization';
import { ChevronRight } from 'lucide-react';
import { LayoutStyles } from '@/types/styleFlags';

interface Fields {
  Title: Field<string>;
  Description: Field<string>;
  Destinations: Array<Destination>;
}

export type SelectedDestinationsProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: SelectedDestinationsProps) => {
  const { t } = useI18n();
  const id = props.params.RenderingIdentifier;
  const destinations = props.fields?.Destinations || [];
  const hasJustifyAround = props?.params?.styles?.includes(LayoutStyles.JustyfyAround);

  return (
    <section className={`${props.params.styles} py-12 lg:py-20`} id={id ? id : undefined}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-10 max-w-xl text-left lg:mb-14">
          <h2 className="mb-3">
            <Text field={props.fields?.Title} />
          </h2>

          <p className="text-foreground-light text-base lg:text-lg">
            <Text field={props.fields.Description} />
          </p>
        </div>

        {/* Cards */}
        <div className={`${hasJustifyAround ? 'my-10 flex w-full justify-around' : ''}`}>
          <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.map((destination, index) => (
              <div key={index} className="nia-card flex h-full flex-col">
                {destination.fields.Image && (
                  <div className="bg-background-accent h-40 w-full overflow-hidden">
                    <ContentSdkImage
                      field={destination.fields.Image}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}

                <div className="m-5 flex flex-1 flex-col">
                  <h6 className="text-foreground mb-3 font-bold">
                    <Text field={destination.fields.Title} />
                  </h6>

                  <div className="mt-auto">
                    <Link href={destination.url} className="cta-link">
                      {t('read_more') || 'Explore more'}
                      <ChevronRight />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const WithStartingPrice = (props: SelectedDestinationsProps) => {
  const id = props.params.RenderingIdentifier;
  const destinations = props.fields?.Destinations || [];
  const hasJustifyAround = props?.params?.styles?.includes(LayoutStyles.JustyfyAround);

  return (
    <section className={`${props.params.styles} py-12 lg:py-20`} id={id ? id : undefined}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-10 max-w-xl text-left lg:mb-14">
          <h2 className="mb-3">
            <Text field={props.fields.Title} />
          </h2>

          <p className="text-foreground-light text-base lg:text-lg">
            <Text field={props.fields.Description} />
          </p>
        </div>

        {/* Cards */}
        <div className={`${hasJustifyAround ? 'my-10 flex w-full justify-around' : ''}`}>
          <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.map((destination, index) => (
              <Link
                key={index}
                href={destination.url}
                className="nia-card group flex h-full flex-col gap-4 no-underline"
              >
                {destination.fields.Image && (
                  <div
                    className={`bg-background-accent relative w-full overflow-hidden ${hasJustifyAround ? 'h-32' : 'h-48'}`}
                  >
                    <ContentSdkImage
                      field={destination.fields.Image}
                      className="h-full w-full object-cover"
                    />

                    {destination.fields.Price && (
                      <div className="bg-accent text-background absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-semibold">
                        <Text field={destination.fields.Price} />
                      </div>
                    )}
                  </div>
                )}

                <div className="flex flex-1 flex-col gap-2 p-5 pt-0">
                  <h6 className="text-foreground font-bold">
                    <Text field={destination.fields.Title} />
                  </h6>

                  {destination.fields.Country && (
                    <span className="text-foreground-light text-sm">
                      <Text field={destination.fields.Country} />
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
