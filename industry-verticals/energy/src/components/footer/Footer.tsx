import React, { JSX } from 'react';
import {
  ComponentParams,
  ComponentRendering,
  ImageField,
  LinkField,
  Placeholder,
  RichTextField,
  TextField,
  Text as ContentSdkText,
  Link as ContentSdkLink,
  RichText,
  NextImage as ContentSdkImage,
} from '@sitecore-content-sdk/nextjs';

interface Fields {
  TitleOne: TextField;
  TitleTwo: TextField;
  TitleThree: TextField;
  CopyrightText: TextField;
  PolicyText: LinkField;
  CookiesText: LinkField;
  ContactText: LinkField;
  TermsText: LinkField;
  Logo: ImageField;
  Description: RichTextField;
}

type FooterProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

const Footer = (props: FooterProps): JSX.Element => {
  const sxaStyles = `${props.params?.styles || ''}`;

  const id = props.params.RenderingIdentifier;

  const phKeyOne = `footer-list-first-${props?.params?.DynamicPlaceholderId}`;
  const phKeyTwo = `footer-list-second-${props?.params?.DynamicPlaceholderId}`;
  const phKeyThree = `footer-list-third-${props?.params?.DynamicPlaceholderId}`;
  const phKeyFour = `footer-list-fourth-${props?.params?.DynamicPlaceholderId}`;

  const sections = [
    {
      key: 'first_nav',
      title: <ContentSdkText field={props.fields.TitleOne} />,
      content: <Placeholder name={phKeyOne} rendering={props.rendering} />,
    },
    {
      key: 'second_nav',
      title: <ContentSdkText field={props.fields.TitleTwo} />,
      content: <Placeholder name={phKeyTwo} rendering={props.rendering} />,
    },
    {
      key: 'third_nav',
      title: <ContentSdkText field={props.fields.TitleThree} />,
      content: <Placeholder name={phKeyThree} rendering={props.rendering} />,
    },
  ];

  const legalLinkClass =
    'text-primary-foreground/90 hover:text-primary-foreground text-sm underline-offset-2 hover:underline';

  return (
    <>
      <div className={`bg-primary text-primary-foreground py-12 ${sxaStyles}`} id={id}>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            <div>
              <div className="mb-4 flex max-w-48 space-x-2">
                <ContentSdkImage field={props.fields.Logo} width={200} />
              </div>
              <div className="**:text-primary-foreground/85 mb-6 text-sm leading-relaxed">
                <RichText field={props.fields.Description} />
              </div>
              <Placeholder name={phKeyFour} rendering={props.rendering} />
            </div>

            {sections.map(({ key, title, content }) => (
              <div key={key}>
                <div className="mb-4 border-b border-white/25 pb-2 text-base font-semibold">
                  {title}
                </div>
                <div className="text-primary-foreground/90 text-sm **:leading-relaxed">
                  {content}
                </div>
              </div>
            ))}
          </div>

          <hr className="border-primary-foreground/25 my-10" />
        </div>
      </div>

      <div className="bg-[#2d2d2d] py-4 text-white/85">
        <div className="container mx-auto flex flex-col gap-4 px-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <ContentSdkLink className={legalLinkClass} field={props.fields.PolicyText} />
            <ContentSdkLink className={legalLinkClass} field={props.fields.TermsText} />
            <ContentSdkLink className={legalLinkClass} field={props.fields.CookiesText} />
            <ContentSdkLink className={legalLinkClass} field={props.fields.ContactText} />
          </div>
          <p className="text-sm md:text-right">
            <ContentSdkText field={props.fields.CopyrightText} />
          </p>
        </div>
      </div>
    </>
  );
};

export const Default = Footer;
