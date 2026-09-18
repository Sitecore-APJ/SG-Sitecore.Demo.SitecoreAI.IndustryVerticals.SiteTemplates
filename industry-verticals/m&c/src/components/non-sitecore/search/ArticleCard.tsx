import { ArticleCard } from '@sitecore-search/ui';
import Link from 'next/link';
import Image from 'next/image';
import { DEFAULT_IMG_URL } from '@/constants/search';
import { EntityModel } from '@sitecore-search/react';
import { useI18n } from 'next-localization';

type ArticleItemCardProps = {
  className?: string;
  article: EntityModel;
  index: number;
  onItemClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

const ArticleItemCard = ({ className = '', article }: ArticleItemCardProps) => {
  const { t } = useI18n();
  const validImageUrl = article.image_url?.trim() ? article.image_url : DEFAULT_IMG_URL;

  return (
    <Link
      href={article.url}
      className="focus:outline-foreground"
      aria-label={article.name || article.title}
    >
      <ArticleCard.Root
        key={article.id}
        className={`group border-border hover:border-foreground bg-background relative rounded-none border shadow-none transition-colors ${className}`}
      >
        <div className="bg-background-surface h-50 w-full overflow-hidden">
          <Image
            src={validImageUrl}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105 lg:h-full lg:w-full"
            alt={article.name || article.title}
            width={500}
            height={115}
            loading="lazy"
          />
        </div>
        <div className="relative m-5 flex-col justify-between">
          <span className="text-foreground-muted mt-1 text-xs font-medium tracking-[0.14em] uppercase">
            {article.type}
          </span>
          <ArticleCard.Title className="mt-2 h-10 overflow-hidden text-base font-semibold">
            {article.name || article.title}
          </ArticleCard.Title>
          <ArticleCard.Subtitle className="text-foreground-light mt-4 flex text-sm">
            <div className="text-foreground group-hover:text-foreground-light border-foreground flex items-center gap-1 border-b pb-0.5 text-xs font-semibold tracking-[0.16em] uppercase transition-colors">
              {t('view') || 'View'}
            </div>
          </ArticleCard.Subtitle>
        </div>
      </ArticleCard.Root>
    </Link>
  );
};

export default ArticleItemCard;
