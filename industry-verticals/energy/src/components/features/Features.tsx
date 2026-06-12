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
      <li key={feature?.id} className="border-border flex flex-col gap-4 border bg-white p-8">
        <div className="mb-3 flex items-center gap-3">
          <ContentSdkImage
            field={feature?.featureImage?.jsonValue}
            className="h-8 w-8 flex-shrink-0 object-contain"
          />
          <h5 className="text-base leading-snug font-bold">
            <ContentSdkText field={feature?.featureTitle?.jsonValue} />
          </h5>
        </div>
        <p className="text-sm leading-relaxed">
          <ContentSdkText field={feature?.featureDescription?.jsonValue} />
        </p>
        {feature?.featureLink?.jsonValue ? (
          <div className="mt-auto pt-2">
            <ContentSdkLink field={feature.featureLink.jsonValue} className="outline-btn" />
          </div>
        ) : null}
      </li>
    );
  }

  return (
    <li key={feature?.id} className="border-border flex flex-col gap-4 border bg-white p-8">
      <div className="flex items-start gap-5">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center">
          <ContentSdkImage
            field={feature?.featureImage?.jsonValue}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="flex-1">
          <h5 className="mb-2 text-base font-bold">
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
    <section className={`relative py-12 lg:py-20 ${params?.styles || ''}`} id={id || undefined}>
      <div className="container">
        <h2 className="mb-10 text-center text-3xl font-bold">
          <ContentSdkText field={fields?.data?.datasource?.title?.jsonValue} />
        </h2>

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
    <div className={`relative py-12 lg:py-20 ${params?.styles || ''}`} id={id || undefined}>
      <div className="container">
        <h2 className="mb-8 text-3xl font-bold">
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
