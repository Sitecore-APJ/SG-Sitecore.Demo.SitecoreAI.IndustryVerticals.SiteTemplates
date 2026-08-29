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
  Image as ContentSdkImage,
} from '@sitecore-content-sdk/nextjs';

interface Fields {
  TitleOne: TextField;
  TitleTwo: TextField;
  TitleThree: TextField;
  CopyrightText: TextField;
  PolicyText: LinkField;
  CookiesText: LinkField;
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
  // styles
  const sxaStyles = `${props.params?.styles || ''}`;

  // rendering item id
  const id = props.params.RenderingIdentifier;

  // placeholders keys
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

  return (
    <div
      className={`component footer bg-background-muted text-foreground pt-16 pb-0 ${sxaStyles}`}
      id={id}
    >
      <div className="container mx-auto">
        {/* content section */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* footer content data */}
          <div>
            <div className="mb-5 flex max-w-44 space-x-2">
              <ContentSdkImage field={props.fields.Logo} className="h-auto w-full object-contain" />
            </div>
            <div className="text-foreground-light mb-6 text-sm leading-relaxed">
              <RichText field={props.fields.Description} />
            </div>
            <Placeholder name={phKeyFour} rendering={props.rendering} />
          </div>

          {/* footer link lists */}
          {sections.map(({ key, title, content }) => (
            <div key={key}>
              <div className="text-foreground mb-4 text-sm font-semibold tracking-wide uppercase">
                {title}
              </div>
              <div>{content}</div>
            </div>
          ))}
        </div>
      </div>

      {/* copyright section */}
      <div className="border-border bg-background-accent mt-12 border-t py-5">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-foreground-muted text-sm">
            <ContentSdkText field={props.fields.CopyrightText} />
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <ContentSdkLink
              className="text-foreground-muted hover:text-accent text-sm no-underline"
              field={props.fields.PolicyText}
            />
            <ContentSdkLink
              className="text-foreground-muted hover:text-accent text-sm no-underline"
              field={props.fields.TermsText}
            />
            <ContentSdkLink
              className="text-foreground-muted hover:text-accent text-sm no-underline"
              field={props.fields.CookiesText}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const Default = Footer;
