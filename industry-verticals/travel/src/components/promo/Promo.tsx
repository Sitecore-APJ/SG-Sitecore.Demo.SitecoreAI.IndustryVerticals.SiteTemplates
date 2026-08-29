import React, { JSX } from 'react';
import {
  NextImage as ContentSdkImage,
  RichText as ContentSdkRichText,
  Field,
  ImageField,
  Link,
  LinkField,
  RichTextField,
  Text,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { LayoutStyles, PromoFlags } from '@/types/styleFlags';
import { ChevronRight } from 'lucide-react';

interface Fields {
  PromoImageOne: ImageField;
  PromoTitle: Field<string>;
  PromoDescription: RichTextField;
  PromoSubTitle: Field<string>;
  PromoMoreInfo: LinkField;
}

export type PromoProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: PromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const isPromoReversed = props?.params?.styles?.includes(LayoutStyles.Reversed)
    ? 'order-last'
    : '';
  const hideShadow = props?.params?.styles?.includes(PromoFlags.HidePromoShadows);
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;

  return (
    <section className={`${props.params.styles || ''} py-12 lg:py-20`} id={id ? id : undefined}>
      <div className="container">
        <div
          className={`grid grid-cols-1 overflow-hidden rounded-xl transition-shadow lg:grid-cols-2 ${hideShadow ? '' : 'shadow-card hover:shadow-card-hover'} `}
        >
          {/* Image Section */}
          <div className={`${isPromoReversed} relative h-full min-h-56 w-full`}>
            <ContentSdkImage
              field={props.fields.PromoImageOne}
              className="h-full w-full object-cover"
              width={600}
              height={400}
            />
          </div>

          {/* Text Section */}
          <div className="font-body bg-background relative flex flex-col justify-start p-6 py-8 lg:justify-center lg:p-16 lg:py-12">
            <div className="flex w-full flex-col">
              {(props.fields.PromoSubTitle?.value || isPageEditing) && (
                <div className="text-accent w-full text-sm font-semibold tracking-wide uppercase">
                  <Text field={props.fields.PromoSubTitle} className="w-full" />
                </div>
              )}
              <div className="w-full space-y-5">
                <Text field={props.fields.PromoTitle} tag="h3" className="w-full" />

                <div className="text-foreground-light w-full text-base">
                  <ContentSdkRichText field={props.fields.PromoDescription} />
                </div>

                {(props.fields.PromoMoreInfo?.value?.href || isPageEditing) && (
                  <Link field={props.fields.PromoMoreInfo} className="cta-link">
                    {props.fields.PromoMoreInfo?.value?.text || 'Learn more'}
                    <ChevronRight />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
