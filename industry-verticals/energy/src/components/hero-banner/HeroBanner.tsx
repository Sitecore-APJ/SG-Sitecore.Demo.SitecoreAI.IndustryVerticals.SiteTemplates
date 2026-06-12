import {
  Field,
  ImageField,
  LinkField,
  NextImage as ContentSdkImage,
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
  useSitecore,
  Link,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

interface Fields {
  Image: ImageField;
  Video: ImageField;
  Title: Field<string>;
  Description: Field<string>;
  CtaLink: LinkField;
  SecondaryCtaLink: LinkField;
}

interface HeroBannerProps extends ComponentProps {
  fields: Fields;
}

export const Default = ({ params, fields }: HeroBannerProps) => {
  const { page } = useSitecore();
  const { styles, RenderingIdentifier: id } = params;
  const isPageEditing = page.mode.isEditing;

  if (!fields) {
    return isPageEditing ? (
      <div className={`component hero-banner ${styles}`} id={id}>
        [HERO BANNER]
      </div>
    ) : (
      <></>
    );
  }

  return (
    <div
      className={`component hero-banner relative flex min-h-[420px] items-center py-16 lg:min-h-[480px] lg:py-24 ${styles}`}
      id={id}
    >
      {/* Background Media */}
      <div className="absolute inset-0 z-1">
        {!isPageEditing && fields?.Video?.value?.src ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={fields.Image?.value?.src}
          >
            <source src={fields.Video?.value?.src} type="video/webm" />
          </video>
        ) : (
          <ContentSdkImage field={fields.Image} className="h-full w-full object-cover" priority />
        )}
      </div>

      {/* Navy overlay — Moxa hero treatment */}
      <div className="bg-accent-dark/85 absolute inset-0 z-0"></div>

      {/* Content Container — left-aligned like moxa.com */}
      <div className="relative z-3 container mx-auto flex flex-col items-start justify-center">
        <h1 className="text-background max-w-3xl text-left">
          <ContentSdkText field={fields.Title} />
        </h1>

        <div className="**:text-background/90 mt-4 max-w-2xl text-lg **:text-left">
          <ContentSdkRichText field={fields.Description} />
        </div>

        {(fields?.CtaLink || fields?.SecondaryCtaLink) && (
          <div className="mt-8 flex flex-wrap gap-4">
            {fields?.CtaLink && <Link field={fields.CtaLink} className="secondary-btn" />}
            {fields?.SecondaryCtaLink && (
              <Link field={fields.SecondaryCtaLink} className="secondary-btn" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
