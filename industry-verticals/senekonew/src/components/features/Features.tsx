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
import AccentLine from '@/assets/icons/accent-line/AccentLine';
import { CommonStyles } from '@/types/styleFlags';

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

const FeatureWrapper = (wrapperProps: FeatureWrapperProps) => {
  // rendering item id
  const id = wrapperProps.props.params.RenderingIdentifier;

  return (
    <section className={`${wrapperProps.props.params.styles}`} id={id ? id : undefined}>
      {wrapperProps.children}
    </section>
  );
};

export const Default = (props: FeaturesProps) => {
  // results of the graphql
  const results = props.fields.data.datasource.children.results;
  const hideAccentLine = props.params.styles?.includes(CommonStyles.HideAccentLine);
  const featureSectionTitle = props.fields.data.datasource.title;

  return (
    <FeatureWrapper props={props}>
      <div className="container grid grid-cols-1 py-12 lg:grid-cols-[1fr_2fr] lg:gap-10 lg:py-16">
        <div className="mb-10 lg:mb-0">
          <h2 className="inline-block max-w-md font-bold">
            <Text field={featureSectionTitle.jsonValue} />
            {!hideAccentLine && <AccentLine className="w-full max-w-xs" />}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {results.map((item, index) => {
            const title = item.featureTitle.jsonValue;
            const description = item.featureDescription.jsonValue;
            const link = item.featureLink.jsonValue;
            return (
              <div className="flex flex-col" key={index}>
                {/* Title, Link and Description */}
                <div className="mb-5 text-2xl font-bold">
                  <Text field={title} />
                </div>
                <div className="text-foreground mb-3.5 flex-auto leading-7">
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
  // results of the graphql
  const results = props.fields.data.datasource.children.results;

  return (
    <FeatureWrapper props={props}>
      <div className="container grid grid-cols-1 gap-4 py-9 md:grid-cols-2 lg:grid-cols-5">
        {results.map((item, index) => {
          const imageField = item?.featureImage.jsonValue;
          return (
            <div className="flex items-center justify-center py-9 lg:py-2" key={index}>
              {imageField && <Image field={imageField} className="max-h-20 object-contain" />}
            </div>
          );
        })}
      </div>
    </FeatureWrapper>
  );
};

export const ThreeColGridCentered = (props: FeaturesProps) => {
  // results of the graphql
  const results = props.fields.data.datasource.children.results;

  return (
    <FeatureWrapper props={props}>
      <div className="bg-background-muted">
        <div className="container flex flex-col flex-wrap justify-evenly gap-8 py-8 md:flex-row md:gap-6 lg:gap-10 lg:py-10">
          {results.map((item, index) => {
            const title = item.featureTitle.jsonValue;
            const description = item.featureDescription.jsonValue;
            const image = item.featureImage.jsonValue;
            return (
              <div className="flex flex-col items-center justify-start 2xl:w-80" key={index}>
                {/* Image */}
                <div className="bg-primary mb-7 flex h-16 w-16 items-center justify-center rounded-full shadow-sm md:h-20 md:w-20">
                  <Image field={image} />
                </div>
                {/* Title and Description */}
                <div className="flex flex-col items-center justify-center">
                  <div className="mb-2 leading-0.5">
                    <Text tag="h5" className="text-primary" field={title} />
                  </div>
                  <div className="text-background-muted-light text-center">
                    <Text field={description} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </FeatureWrapper>
  );
};

export const NumberedGrid = (props: FeaturesProps) => {
  // results of the graphql
  const results = props.fields.data.datasource.children.results;

  return (
    <FeatureWrapper props={props}>
      <div className="container grid grid-cols-1 gap-4 py-24 md:grid-cols-2 lg:grid-cols-3">
        {results.map((item, index) => {
          const title = item?.featureTitle.jsonValue;
          const description = item?.featureDescription.jsonValue;
          return (
            <div
              className="group hover:bg-primary border-border bg-background cursor-pointer rounded-2xl border p-6 shadow-sm transition-colors"
              key={index}
            >
              {/* Generated Number */}
              <h1 className="text-primary group-hover:text-background mb-2 text-6xl leading-none font-extrabold">
                {generateIndexes(index)}
              </h1>
              {/* Title and Description */}
              <div>
                <div className="text-foreground group-hover:text-background mb-4 text-2xl leading-8 font-bold">
                  <Text field={title} />
                </div>
                <div className="text-foreground-light group-hover:text-background/90 leading-7">
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
  // results of the graphql
  const results = props.fields.data.datasource.children.results;

  return (
    <FeatureWrapper props={props}>
      <div className="bg-background-muted">
        <div className="container grid grid-cols-1 gap-8 py-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6 lg:py-10">
          {results.map((item, index) => {
            const title = item.featureTitle.jsonValue;
            const description = item.featureDescription.jsonValue;
            const image = item.featureImage.jsonValue;
            return (
              <div className="flex items-center gap-4" key={index}>
                {/* Image */}
                <div className="bg-background flex size-14 shrink-0 items-center justify-center rounded-full shadow-sm">
                  <Image field={image} />
                </div>
                {/* Title and Description */}
                <div className="flex flex-col justify-center">
                  <div className="text-base leading-6 font-bold">
                    <Text className="text-foreground" field={title} />
                  </div>
                  <div className="text-foreground-light text-sm leading-6">
                    <Text field={description} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </FeatureWrapper>
  );
};

export const ImageCardGrid = (props: FeaturesProps) => {
  const results = props.fields.data.datasource.children.results;

  return (
    <FeatureWrapper props={props}>
      <div className="container grid grid-cols-1 gap-6 py-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {results.map((item, index) => {
          const title = item.featureTitle.jsonValue;
          const description = item.featureDescription.jsonValue;
          const image = item.featureImage.jsonValue;
          return (
            <div
              key={index}
              className="border-border bg-background overflow-hidden rounded-2xl border shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="bg-background-surface aspect-4/3 w-full overflow-hidden">
                <Image field={image} className="h-full w-full object-cover" />
              </div>

              <div className="p-5">
                <h6>
                  <Text field={title} />
                </h6>

                <p className="text-foreground-light mt-2 text-base">
                  <Text field={description} />
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </FeatureWrapper>
  );
};
