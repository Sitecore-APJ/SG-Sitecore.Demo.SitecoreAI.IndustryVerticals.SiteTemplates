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
    <div className={`component hero-banner ${styles} relative`} id={id}>
      {children}
    </div>
  );
};

/** Editorial split hero — J&J homepage pattern (copy left, media right) */
export const Default = ({ params, fields, rendering }: HeroBannerProps) => {
  const styles = params.styles || '';
  const hideAccentLine = styles.includes(CommonStyles.HideAccentLine);
  const withPlaceholder = styles.includes(HeroBannerStyles.WithPlaceholder);
  const reverseLayout = styles.includes(LayoutStyles.Reversed);
  const screenLayer = styles.includes(HeroBannerStyles.ScreenLayer);
  const searchBarPlaceholderKey = `hero-banner-search-bar-${params.DynamicPlaceholderId}`;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;

  return (
    <HeroBannerCommon params={params} fields={fields} rendering={rendering}>
      <div className="bg-background relative w-full">
        <div className="container mx-auto px-4 py-10 md:py-14 lg:py-16">
          <div
            className={clsx(
              'grid items-center gap-8 lg:grid-cols-12 lg:gap-12',
              reverseLayout && 'lg:[direction:rtl] lg:[&>*]:[direction:ltr]'
            )}
          >
            <div className="lg:col-span-7">
              <div className={clsx({ shim: screenLayer })}>
                <h1 className="text-foreground max-w-xl text-4xl leading-[1.1] font-normal tracking-tight md:text-5xl lg:text-[3.5rem] xl:text-[4rem]">
                  <ContentSdkText field={fields.Title} />
                  {!hideAccentLine && <AccentLine className="!h-[3px] w-[5ch]" />}
                </h1>

                <div className="text-foreground-light mt-6 max-w-lg text-base leading-[1.6] md:text-lg">
                  <ContentSdkRichText field={fields.Description} />
                </div>

                <div className="mt-8 flex w-full justify-start">
                  {withPlaceholder ? (
                    <Placeholder name={searchBarPlaceholderKey} rendering={rendering} />
                  ) : (
                    <Link field={fields.CtaLink} className="arrow-btn text-base" />
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] w-full overflow-hidden md:aspect-[16/11]">
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
                    className="h-full w-full object-cover"
                    priority
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

/** Full-bleed variant for interior pages */
export const TopContent = ({ params, fields, rendering }: HeroBannerProps) => {
  const styles = params.styles || '';
  const hideAccentLine = styles.includes(CommonStyles.HideAccentLine);
  const withPlaceholder = styles.includes(HeroBannerStyles.WithPlaceholder);
  const reverseLayout = styles.includes(LayoutStyles.Reversed);
  const screenLayer = styles.includes(HeroBannerStyles.ScreenLayer);
  const hideGradientOverlay = styles?.includes(HeroBannerStyles.HideGradientOverlay);
  const searchBarPlaceholderKey = `hero-banner-search-bar-${params.DynamicPlaceholderId}`;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;

  return (
    <HeroBannerCommon params={params} fields={fields} rendering={rendering}>
      <div className="relative flex min-h-[420px] items-center md:min-h-[520px]">
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
          {!hideGradientOverlay && (
            <div className="from-foreground/55 absolute inset-0 bg-gradient-to-r to-transparent" />
          )}
        </div>

        <div className="relative z-10 w-full">
          <div className="container mx-auto flex justify-center px-4">
            <div
              className={`flex flex-col py-16 md:py-24 ${reverseLayout ? 'items-end' : 'items-start'}`}
            >
              <div className={clsx('max-w-2xl', { shim: screenLayer })}>
                <h1 className="text-background text-4xl leading-[1.1] font-normal tracking-tight md:text-5xl lg:text-6xl">
                  <ContentSdkText field={fields.Title} />
                  {!hideAccentLine && <AccentLine className="!text-background !h-[3px] w-[5ch]" />}
                </h1>

                <div className="text-background/90 mt-6 max-w-xl text-base md:text-lg">
                  <ContentSdkRichText field={fields.Description} />
                </div>

                <div className="mt-8 flex w-full">
                  {withPlaceholder ? (
                    <Placeholder name={searchBarPlaceholderKey} rendering={rendering} />
                  ) : (
                    <Link
                      field={fields.CtaLink}
                      className="arrow-btn !text-background after:!text-background"
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
