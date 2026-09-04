import { ArticleCard } from '@sitecore-search/ui';
import Image from 'next/image';
import { DEFAULT_IMG_URL } from '@/constants/search';
import Link from 'next/link';
import { EntityModel } from '@sitecore-search/react';

type ArticleCardItemCardProps = {
  className?: string;
  displayText?: boolean;
  article: EntityModel;
  onItemClick: React.MouseEventHandler<HTMLAnchorElement>;
  index: number;
};

const ArticleHorizontalItemCard = ({ className = '', article }: ArticleCardItemCardProps) => {
  let validImageUrl = article.image_url?.trim() ? article.image_url : DEFAULT_IMG_URL;

  if (validImageUrl.includes('filters:no_upscale')) {
    validImageUrl = undefined;
  }

  return (
    <Link
      href={article.url}
      className="focus:outline-accent"
      aria-label={article.name || article.title}
    >
      <ArticleCard.Root
        key={article.id}
        className={`group bg-background relative my-4 flex max-h-52 w-full flex-row flex-nowrap overflow-hidden rounded-sm p-0 transition-shadow hover:shadow-md ${className}`}
      >
        {validImageUrl && (
          <div className="bg-background-surface w-1/3 flex-none overflow-hidden sm:w-1/4">
            <Image
              src={validImageUrl}
              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              alt="alt"
              width={500}
              height={115}
            />
          </div>
        )}
        <div className="grow flex-col p-4 pl-5">
          <span aria-hidden="true" className="absolute inset-0"></span>
          {article.type && <span className="tag-pill mb-2 !text-xs">{article.type}</span>}
          <ArticleCard.Title className="text-foreground mb-2 text-base font-bold">
            {article.name || article.title}
          </ArticleCard.Title>
          <ArticleCard.Subtitle className="text-foreground-light mt-2 line-clamp-2 text-sm">
            {article.description}
          </ArticleCard.Subtitle>
        </div>
      </ArticleCard.Root>
    </Link>
  );
};
export default ArticleHorizontalItemCard;
