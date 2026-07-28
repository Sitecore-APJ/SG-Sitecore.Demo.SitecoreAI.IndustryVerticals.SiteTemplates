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
      className="focus:outline-secondary"
      aria-label={article.name || article.title}
    >
      <ArticleCard.Root
        key={article.id}
        className={`sentosa-card group relative my-4 flex max-h-52 w-full flex-row flex-nowrap p-4 ${className}`}
      >
        {validImageUrl && (
          <div className="w-1/4 flex-none overflow-hidden rounded-xl">
            <Image
              src={validImageUrl}
              className="aspect-square h-full w-full rounded-xl object-cover"
              alt="alt"
              width={500}
              height={500}
            />
          </div>
        )}
        <div className="grow flex-col pl-4">
          <span aria-hidden="true" className="absolute inset-0"></span>
          <ArticleCard.Title className="text-foreground mb-2 text-base font-semibold">
            {article.name || article.title}
          </ArticleCard.Title>
          <ArticleCard.Subtitle className="text-foreground-light mt-2 line-clamp-2 text-sm">
            {article.description}
          </ArticleCard.Subtitle>
          <div className="promo-badge absolute top-4 right-4">{article.type}</div>
        </div>
      </ArticleCard.Root>
    </Link>
  );
};
export default ArticleHorizontalItemCard;
