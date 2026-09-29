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
  const id = wrapperProps.props.params.RenderingIdentifier;

  return (
    <section className={`${wrapperProps.props.params.styles}`} id={id ? id : undefined}>
      {wrapperProps.children}
    </section>
  );
};

/** J&J segment cards — red banner headers + editorial body */
export const Default = (props: FeaturesProps) => {
  const results = props.fields.data.datasource.children.results;
  const hideAccentLine = props.params.styles?.includes(CommonStyles.HideAccentLine);
  const featureSectionTitle = props.fields.data.datasource.title;

  return (
    <FeatureWrapper props={props}>
      <div className="container py-16 md:py-20">
        <div className="mb-10 max-w-xl lg:mb-14">
          <h2 className="inline-block font-normal">
            <Text field={featureSectionTitle.jsonValue} />
            {!hideAccentLine && <AccentLine className="w-[5ch]" />}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {results.map((item, index) => {
            const title = item.featureTitle.jsonValue;
            const description = item.featureDescription.jsonValue;
            const link = item.featureLink.jsonValue;
            return (
              <div className="segment-card" key={index}>
                <div className="segment-card__banner">
                  <Text field={title} />
                </div>
                <div className="segment-card__body">
                  <p className="text-foreground-light text-[15px] leading-[1.6]">
                    <Text field={description} />
                  </p>
                  <div>
                    <Link field={link} className="arrow-btn" />
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

export const ImageGrid = (props: FeaturesProps) => {
  const results = props.fields.data.datasource.children.results;

  return (
    <FeatureWrapper props={props}>
      <div className="border-border container grid grid-cols-1 gap-4 border-y py-9 md:grid-cols-2 lg:grid-cols-5">
        {results.map((item, index) => {
          const imageField = item?.featureImage.jsonValue;
          return (
            <div className="flex items-center justify-center py-6 lg:py-2" key={index}>
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
      <div className="container flex flex-col flex-wrap justify-evenly gap-16 py-16 md:flex-row lg:gap-20">
        {results.map((item, index) => {
          const title = item.featureTitle.jsonValue;
          const description = item.featureDescription.jsonValue;
          const image = item.featureImage.jsonValue;
          return (
            <div className="flex flex-col items-center justify-start 2xl:w-80" key={index}>
              <div className="bg-accent mb-7 flex h-16 w-16 items-center justify-center">
                <Image field={image} className="brightness-0 invert" />
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="mb-2">
                  <Text tag="h5" className="text-foreground font-medium" field={title} />
                </div>
                <div className="text-foreground-light text-center text-[15px]">
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
      <div className="border-border container grid grid-cols-1 gap-0 border md:grid-cols-2 lg:grid-cols-3">
        {results.map((item, index) => {
          const title = item?.featureTitle.jsonValue;
          const description = item?.featureDescription.jsonValue;
          return (
            <div
              className="group hover:bg-accent border-border cursor-pointer border-b p-8 transition-colors last:border-b-0 md:border-r md:odd:border-r lg:border-b-0 [&:nth-child(3n)]:lg:border-r-0"
              key={index}
            >
              <h1 className="text-foreground-muted group-hover:text-background/50 mb-3 text-5xl font-normal tabular-nums">
                {generateIndexes(index)}
              </h1>
              <div>
                <div className="text-foreground group-hover:text-background mb-3 text-xl font-medium">
                  <Text field={title} />
                </div>
                <div className="text-foreground-light group-hover:text-background/85 text-[15px] leading-[1.6]">
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
      <div className="container grid grid-cols-1 gap-12 py-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {results.map((item, index) => {
          const title = item.featureTitle.jsonValue;
          const description = item.featureDescription.jsonValue;
          const image = item.featureImage.jsonValue;
          return (
            <div className="grid grid-cols-[auto_1fr] gap-4" key={index}>
              <div className="bg-background-accent flex size-12 items-center justify-center">
                <Image field={image} className="max-h-8 max-w-8 object-contain" />
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-base leading-snug font-medium">
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

  return (
    <FeatureWrapper props={props}>
      <div className="container grid grid-cols-1 gap-10 py-12 md:grid-cols-2 lg:grid-cols-3">
        {results.map((item, index) => {
          const title = item.featureTitle.jsonValue;
          const description = item.featureDescription.jsonValue;
          const image = item.featureImage.jsonValue;
          const link = item.featureLink?.jsonValue;
          return (
            <div key={index} className="flex flex-col">
              <div className="bg-background-surface mb-5 aspect-[16/10] w-full overflow-hidden">
                <Image field={image} className="h-full w-full object-cover" />
              </div>

              <h6 className="font-medium">
                <Text field={title} />
              </h6>

              <p className="text-foreground-light mt-2 text-[15px] leading-[1.6]">
                <Text field={description} />
              </p>

              {link && (
                <div className="mt-4">
                  <Link field={link} className="arrow-btn" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </FeatureWrapper>
  );
};
