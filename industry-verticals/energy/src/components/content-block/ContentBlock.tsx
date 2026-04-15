import { Text, RichText, Field, withDatasourceCheck } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { JSX } from 'react';

type ContentBlockProps = ComponentProps & {
  fields: {
    heading: Field<string>;
    content: Field<string>;
  };
};

/**
 * A simple Content Block component, with a heading and rich text block.
 */
const ContentBlock = ({ fields }: ContentBlockProps): JSX.Element => (
  <div className="container py-10 md:py-14">
    <Text
      tag="h2"
      className="text-foreground border-primary mb-6 inline-block border-b-2 pb-2 text-2xl font-semibold md:text-3xl"
      field={fields.heading}
    />

    <RichText
      className="content rich-text text-foreground-light max-w-none text-base leading-relaxed"
      field={fields.content}
    />
  </div>
);

export default withDatasourceCheck()<ContentBlockProps>(ContentBlock);
