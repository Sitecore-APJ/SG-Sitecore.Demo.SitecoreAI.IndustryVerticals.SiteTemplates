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
              className="h-full w-full object-cover object-center md:object-right"
              priority
            />
          </>
        )}
        {!hideGradientOverlay && (
          <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-white/10 to-transparent"></div>
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
            className={`flex min-h-[22rem] w-full items-center py-8 sm:min-h-[26rem] md:min-h-[30rem] lg:min-h-[32rem] lg:w-[48%] xl:min-h-[34rem] ${reverseLayout ? 'lg:mr-auto' : 'lg:ml-auto'}`}
          >
            <div
              className={clsx(
                'bg-primary w-full rounded-2xl p-6 text-white shadow-lg sm:p-8 md:p-10 lg:p-12',
                { shim: screenLayer }
              )}
            >
              <h1 className="text-3xl leading-[1.15] font-extrabold md:text-4xl lg:text-5xl">
                <ContentSdkText field={fields.Title} />
                {!hideAccentLine && <AccentLine className="bg-accent !h-1.5 !w-16" />}
              </h1>

              <div className="mt-5 text-base text-white/90 md:text-lg">
                <ContentSdkRichText field={fields.Description} className="[&_*]:!text-white/90" />
              </div>

              <div className="mt-8 flex w-full">
                {withPlaceholder ? (
                  <Placeholder name={searchBarPlaceholderKey} rendering={rendering} />
                ) : (
                  <Link field={fields.CtaLink} className="arrow-btn-on-dark" />
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
      <div className="relative w-full">
        <div className="container mx-auto flex min-h-[22rem] justify-center px-4 sm:min-h-[26rem] md:min-h-[30rem] lg:min-h-[32rem]">
          <div
            className={`flex flex-col items-center py-10 lg:py-24 ${reverseLayout ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={clsx(
                'bg-primary/95 max-w-3xl rounded-2xl p-6 text-center text-white shadow-lg sm:p-8 md:p-10',
                { shim: screenLayer }
              )}
            >
              <h1 className="text-3xl leading-[1.15] font-extrabold md:text-5xl">
                <ContentSdkText field={fields.Title} />
                {!hideAccentLine && <AccentLine className="bg-accent mx-auto !h-1.5 !w-16" />}
              </h1>

              <div className="mt-5 text-base text-white/90 md:text-lg">
                <ContentSdkRichText
                  field={fields.Description}
                  className="text-center [&_*]:!text-white/90"
                />
              </div>

              <div className="mt-8 flex w-full justify-center">
                {withPlaceholder ? (
                  <Placeholder name={searchBarPlaceholderKey} rendering={rendering} />
                ) : (
                  <Link field={fields.CtaLink} className="arrow-btn-on-dark" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeroBannerCommon>
  );
};
