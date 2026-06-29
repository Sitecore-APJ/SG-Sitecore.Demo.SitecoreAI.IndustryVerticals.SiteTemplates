import AccentLine from '@/assets/icons/accent-line/AccentLine';
import { ComponentProps } from '@/lib/component-props';
import { CommonStyles } from '@/types/styleFlags';
import { Field, Link, LinkField, Placeholder, Text } from '@sitecore-content-sdk/nextjs';

interface Fields {
  Title: Field<string>;
  Link: LinkField;
}

interface SectionWrapperProps extends ComponentProps {
  fields: Fields;
}

export const Default = ({ params, fields, rendering }: SectionWrapperProps) => {
  const { styles, RenderingIdentifier: id } = params;
  const hideAccentLine = styles?.includes(CommonStyles.HideAccentLine);
  const placeholderKey = `section-wrapper-content-${params.DynamicPlaceholderId}`;

  return (
    <section className={`component section-wrapper py-16 lg:py-20 ${styles}`} id={id}>
      <div className="container flex flex-col items-center">
        <h2 className="font-heading text-center text-3xl font-medium lg:text-4xl">
          <Text field={fields.Title} />
          {!hideAccentLine && <AccentLine className="mx-auto" />}
        </h2>

        <div className="mt-10 mb-10 w-full">
          <Placeholder name={placeholderKey} rendering={rendering} />
        </div>

        <Link field={fields.Link} className="arrow-btn" />
      </div>
    </section>
  );
};
