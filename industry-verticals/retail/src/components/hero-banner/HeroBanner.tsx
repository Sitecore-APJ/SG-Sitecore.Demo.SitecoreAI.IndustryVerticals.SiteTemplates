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
          <ContentSdkImage
            field={fields.Image}
            className="h-full w-full object-cover md:object-center"
            priority
          />
        )}
        {/* Oberoi-style left gradient overlay for text legibility */}
        {!hideGradientOverlay && (
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
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
      <div className="relative w-full">
        <div className="container mx-auto px-4">
          <div
            className={`flex min-h-200 w-full py-16 lg:min-h-238 lg:w-1/2 lg:items-center lg:py-20 ${reverseLayout ? 'lg:mr-auto' : 'lg:ml-0'}`}
          >
            <div className="max-w-xl">
              <div className={clsx({ shim: screenLayer })}>
                <h1 className="text-background font-heading text-center text-4xl leading-tight font-medium tracking-tight uppercase md:text-5xl lg:text-left lg:text-6xl">
                  <ContentSdkText field={fields.Title} />
                  {!hideAccentLine && <AccentLine className="mx-auto lg:mx-0" />}
                </h1>

                <div className="text-background/90 mt-6 text-base leading-relaxed md:text-lg">
                  <ContentSdkRichText
                    field={fields.Description}
                    className="[&_p]:text-background/90 text-center lg:text-left"
                  />
                </div>

                <div className="mt-8 flex w-full justify-center lg:justify-start">
                  {withPlaceholder ? (
                    <Placeholder name={searchBarPlaceholderKey} rendering={rendering} />
                  ) : (
                    <Link
                      field={fields.CtaLink}
                      className="bg-accent text-background hover:bg-accent-dark inline-flex items-center gap-2 rounded-sm px-6 py-3 text-sm tracking-[0.15em] uppercase transition-colors"
                    />
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
      <div className="relative w-full">
        <div className="container mx-auto flex min-h-200 justify-center px-4 lg:min-h-238">
          <div
            className={`flex flex-col items-center py-16 lg:py-32 ${reverseLayout ? 'justify-end' : 'justify-start'}`}
          >
            <div className={clsx({ shim: screenLayer })}>
              <h1 className="text-background font-heading text-center text-4xl leading-tight font-medium tracking-tight uppercase md:text-5xl lg:text-6xl">
                <ContentSdkText field={fields.Title} />
                {!hideAccentLine && <AccentLine className="mx-auto" />}
              </h1>

              <div className="text-background/90 mt-6 text-base leading-relaxed md:text-lg">
                <ContentSdkRichText
                  field={fields.Description}
                  className="[&_p]:text-background/90 text-center"
                />
              </div>

              <div className="mt-8 flex w-full justify-center">
                {withPlaceholder ? (
                  <Placeholder name={searchBarPlaceholderKey} rendering={rendering} />
                ) : (
                  <Link
                    field={fields.CtaLink}
                    className="bg-accent text-background hover:bg-accent-dark inline-flex items-center gap-2 rounded-sm px-6 py-3 text-sm tracking-[0.15em] uppercase transition-colors"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeroBannerCommon>
  );
};
