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
    <section className={`component section-wrapper py-12 lg:py-16 ${styles}`} id={id}>
      <div className="container">
        <div className="section-heading-row">
          <h2 className="text-2xl font-bold lg:text-3xl">
            <Text field={fields.Title} />
            {!hideAccentLine && <AccentLine className="mt-2" />}
          </h2>
          <Link field={fields.Link} className="arrow-btn shrink-0" />
        </div>

        <div className="w-full">
          <Placeholder name={placeholderKey} rendering={rendering} />
        </div>
      </div>
    </section>
  );
};
