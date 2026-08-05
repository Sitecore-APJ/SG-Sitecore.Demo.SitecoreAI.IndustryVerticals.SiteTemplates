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
  const id = props.params.RenderingIdentifier;

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
      <div className="bg-background-muted-dark text-background">
        <div className="container grid gap-10 py-16 lg:grid-cols-[1fr_3fr] lg:gap-16 lg:py-20">
          <div className="flex flex-col gap-6">
            <div className="sm:max-w-40">
              <Image field={props.fields.Logo} />
            </div>
            <RichText
              field={props.fields.Description}
              className="text-background/80 [&_a]:text-link text-sm leading-relaxed [&_a]:hover:underline"
            />
          </div>
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-8">
            {sections.map(({ key, title, content }) => (
              <div key={key}>
                <div className="mb-5 text-sm font-semibold tracking-wide uppercase">{title}</div>
                <div className="space-y-3 text-sm">{content}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-background border-border border-t">
        <div className="container flex items-center justify-between py-6 max-sm:flex-col max-sm:items-start max-sm:gap-6">
          <div className="text-foreground-muted text-sm max-sm:order-2">
            <Text field={props.fields.CopyrightText} />
          </div>
          <div className="flex items-center gap-8 max-sm:order-1 max-sm:flex-col max-sm:items-start max-sm:gap-4">
            <Link
              field={props.fields.TermsText}
              className="text-foreground-light hover:text-link text-sm transition-colors"
            />
            <Link
              field={props.fields.PolicyText}
              className="text-foreground-light hover:text-link text-sm transition-colors"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
