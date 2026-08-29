import { ComponentProps } from '@/lib/component-props';
import { IGQLField, IGQLTextField } from '@/types/igql';
import {
  Text,
  NextImage as Image,
  LinkField,
  ImageField,
  Link,
} from '@sitecore-content-sdk/nextjs';
import React from 'react';
import { ChevronRight } from 'lucide-react';

interface Fields {
  data: {
    datasource: {
      children: {
        results: Feature[];
      };
      title: IGQLTextField;
      description: IGQLTextField;
    };
  };
}

interface Feature {
  featureImage: IGQLField<ImageField>;
  featureTitle: IGQLTextField;
  featureDescription: IGQLTextField;
  featureLink: IGQLField<LinkField>;
}

type FeaturesProps = ComponentProps & {
  fields: Fields;
};

type FeaturesWrapperProps = React.PropsWithChildren<FeaturesProps>;

const FeaturesWrapper = ({ children, ...props }: FeaturesWrapperProps) => {
  const id = props.params.RenderingIdentifier;
  const hideTitleSection = props.params?.styles?.includes('hide-title-section');

  return (
    <section className={`component py-12 lg:py-20 ${props.params.styles}`} id={id ? id : undefined}>
      <div className="@container container in-[.column-splitter]:px-0">
        {!hideTitleSection && (
          <div className="mb-10 max-w-xl text-left lg:mb-14">
            <h2 className="mb-3">
              <Text field={props.fields.data.datasource.title.jsonValue} />
            </h2>
            <p className="text-foreground-light text-base lg:text-lg">
              <Text field={props.fields.data.datasource.description.jsonValue} />
            </p>
          </div>
        )}
        <div className="-mx-3 flex flex-wrap justify-start gap-y-6">{children}</div>
      </div>
    </section>
  );
};

export const Default = (props: FeaturesProps) => {
  const features = props.fields.data.datasource.children.results;

  return (
    <FeaturesWrapper {...props}>
      {features.map((f, i) => {
        return (
          <div
            className="flex min-w-1/4 grow basis-full flex-col items-start gap-3 px-3 text-left @md:basis-1/2 @3xl:basis-1/4"
            key={i}
          >
            <div className="bg-background-accent flex size-14 items-center justify-center rounded-xl">
              <Image field={f.featureImage.jsonValue} className="size-8 object-contain" />
            </div>
            <h5 className="mt-1">
              <Text field={f.featureTitle.jsonValue} />
            </h5>
            <p className="text-sm lg:text-base">
              <Text field={f.featureDescription.jsonValue} />
            </p>
            {f.featureLink?.jsonValue?.value?.href && (
              <Link field={f.featureLink.jsonValue} className="cta-link">
                {f.featureLink.jsonValue.value.text || 'Learn more'}
                <ChevronRight />
              </Link>
            )}
          </div>
        );
      })}
    </FeaturesWrapper>
  );
};

export const Simple = (props: FeaturesProps) => {
  const features = props.fields.data.datasource.children.results;

  return (
    <FeaturesWrapper {...props}>
      {features.map((f, i) => {
        return (
          <div
            className="flex min-w-1/6 grow basis-1/2 flex-col items-start gap-2 px-3 text-left @md:basis-1/3 @3xl:basis-1/6"
            key={i}
          >
            <Image field={f.featureImage.jsonValue} className="size-6 object-contain" />
            <h5 className="text-foreground text-sm font-semibold">
              <Text field={f.featureTitle.jsonValue} />
            </h5>
          </div>
        );
      })}
    </FeaturesWrapper>
  );
};

export const Stats = (props: FeaturesProps) => {
  const features = props.fields.data.datasource.children.results;

  return (
    <FeaturesWrapper {...props}>
      {features.map((f, i) => {
        return (
          <div className="min-w-1/4 grow basis-full px-3 @md:basis-1/2 @3xl:basis-1/4" key={i}>
            <div className="bg-background-accent flex flex-col items-start gap-2 rounded-xl p-6 text-left">
              <h3 className="text-accent">
                <Text field={f.featureTitle.jsonValue} />
              </h3>
              <p>
                <Text field={f.featureDescription.jsonValue} />
              </p>
            </div>
          </div>
        );
      })}
    </FeaturesWrapper>
  );
};

export const Card = (props: FeaturesProps) => {
  const features = props.fields.data.datasource.children.results;

  return (
    <FeaturesWrapper {...props}>
      {features.map((f, i) => {
        return (
          <div className="min-w-1/3 grow basis-full px-3 @3xl:basis-1/3" key={i}>
            <div className="nia-card flex h-full flex-col">
              <Image field={f.featureImage.jsonValue} className="h-48 w-full object-cover" />
              <div className="flex flex-1 flex-col space-y-2 p-6">
                <h5>
                  <Text field={f.featureTitle.jsonValue} />
                </h5>
                <p>
                  <Text field={f.featureDescription.jsonValue} />
                </p>
                {f.featureLink?.jsonValue?.value?.href && (
                  <Link field={f.featureLink.jsonValue} className="cta-link mt-auto pt-2">
                    {f.featureLink.jsonValue.value.text || 'Explore more'}
                    <ChevronRight />
                  </Link>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </FeaturesWrapper>
  );
};

export const LargeImage = (props: FeaturesProps) => {
  const features = props.fields.data.datasource.children.results;

  return (
    <FeaturesWrapper {...props}>
      {features.map((f, i) => {
        return (
          <div className="min-w-1/2 grow basis-full px-3 @3xl:basis-1/2" key={i}>
            <div className="shadow-card relative flex h-80 items-end overflow-hidden rounded-xl p-6">
              <Image
                field={f.featureImage.jsonValue}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="from-foreground/70 absolute inset-0 bg-linear-to-t to-transparent" />
              <div className="*:text-background relative z-10 space-y-2">
                <h4>
                  <Text field={f.featureTitle.jsonValue} />
                </h4>
                <p>
                  <Text field={f.featureDescription.jsonValue} />
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </FeaturesWrapper>
  );
};
