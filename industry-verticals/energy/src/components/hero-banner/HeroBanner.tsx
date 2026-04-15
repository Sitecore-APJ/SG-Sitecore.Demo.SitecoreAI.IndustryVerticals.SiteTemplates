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

  const hasMedia = fields?.Video?.value?.src || fields?.Image?.value?.src;

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
      className={`component hero-banner bg-primary relative flex min-h-[280px] items-center py-16 md:min-h-[360px] md:py-20 lg:py-24 ${styles}`}
      id={id}
    >
      {/* Background Media */}
      {hasMedia && (
        <div className="absolute inset-0 z-0">
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
      )}

      {/* Navy scrim — civic portal band over imagery */}
      <div
        className={`absolute inset-0 z-[1] ${hasMedia ? 'bg-primary/80' : 'bg-primary'}`}
        aria-hidden
      />

      {/* Content */}
      <div className="relative z-[3] container mx-auto flex flex-col items-center justify-center px-4">
        <h1 className="text-center text-white">
          <ContentSdkText field={fields.Title} />
        </h1>

        <div className="mt-4 max-w-2xl text-center text-lg text-white/95 md:text-xl [&_a]:text-white [&_a]:underline [&_p]:m-0">
          <ContentSdkRichText field={fields.Description} />
        </div>

        {(fields?.CtaLink || fields?.SecondaryCtaLink) && (
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {fields?.CtaLink && <Link field={fields.CtaLink} className="main-btn" />}
            {fields?.SecondaryCtaLink && (
              <Link field={fields.SecondaryCtaLink} className="secondary-btn" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
