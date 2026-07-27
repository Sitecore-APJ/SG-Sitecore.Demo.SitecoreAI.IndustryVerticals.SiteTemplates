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
    <div
      className={`component hero-banner ${styles} relative flex min-h-[420px] items-center md:min-h-[520px] lg:min-h-[580px]`}
      id={id}
    >
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
          <ContentSdkImage field={fields.Image} className="h-full w-full object-cover" priority />
        )}
        {/* Dark overlay for legibility — SP Group hero treatment */}
        {!hideGradientOverlay && (
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20" />
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
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-4">
          <div
            className={clsx(
              'flex w-full max-w-2xl flex-col justify-center py-16 md:py-20 lg:py-24',
              reverseLayout
                ? 'lg:ml-auto lg:items-end lg:text-right'
                : 'lg:items-start lg:text-left'
            )}
          >
            <div className={clsx({ shim: screenLayer })}>
              <h1 className="text-background text-3xl leading-tight font-bold md:text-4xl lg:text-5xl">
                <ContentSdkText field={fields.Title} />
                {!hideAccentLine && (
                  <AccentLine
                    className={clsx('bg-background', reverseLayout ? 'lg:ml-auto' : '')}
                  />
                )}
              </h1>

              <div className="text-background/90 mt-5 max-w-xl text-base leading-relaxed md:text-lg">
                <ContentSdkRichText field={fields.Description} />
              </div>

              <div className="mt-8 flex w-full">
                {withPlaceholder ? (
                  <Placeholder name={searchBarPlaceholderKey} rendering={rendering} />
                ) : (
                  <Link field={fields.CtaLink} className="cta-btn" />
                )}
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
      <div className="relative z-10 w-full">
        <div className="container mx-auto flex min-h-[420px] justify-center px-4 md:min-h-[520px] lg:min-h-[580px]">
          <div
            className={clsx(
              'flex flex-col items-center py-16 text-center md:py-20 lg:py-24',
              reverseLayout ? 'justify-end' : 'justify-center'
            )}
          >
            <div className={clsx({ shim: screenLayer })}>
              <h1 className="text-background text-3xl leading-tight font-bold md:text-4xl lg:text-5xl">
                <ContentSdkText field={fields.Title} />
                {!hideAccentLine && <AccentLine className="bg-background mx-auto" />}
              </h1>

              <div className="text-background/90 mt-5 max-w-2xl text-base leading-relaxed md:text-lg">
                <ContentSdkRichText field={fields.Description} />
              </div>

              <div className="mt-8 flex w-full justify-center">
                {withPlaceholder ? (
                  <Placeholder name={searchBarPlaceholderKey} rendering={rendering} />
                ) : (
                  <Link field={fields.CtaLink} className="cta-btn" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeroBannerCommon>
  );
};
