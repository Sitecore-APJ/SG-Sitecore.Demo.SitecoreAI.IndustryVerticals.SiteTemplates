import {
  Field,
  ImageField,
  NextImage as ContentSdkImage,
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
  useSitecore,
  Placeholder,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { HeroBannerStyles } from '@/types/styleFlags';

interface Fields {
  Image: ImageField;
  Video: ImageField;
  Title: Field<string>;
  Description: Field<string>;
}

interface HeroBannerProps extends ComponentProps {
  fields: Fields;
}

// Default variant — left-aligned editorial hero on a light/navy wash
export const Default = ({ params, fields, rendering }: HeroBannerProps) => {
  const { page } = useSitecore();
  const { styles, RenderingIdentifier: id } = params;
  const isPageEditing = page.mode.isEditing;
  const showGradientBackground = styles?.includes(HeroBannerStyles.ShowGradientOverlay);
  const searchBarPlaceholderKey = `hero-banner-search-bar-${params.DynamicPlaceholderId}`;

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
      {showGradientBackground ? (
        <div className="from-background-accent to-background absolute inset-0 z-0 bg-linear-to-b"></div>
      ) : (
        <div className="bg-background-muted absolute inset-0 z-0"></div>
      )}

      <div className="relative z-10 w-full">
        <div className="container mx-auto flex flex-col items-start justify-center px-4 py-16 lg:py-24">
          <h1 className="text-foreground max-w-3xl text-left">
            <ContentSdkText field={fields.Title} />
          </h1>

          <div className="text-foreground-light mt-4 max-w-2xl text-left text-lg lg:text-xl">
            <ContentSdkRichText field={fields.Description} className="text-left" />
          </div>

          <div className="mt-8 w-full max-w-xl">
            <Placeholder name={searchBarPlaceholderKey} rendering={rendering} />
          </div>
        </div>
      </div>
    </div>
  );
};

// CenteredLarge variant — photo hero with navy type and pill search, matching NIA
export const CenteredLarge = ({ params, fields, rendering }: HeroBannerProps) => {
  const { page } = useSitecore();
  const { styles, RenderingIdentifier: id } = params;
  const isPageEditing = page.mode.isEditing;
  const flightSearchPlaceholderKey = `hero-banner-search-bar-${params.DynamicPlaceholderId}`;

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
      className={`component hero-banner ${styles} relative flex min-h-[28rem] items-end lg:min-h-[36rem]`}
      id={id}
    >
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
        <div className="from-background/80 via-background/20 absolute inset-0 bg-linear-to-t to-transparent"></div>
      </div>

      <div className="relative z-10 w-full">
        <div className="container mx-auto flex flex-col items-start justify-end px-4 pt-20 pb-10 lg:pt-28 lg:pb-14">
          <h1 className="text-foreground max-w-4xl text-left drop-shadow-sm">
            <ContentSdkText field={fields.Title} />
          </h1>

          <div className="text-foreground-light mt-3 max-w-2xl text-left text-lg lg:text-xl">
            <ContentSdkRichText field={fields.Description} className="text-left" />
          </div>

          <div className="mt-8 w-full max-w-xl">
            <Placeholder name={flightSearchPlaceholderKey} rendering={rendering} />
          </div>
        </div>
      </div>
    </div>
  );
};
