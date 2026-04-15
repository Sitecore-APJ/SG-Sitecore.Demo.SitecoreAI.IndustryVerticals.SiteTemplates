import { ComponentProps } from '@/lib/component-props';
import { Field, LinkField, Placeholder, Text } from '@sitecore-content-sdk/nextjs';

interface Fields {
  Title: Field<string>;
  Description: Field<string>;
  Link: LinkField;
}

interface SectionWrapperProps extends ComponentProps {
  fields: Fields;
}

export const Default = ({ params, fields, rendering }: SectionWrapperProps) => {
  const { styles, RenderingIdentifier: id } = params;
  const componentPlaceholderKey = `section-wrapper-content-${params.DynamicPlaceholderId}`;

  return (
    <section className={`component section-wrapper py-16 md:py-20 lg:py-24 ${styles}`} id={id}>
      <div className="container">
        <div className="mb-12 space-y-4 in-[.header-text-position-center]:text-center in-[.header-text-position-left]:text-left in-[.header-text-position-right]:text-right">
          <h2 className="border-primary inline-block border-b-2 pb-2 text-2xl font-bold md:text-3xl">
            <Text field={fields.Title} />
          </h2>
          <p className="text-foreground-light max-w-3xl text-base leading-relaxed md:text-lg">
            <Text field={fields.Description} />
          </p>
        </div>
      </div>
      <div>
        <Placeholder name={componentPlaceholderKey} rendering={rendering} />
      </div>
    </section>
  );
};
