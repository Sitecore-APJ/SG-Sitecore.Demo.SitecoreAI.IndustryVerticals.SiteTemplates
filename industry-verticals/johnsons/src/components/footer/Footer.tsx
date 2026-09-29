import {
  ComponentParams,
  ComponentRendering,
  Image,
  ImageField,
  Link,
  LinkField,
  Placeholder,
  RichText,
  RichTextField,
  Text,
  TextField,
} from '@sitecore-content-sdk/nextjs';
import React from 'react';

interface Fields {
  TitleOne: TextField;
  TitleTwo: TextField;
  TitleThree: TextField;
  TitleFour: TextField;
  TitleFive: TextField;
  CopyrightText: TextField;
  PolicyText: LinkField;
  TermsText: LinkField;
  Logo: ImageField;
  Description: RichTextField;
}

type FooterProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: FooterProps) => {
  // rendering item id
  const id = props.params.RenderingIdentifier;

  // placeholders keys
  const phKeyOne = `footer-list-first-${props?.params?.DynamicPlaceholderId}`;
  const phKeyTwo = `footer-list-second-${props?.params?.DynamicPlaceholderId}`;
  const phKeyThree = `footer-list-third-${props?.params?.DynamicPlaceholderId}`;
  const phKeyFour = `footer-list-fourth-${props?.params?.DynamicPlaceholderId}`;
  const phKeyFive = `footer-list-fifth-${props?.params?.DynamicPlaceholderId}`;

  const sections = [
    {
      key: 'first_nav',
      title: <Text field={props.fields.TitleOne} />,
      content: <Placeholder name={phKeyOne} rendering={props.rendering} />,
    },
    {
      key: 'second_nav',
      title: <Text field={props.fields.TitleTwo} />,
      content: <Placeholder name={phKeyTwo} rendering={props.rendering} />,
    },
    {
      key: 'third_nav',
      title: <Text field={props.fields.TitleThree} />,
      content: <Placeholder name={phKeyThree} rendering={props.rendering} />,
    },
    {
      key: 'fourth_nav',
      title: <Text field={props.fields.TitleFour} />,
      content: <Placeholder name={phKeyFour} rendering={props.rendering} />,
    },
    {
      key: 'fifth_nav',
      title: <Text field={props.fields.TitleFive} />,
      content: <Placeholder name={phKeyFive} rendering={props.rendering} />,
    },
  ];

  return (
    <section className={`component footer relative ${props.params.styles} overflow-hidden`} id={id}>
      <div className="bg-utility text-background">
        <div className="container grid gap-12 py-16 lg:grid-cols-[1fr_3fr] lg:py-20">
          <div className="flex flex-col gap-6">
            <div className="sm:max-w-40 [&_img]:brightness-0 [&_img]:invert">
              <Image field={props.fields.Logo} />
            </div>
            <div className="text-background/75 [&_a]:text-background [&_p]:!text-background/75 text-[15px] leading-relaxed">
              <RichText field={props.fields.Description} />
            </div>
          </div>
          <div className="grid gap-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5 xl:gap-8">
            {sections.map(({ key, title, content }) => (
              <div key={key}>
                <div className="text-background mb-5 text-[15px] font-medium">{title}</div>
                <div className="text-background/70 [&_a]:hover:text-background space-y-3 text-sm [&_a]:hover:underline">
                  {content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-foreground text-background/70">
        <div className="container flex items-center justify-between py-5 text-sm max-sm:flex-col max-sm:items-start max-sm:gap-6">
          <div className="max-sm:order-2">
            <Text field={props.fields.CopyrightText} />
          </div>
          <div className="[&_a]:hover:text-background flex items-center justify-between gap-10 max-sm:order-1 max-sm:flex-col max-sm:items-start max-sm:gap-3 [&_a]:hover:underline">
            <Link field={props.fields.TermsText} />
            <Link field={props.fields.PolicyText} />
          </div>
        </div>
      </div>
    </section>
  );
};
