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
      className={`component subscribe-banner group border-border border-y py-12 md:py-16 ${styles ?? ''}`}
      id={id || undefined}
    >
      <div className="container max-w-4xl md:max-w-5xl md:px-10">
        <div className="grid items-center gap-y-8 md:grid-cols-2 md:gap-x-12 md:gap-y-0">
          {/* Headline */}
          <h2 className="text-foreground text-xl leading-tight font-medium tracking-[0.02em] xl:text-2xl">
            <Text field={props.fields?.Title} />
          </h2>

          {/* Form */}
          <form className="w-full md:max-w-lg" action="">
            <label htmlFor="subscribe-email" className="sr-only">
              {t('your_email_label') || 'your@email.com'}
            </label>

            <div className="border-foreground relative flex border">
              <input
                id="subscribe-email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                placeholder={t('your_email') || 'E.g. your@email.com'}
                className="bg-background text-foreground placeholder:text-foreground-muted h-12 w-full border-0 px-4 text-sm focus:ring-0 focus:outline-none md:h-14"
              />

              <button
                type="submit"
                className="border-foreground text-foreground hover:bg-foreground hover:text-background shrink-0 border-l bg-transparent px-5 text-xs font-semibold tracking-[0.18em] uppercase transition-colors md:px-6"
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
      {/* Headline*/}
      <div className="max-w-sm">
        <div className="mb-6">
          <h2 className="text-foreground text-base leading-tight font-medium tracking-[0.02em] xl:text-lg">
            <Text field={props.fields?.Title} />
          </h2>
        </div>

        <form className="w-full" action="">
          <label htmlFor={`subscribe-email-${uid}`} className="sr-only">
            {t('enter_email') || 'Enter your email'}
          </label>

          {/* Email and Submit Button */}
          <input
            id={`subscribe-email-${uid}`}
            type="email"
            inputMode="email"
            name="email"
            autoComplete="email"
            required
            placeholder={t('enter_email') || 'Enter your email'}
            className="border-foreground bg-background text-foreground placeholder:text-foreground-muted h-12 w-full border px-4 text-sm focus:ring-0 focus:outline-none md:h-14"
          />

          <button
            type="submit"
            className="border-foreground text-foreground hover:bg-foreground hover:text-background mt-3 inline-flex h-12 w-full items-center justify-center border bg-transparent text-xs font-semibold tracking-[0.2em] uppercase transition-colors md:h-12"
          >
            {t('button_text') || 'Subscribe'}
          </button>

          {/* Consent text and Checkbox  */}
          {props.fields?.ConsentText && (
            <div className="mt-4 flex items-start gap-3">
              <input
                id="subscribe-consent"
                type="checkbox"
                className="border-foreground/40 bg-background accent-accent mt-1 size-4 rounded-none border"
                required
              />
              <label
                htmlFor="subscribe-consent"
                className="text-foreground-light text-sm leading-6"
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
