import { generateIndexes } from '@/helpers/generateIndexes';
import { IGQLTextField } from '@/types/igql';
import {
  ComponentParams,
  ComponentRendering,
  Image,
  Link,
  Text,
} from '@sitecore-content-sdk/nextjs';
import React from 'react';
import clsx from 'clsx';

interface Fields {
  data: {
    datasource: {
      children: {
        results: Feature[];
      };
      title: IGQLTextField;
    };
  };
}

interface Feature {
  featureImage: { jsonValue: { value: { src: string; alt?: string } } };
  featureTitle: { jsonValue: { value: string } };
  featureDescription: { jsonValue: { value: string } };
  featureLink: { jsonValue: { value: { href: string } } };
}

type FeaturesProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

type FeatureWrapperProps = {
  props: FeaturesProps;
  children: React.ReactNode;
};

const CARD_VARIANTS = [
  'service-card-rose',
  'service-card-red',
  'service-card-charcoal',
  'service-card-yellow',
];

const FeatureWrapper = (wrapperProps: FeatureWrapperProps) => {
  const id = wrapperProps.props.params.RenderingIdentifier;

  return (
    <section className={`${wrapperProps.props.params.styles}`} id={id ? id : undefined}>
      {wrapperProps.children}
    </section>
  );
};

export const Default = (props: FeaturesProps) => {
  const results = props.fields.data.datasource.children.results;
  const featureSectionTitle = props.fields.data.datasource.title;

  return (
    <FeatureWrapper props={props}>
      <div className="container grid grid-cols-1 gap-12 py-16 lg:grid-cols-[1fr_2fr] lg:gap-16 lg:py-20">
        <div className="lg:mb-0">
          <h2 className="section-heading inline-block max-w-md text-left lg:text-left">
            <Text field={featureSectionTitle.jsonValue} />
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
          {results.map((item, index) => {
            const title = item.featureTitle.jsonValue;
            const description = item.featureDescription.jsonValue;
            const link = item.featureLink.jsonValue;
            return (
              <div className="flex flex-col gap-4" key={index}>
                <div className="font-body text-xl font-bold">
                  <Text field={title} />
                </div>
                <div className="text-foreground-light flex-auto leading-relaxed">
                  <Text field={description} />
                </div>
                <div>
                  <Link field={link} className="arrow-btn" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </FeatureWrapper>
  );
};

export const ImageGrid = (props: FeaturesProps) => {
  const results = props.fields.data.datasource.children.results;

  return (
    <FeatureWrapper props={props}>
      <div className="container grid grid-cols-2 gap-6 py-12 md:grid-cols-3 lg:grid-cols-5">
        {results.map((item, index) => {
          const imageField = item?.featureImage.jsonValue;
          return (
            <div className="flex items-center justify-center py-4" key={index}>
              {imageField && (
                <Image field={imageField} className="max-h-16 object-contain opacity-80" />
              )}
            </div>
          );
        })}
      </div>
    </FeatureWrapper>
  );
};

export const ThreeColGridCentered = (props: FeaturesProps) => {
  const results = props.fields.data.datasource.children.results;

  return (
    <FeatureWrapper props={props}>
      <div className="container flex flex-col flex-wrap justify-evenly gap-12 py-16 md:flex-row lg:gap-16">
        {results.map((item, index) => {
          const title = item.featureTitle.jsonValue;
          const description = item.featureDescription.jsonValue;
          const image = item.featureImage.jsonValue;
          return (
            <div className="flex max-w-xs flex-col items-center justify-start" key={index}>
              <div className="bg-accent mb-6 flex h-16 w-16 items-center justify-center rounded-full">
                <Image field={image} />
              </div>
              <div className="flex flex-col items-center justify-center text-center">
                <div className="mb-2">
                  <Text tag="h5" className="font-body font-bold" field={title} />
                </div>
                <div className="text-foreground-light">
                  <Text field={description} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </FeatureWrapper>
  );
};

export const NumberedGrid = (props: FeaturesProps) => {
  const results = props.fields.data.datasource.children.results;

  return (
    <FeatureWrapper props={props}>
      <div className="container grid grid-cols-1 gap-6 py-16 md:grid-cols-2 lg:grid-cols-3">
        {results.map((item, index) => {
          const title = item?.featureTitle.jsonValue;
          const description = item?.featureDescription.jsonValue;
          return (
            <div
              className="group hover:bg-accent border-border bg-background cursor-pointer rounded-2xl border p-6 transition-colors"
              key={index}
            >
              <h1 className="text-foreground-muted group-hover:text-background mb-3 text-6xl leading-none font-bold">
                {generateIndexes(index)}
              </h1>
              <div>
                <div className="text-accent group-hover:text-background mb-3 text-xl font-bold">
                  <Text field={title} />
                </div>
                <div className="text-foreground-light group-hover:text-background/90 leading-relaxed">
                  <Text field={description} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </FeatureWrapper>
  );
};

export const FourColGrid = (props: FeaturesProps) => {
  const results = props.fields.data.datasource.children.results;

  return (
    <FeatureWrapper props={props}>
      <div className="container grid grid-cols-1 gap-10 py-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {results.map((item, index) => {
          const title = item.featureTitle.jsonValue;
          const description = item.featureDescription.jsonValue;
          const image = item.featureImage.jsonValue;
          return (
            <div className="flex gap-4" key={index}>
              <div className="flex shrink-0 items-start justify-center">
                <Image field={image} className="size-12 object-contain" />
              </div>
              <div className="flex flex-col justify-center">
                <div className="font-body text-lg font-bold">
                  <Text className="text-foreground" field={title} />
                </div>
                <div className="text-foreground-light mt-1 text-sm leading-relaxed">
                  <Text field={description} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </FeatureWrapper>
  );
};

export const ImageCardGrid = (props: FeaturesProps) => {
  const results = props.fields.data.datasource.children.results;
  const featureSectionTitle = props.fields.data.datasource.title;

  return (
    <FeatureWrapper props={props}>
      <div className="container py-16 lg:py-20">
        <h2 className="section-heading mb-10 lg:mb-14">
          <Text field={featureSectionTitle.jsonValue} />
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((item, index) => {
            const title = item.featureTitle.jsonValue;
            const description = item.featureDescription.jsonValue;
            const image = item.featureImage.jsonValue;
            const cardVariant = CARD_VARIANTS[index % CARD_VARIANTS.length];
            const isDarkCard =
              cardVariant === 'service-card-red' || cardVariant === 'service-card-charcoal';

            return (
              <div key={index} className={clsx('service-card', cardVariant)}>
                <h3 className="font-body z-10 text-xl font-bold">
                  <Text field={title} />
                </h3>
                <p
                  className={clsx(
                    'z-10 mt-2 text-sm leading-relaxed',
                    isDarkCard ? 'text-background/80' : 'text-foreground-light'
                  )}
                >
                  <Text field={description} />
                </p>
                <div className="absolute right-0 bottom-0 h-2/3 w-2/3">
                  <Image
                    field={image}
                    className="h-full w-full object-contain object-bottom-right"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </FeatureWrapper>
  );
};
