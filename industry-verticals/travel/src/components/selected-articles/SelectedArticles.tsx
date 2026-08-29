import { ComponentProps } from '@/lib/component-props';
import {
  Field,
  LinkField,
  Link as ContentSdkLink,
  RichTextField,
  RichText as ContentSdkRichText,
  Image as ContentSdkImage,
  Text as ContentSdkText,
  DateField,
} from '@sitecore-content-sdk/nextjs';
import { Article } from '@/types/article';
import { newsDateFormatter } from '@/helpers/dateHelper';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useI18n } from 'next-localization';

interface Fields {
  Title: Field<string>;
  Description: RichTextField;
  ExploreLink: LinkField;
  Articles: Array<Article>;
}

export type CarouselProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: CarouselProps) => {
  const { t } = useI18n();
  const id = props.params.RenderingIdentifier;
  const styles = props.params.styles || [];
  const articles = props.fields?.Articles || [];

  return (
    <section className={`py-12 lg:py-20 ${styles}`} id={id}>
      <div className="container px-4">
        {/* title section */}
        <div className="container in-[.column-splitter]:px-0">
          <div className="mb-10 max-w-xl text-left lg:mb-14">
            <h2 className="mb-3">
              <ContentSdkText field={props.fields.Title} />
            </h2>
            <div className="text-foreground-light text-base lg:text-lg">
              <ContentSdkRichText field={props.fields.Description} />
            </div>
          </div>
        </div>

        {/* article list section */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {articles.map((article, index) => {
            return (
              <div className="nia-card flex h-full flex-col overflow-hidden" key={index}>
                <div className="relative shrink-0">
                  <p className="bg-accent text-background absolute top-4 left-4 z-10 max-w-max rounded-full px-3 py-1 text-xs font-medium">
                    <ContentSdkText field={article.fields.Category.fields.Category} />
                  </p>
                  <ContentSdkImage
                    field={article.fields.Image}
                    className="h-48 w-full object-cover"
                  />
                </div>

                <div className="flex min-h-0 flex-1 flex-col gap-3 p-6">
                  <div className="flex flex-col gap-3">
                    <h6 className="font-bold" role="heading" aria-level={3}>
                      <ContentSdkText field={article.fields.Title} />
                    </h6>
                    <div className="text-foreground-light line-clamp-2 text-sm">
                      <ContentSdkRichText field={article.fields.ShortDescription} />
                    </div>
                  </div>

                  <div className="mt-auto flex flex-col gap-3">
                    <div className="flex items-center justify-end">
                      <DateField
                        tag="p"
                        className="news-date text-foreground-muted text-xs"
                        field={article.fields.PublishedDate}
                        render={newsDateFormatter}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-foreground-muted text-xs">
                        <ContentSdkText field={article.fields.ReadTime} />
                      </p>
                      <Link href={article.url} className="cta-link">
                        {t('read_more') || 'Read more'}
                        <ChevronRight />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* cta section */}
        <div className="container mt-12 flex items-center justify-start">
          <ContentSdkLink
            field={props.fields.ExploreLink}
            className="btn-outline text-foreground max-w-max"
            aria-label={`link to ${props.fields.ExploreLink?.value?.text || 'explore more'}`}
          />
        </div>
      </div>
    </section>
  );
};
