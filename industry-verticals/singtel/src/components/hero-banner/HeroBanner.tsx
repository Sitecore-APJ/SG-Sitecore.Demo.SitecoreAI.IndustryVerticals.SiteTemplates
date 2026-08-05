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
import { HeroBannerStyles, LayoutStyles } from '@/types/styleFlags';
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
    <div className={`component hero-banner ${styles} bg-background relative`} id={id}>
      {children}
    </div>
  );
};

export const Default = ({ params, fields, rendering }: HeroBannerProps) => {
  const styles = params.styles || '';
  const withPlaceholder = styles.includes(HeroBannerStyles.WithPlaceholder);
  const reverseLayout = styles.includes(LayoutStyles.Reversed);
  const screenLayer = styles.includes(HeroBannerStyles.ScreenLayer);
  const searchBarPlaceholderKey = `hero-banner-search-bar-${params.DynamicPlaceholderId}`;

  return (
    <HeroBannerCommon params={params} fields={fields} rendering={rendering}>
      <div className="container">
        <div
          className={clsx(
            'grid min-h-[28rem] grid-cols-1 items-center gap-8 py-10 lg:min-h-[32rem] lg:grid-cols-2 lg:gap-12 lg:py-16',
            reverseLayout && 'lg:[&>*:first-child]:order-2'
          )}
        >
          {/* Text column */}
          <div className={clsx('flex flex-col justify-center', { shim: screenLayer })}>
            <h1 className="font-body text-foreground text-left text-4xl leading-[1.1] font-bold tracking-tight normal-case md:text-5xl lg:text-[3.25rem]">
              <ContentSdkText field={fields.Title} />
            </h1>

            <div className="text-foreground-light mt-5 text-lg leading-relaxed md:text-xl">
              <ContentSdkRichText field={fields.Description} />
            </div>

            <div className="mt-8 flex w-full justify-start">
              {withPlaceholder ? (
                <Placeholder name={searchBarPlaceholderKey} rendering={rendering} />
              ) : (
                <Link field={fields.CtaLink} className="main-btn !w-auto" />
              )}
            </div>
          </div>

          {/* Image column */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-full overflow-hidden rounded-2xl">
              <ContentSdkImage
                field={fields.Image}
                className="aspect-[4/3] h-full w-full object-contain lg:aspect-auto lg:max-h-[28rem]"
                priority
              />
              <div className="bg-accent absolute bottom-0 left-0 rounded-r-full px-4 py-2 text-sm font-semibold text-white">
                Hello Possibilities
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
  const withPlaceholder = styles.includes(HeroBannerStyles.WithPlaceholder);
  const screenLayer = styles.includes(HeroBannerStyles.ScreenLayer);
  const searchBarPlaceholderKey = `hero-banner-search-bar-${params.DynamicPlaceholderId}`;

  return (
    <HeroBannerCommon params={params} fields={fields} rendering={rendering}>
      <div className="relative w-full">
        <div className="container mx-auto flex min-h-96 justify-center px-4 lg:min-h-[28rem]">
          <div className="flex flex-col items-center justify-center py-12 lg:py-20">
            <div className={clsx('text-center', { shim: screenLayer })}>
              <h1 className="font-body text-foreground text-4xl leading-[1.1] font-bold tracking-tight normal-case md:text-5xl lg:text-6xl">
                <ContentSdkText field={fields.Title} />
              </h1>

              <div className="text-foreground-light mt-6 text-lg leading-relaxed md:text-xl">
                <ContentSdkRichText field={fields.Description} />
              </div>

              <div className="mt-8 flex w-full justify-center">
                {withPlaceholder ? (
                  <Placeholder name={searchBarPlaceholderKey} rendering={rendering} />
                ) : (
                  <Link field={fields.CtaLink} className="main-btn !w-auto" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeroBannerCommon>
  );
};
