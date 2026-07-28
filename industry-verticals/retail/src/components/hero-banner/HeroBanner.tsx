import {
  Field,
  ImageField,
  LinkField,
  NextImage as ContentSdkImage,
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
  useSitecore,
  Placeholder,
  Link,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import AccentLine from '@/assets/icons/accent-line/AccentLine';
import { CommonStyles, HeroBannerStyles, LayoutStyles } from '@/types/styleFlags';
import clsx from 'clsx';

interface Fields {
  Image: ImageField;
  Video: ImageField;
  Title: Field<string>;
  Description: Field<string>;
  CtaLink: LinkField;
}

interface HeroBannerProps extends ComponentProps {
  fields: Fields;
}

const HeroBannerCommon = ({
  params,
  fields,
  children,
}: HeroBannerProps & {
  children: React.ReactNode;
}) => {
  const { page } = useSitecore();
  const { styles, RenderingIdentifier: id } = params;
  const isPageEditing = page.mode.isEditing;
  const hideGradientOverlay = styles?.includes(HeroBannerStyles.HideGradientOverlay);

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
    <div className={`component hero-banner ${styles} relative flex items-center`} id={id}>
      {/* Background Media */}
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
          <>
            <ContentSdkImage
              field={fields.Image}
              className="h-full w-full object-cover md:object-bottom"
              priority
            />
          </>
        )}
        {/* Gradient overlay — Sentosa dark bottom fade for legible white text */}
        {!hideGradientOverlay && (
          <div className="from-foreground/80 via-foreground/30 absolute inset-0 bg-gradient-to-t to-transparent"></div>
        )}
      </div>

      {children}
    </div>
  );
};

export const Default = ({ params, fields, rendering }: HeroBannerProps) => {
  const styles = params.styles || '';
  const hideAccentLine = styles.includes(CommonStyles.HideAccentLine);
  const withPlaceholder = styles.includes(HeroBannerStyles.WithPlaceholder);
  const reverseLayout = styles.includes(LayoutStyles.Reversed);
  const screenLayer = styles.includes(HeroBannerStyles.ScreenLayer);
  const searchBarPlaceholderKey = `hero-banner-search-bar-${params.DynamicPlaceholderId}`;

  return (
    <HeroBannerCommon params={params} fields={fields} rendering={rendering}>
      {/* Content Container */}
      <div className="relative w-full">
        <div className="container mx-auto px-4">
          <div
            className={`flex min-h-120 w-full items-end py-16 lg:min-h-150 lg:w-1/2 lg:items-center lg:py-20 ${reverseLayout ? 'lg:mr-auto' : 'lg:ml-0'}`}
          >
            <div className="max-w-xl">
              <div className={clsx({ shim: screenLayer })}>
                {/* Title */}
                <h1 className="text-background text-left text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
                  <ContentSdkText field={fields.Title} />
                  {!hideAccentLine && (
                    <AccentLine className="!bg-accent mx-0 mt-4 !h-1.5 w-20 lg:mx-0" />
                  )}
                </h1>

                {/* Description */}
                <div className="text-background/90 mt-5 text-lg md:text-xl">
                  <ContentSdkRichText
                    field={fields.Description}
                    className="[&_p]:text-background/90 text-left"
                  />
                </div>

                {/* CTA Link or Placeholder */}
                <div className="mt-8 flex w-full justify-start">
                  {withPlaceholder ? (
                    <Placeholder name={searchBarPlaceholderKey} rendering={rendering} />
                  ) : (
                    <Link field={fields.CtaLink} className="main-btn !w-auto !px-10" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeroBannerCommon>
  );
};

export const TopContent = ({ params, fields, rendering }: HeroBannerProps) => {
  const styles = params.styles || '';
  const hideAccentLine = styles.includes(CommonStyles.HideAccentLine);
  const withPlaceholder = styles.includes(HeroBannerStyles.WithPlaceholder);
  const reverseLayout = styles.includes(LayoutStyles.Reversed);
  const screenLayer = styles.includes(HeroBannerStyles.ScreenLayer);
  const searchBarPlaceholderKey = `hero-banner-search-bar-${params.DynamicPlaceholderId}`;

  return (
    <HeroBannerCommon params={params} fields={fields} rendering={rendering}>
      {/* Content Container */}
      <div className="relative w-full">
        <div className="container mx-auto flex min-h-120 items-end justify-center px-4 lg:min-h-150">
          <div
            className={`flex w-full max-w-3xl flex-col py-16 lg:py-24 ${reverseLayout ? 'justify-end' : 'justify-start'}`}
          >
            <div className={clsx({ shim: screenLayer }, 'text-center')}>
              {/* Title */}
              <h1 className="text-background text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
                <ContentSdkText field={fields.Title} />
                {!hideAccentLine && <AccentLine className="!bg-accent mx-auto mt-4 !h-1.5 w-20" />}
              </h1>

              {/* Description */}
              <div className="text-background/90 mt-5 text-lg md:text-xl">
                <ContentSdkRichText
                  field={fields.Description}
                  className="[&_p]:text-background/90"
                />
              </div>

              {/* CTA Link or Placeholder */}
              <div className="mt-8 flex w-full justify-center">
                {withPlaceholder ? (
                  <Placeholder name={searchBarPlaceholderKey} rendering={rendering} />
                ) : (
                  <Link field={fields.CtaLink} className="main-btn !w-auto !px-10" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeroBannerCommon>
  );
};
