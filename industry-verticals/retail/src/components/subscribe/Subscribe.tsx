import React, { JSX } from 'react';
import { ComponentProps } from '@/lib/component-props';
import { Text, Field, RichText, RichTextField } from '@sitecore-content-sdk/nextjs';
import { useI18n } from 'next-localization';

export type SubscribeBannerProps = ComponentProps & {
  params: { [key: string]: string };
  fields?: {
    Title: Field<string>;
    ConsentText?: RichTextField;
  };
};

export const Default = (props: SubscribeBannerProps): JSX.Element => {
  const { styles, RenderingIdentifier: id } = props.params;
  const { t } = useI18n();

  return (
    <section
      className={`component subscribe-banner group border-border border-t py-12 md:py-16 ${styles ?? ''}`}
      id={id || undefined}
    >
      <div className="container max-w-4xl md:max-w-5xl">
        <div className="grid items-center gap-y-6 md:grid-cols-2 md:gap-x-12">
          <h2 className="font-heading text-foreground text-2xl leading-tight font-medium lg:text-3xl">
            <Text field={props.fields?.Title} />
          </h2>

          <form className="w-full md:max-w-lg" action="">
            <label htmlFor="subscribe-email" className="sr-only">
              {t('your_email_label') || 'your@email.com'}
            </label>

            <div className="relative">
              <input
                id="subscribe-email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                placeholder={t('your_email') || 'E.g. your@email.com'}
                className="border-border text-foreground placeholder:text-foreground-muted focus:border-accent h-12 w-full border-b bg-transparent ps-1 pe-32 focus:outline-none md:h-14"
              />

              <button
                type="submit"
                className="bg-accent text-background hover:bg-accent-dark absolute top-1/2 right-0 h-10 -translate-y-1/2 rounded-sm px-5 text-xs tracking-[0.15em] uppercase transition-colors focus-visible:outline-none md:px-6"
              >
                {t('button_text') || 'Subscribe'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export const WithConsent = (props: SubscribeBannerProps): JSX.Element => {
  const { styles, RenderingIdentifier: id } = props.params;
  const uid = props.rendering.uid;
  const { t } = useI18n();

  return (
    <section className={`component subscribe-banner group ${styles ?? ''}`} id={id || undefined}>
      <div className="max-w-sm">
        <div className="mb-6">
          <h2 className="font-heading text-foreground text-lg leading-tight font-medium lg:text-xl">
            <Text field={props.fields?.Title} />
          </h2>
        </div>

        <form className="w-full" action="">
          <label htmlFor={`subscribe-email-${uid}`} className="sr-only">
            {t('enter_email') || 'Enter your email'}
          </label>

          <input
            id={`subscribe-email-${uid}`}
            type="email"
            inputMode="email"
            name="email"
            autoComplete="email"
            required
            placeholder={t('enter_email') || 'Enter your email'}
            className="border-border text-foreground placeholder:text-foreground-muted focus:border-accent h-12 w-full border-b bg-transparent px-1 focus:outline-none md:h-14"
          />

          <button
            type="submit"
            className="bg-accent text-background hover:bg-accent-dark mt-4 inline-flex h-12 w-full items-center justify-center rounded-sm text-xs tracking-[0.15em] uppercase transition-colors"
          >
            {t('button_text') || 'Subscribe'}
          </button>

          {props.fields?.ConsentText && (
            <div className="mt-4 flex items-start gap-3">
              <input
                id="subscribe-consent"
                type="checkbox"
                className="border-border accent-accent mt-1 size-4 rounded-sm border"
                required
              />
              <label
                htmlFor="subscribe-consent"
                className="text-foreground-muted text-xs leading-relaxed"
              >
                <RichText field={props.fields.ConsentText} />
              </label>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};
