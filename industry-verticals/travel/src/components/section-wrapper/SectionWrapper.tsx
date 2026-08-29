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
    <section className={`component section-wrapper py-12 lg:py-20 ${styles}`} id={id}>
      <div className="container">
        <div className="mb-10 max-w-xl space-y-3 text-left lg:mb-14">
          <h2>
            <Text field={fields.Title} />
          </h2>
          <p className="text-foreground-light text-base lg:text-lg">
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
