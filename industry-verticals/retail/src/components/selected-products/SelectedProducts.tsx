import React, { JSX } from 'react';
import { ComponentProps } from '@/lib/component-props';
import { Text, Field, LinkField, Link } from '@sitecore-content-sdk/nextjs';
import { isParamEnabled } from '@/helpers/isParamEnabled';
import AccentLine from '@/assets/icons/accent-line/AccentLine';
import ProductCarousel from '../non-sitecore/ProductCarousel';
import { SitecoreItem } from '@/types/common';
import { Product } from '@/types/products';
import { CommonStyles } from '@/types/styleFlags';

interface Fields {
  Title: Field<string>;
  ProductsLink: LinkField;
  ProductsList: SitecoreItem<Product>[];
}

interface RelatedProductsProps extends ComponentProps {
  fields: Fields;
}

export const Default = (props: RelatedProductsProps): JSX.Element => {
  const { styles, RenderingIdentifier: id } = props.params;
  const hideAccentLine = props?.params?.styles?.includes(CommonStyles.HideAccentLine);
  const autoPlay = isParamEnabled(props.params.Autoplay);
  const loop = isParamEnabled(props.params.Loop);

  return (
    <section className={`component related-products py-12 lg:py-16 ${styles}`} id={id || undefined}>
      <div className="container">
        <div className="section-heading-row">
          <h2 className="text-2xl font-bold lg:text-3xl">
            <Text field={props.fields?.Title} />
            {!hideAccentLine && <AccentLine className="mt-2" />}
          </h2>
          <Link field={props.fields.ProductsLink} className="arrow-btn shrink-0" />
        </div>

        <ProductCarousel products={props.fields.ProductsList} autoPlay={autoPlay} loop={loop} />
      </div>
    </section>
  );
};
