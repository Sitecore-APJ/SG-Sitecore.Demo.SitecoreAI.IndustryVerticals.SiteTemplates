'use client';

import { IGQLImageField, IGQLRichTextField, IGQLTextField, IGQLLinkField } from 'src/types/igql';
import {
  Text as ContentSdkText,
  NextImage as ContentSdkImage,
  Link as ContentSdkLink,
  withDatasourceCheck,
  ComponentRendering,
  ComponentParams,
} from '@sitecore-content-sdk/nextjs';

interface Fields {
  data: {
    datasource: {
      children: {
        results: FeatureFields[];
      };
      title: IGQLTextField;
      description: IGQLRichTextField;
    };
  };
}

interface FeatureFields {
  id: string;
  featureTitle: IGQLTextField;
  featureDescription: IGQLTextField;
  featureImage: IGQLImageField;
  featureImageDark?: IGQLImageField;
  featureLink?: IGQLLinkField;
}

type FeaturesProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

const FeatureItem = ({
  feature,
  layout = 'vertical',
}: {
  feature: FeatureFields;
  layout: 'vertical' | 'horizontal';
}) => {
  if (layout === 'horizontal') {
    return (
      <li
        key={feature?.id}
        className="border-border bg-background flex flex-col gap-4 rounded-md border p-6 shadow-sm"
      >
        <div className="mb-3.5 flex items-center gap-3">
          <ContentSdkImage
            field={feature?.featureImage?.jsonValue}
            className="h-8 w-8 flex-shrink-0 object-contain"
          />
          <h5 className="text-foreground text-lg leading-tight font-bold">
            <ContentSdkText field={feature?.featureTitle?.jsonValue} />
          </h5>
        </div>
        <p className="text-foreground-light text-sm leading-relaxed">
          <ContentSdkText field={feature?.featureDescription?.jsonValue} />
        </p>
        {feature?.featureLink?.jsonValue ? (
          <div className="mt-2">
            <ContentSdkLink field={feature.featureLink.jsonValue} className="outline-btn" />
          </div>
        ) : null}
      </li>
    );
  }

  return (
    <li
      key={feature?.id}
      className="border-border bg-background flex flex-col gap-4 rounded-md border p-6 shadow-sm"
    >
      <div className="flex items-start gap-4">
        <div className="border-primary/20 flex h-16 w-16 shrink-0 items-center justify-center rounded-md border bg-white">
          <ContentSdkImage
            field={feature?.featureImage?.jsonValue}
            className="h-10 w-10 object-contain"
          />
        </div>
        <div className="flex-1">
          <h5 className="text-foreground mb-2 text-lg font-semibold">
            <ContentSdkText field={feature?.featureTitle?.jsonValue} />
          </h5>
          <p className="text-foreground-light text-sm leading-relaxed">
            <ContentSdkText field={feature?.featureDescription?.jsonValue} />
          </p>
        </div>
      </div>
    </li>
  );
};

const DefaultFeatures = ({ fields, params }: FeaturesProps) => {
  const id = params?.RenderingIdentifier;
  const features = fields?.data?.datasource?.children?.results;

  return (
    <section
      className={`relative py-16 md:py-20 lg:py-24 ${params?.styles || ''}`}
      id={id || undefined}
    >
      <div className="container">
        <div className="mb-10 text-center">
          <h2 className="text-foreground border-primary inline-block border-b-2 pb-2 text-2xl font-bold md:text-3xl">
            <ContentSdkText field={fields?.data?.datasource?.title?.jsonValue} />
          </h2>
        </div>

        <ul className="grid gap-6 lg:grid-cols-2">
          {features?.map((feature) => (
            <FeatureItem key={feature.id} feature={feature} layout="vertical" />
          ))}
        </ul>
      </div>
    </section>
  );
};

const CardFeatures = ({ fields, params }: FeaturesProps) => {
  const id = params?.RenderingIdentifier;
  const features = fields?.data?.datasource?.children?.results;

  return (
    <div
      className={`relative py-16 md:py-20 lg:py-24 ${params?.styles || ''}`}
      id={id || undefined}
    >
      <div className="container">
        <h2 className="text-foreground border-primary mb-8 inline-block border-b-2 pb-2 text-2xl font-bold md:text-3xl">
          <ContentSdkText field={fields?.data?.datasource?.title?.jsonValue} />
        </h2>
        <ul className="grid gap-6 lg:grid-cols-3">
          {features?.map((feature) => (
            <FeatureItem key={feature.id} feature={feature} layout="horizontal" />
          ))}
        </ul>
      </div>
    </div>
  );
};

export const Default = withDatasourceCheck()<FeaturesProps>(DefaultFeatures);
export const Card = withDatasourceCheck()<FeaturesProps>(CardFeatures);
