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
      className="focus:outline-accent"
      aria-label={article.name || article.title}
    >
      <ArticleCard.Root
        key={article.id}
        className={`group border-border hover:border-accent relative border transition-colors ${className}`}
      >
        <div className="bg-background-surface h-50 w-full overflow-hidden">
          <Image
            src={validImageUrl}
            className="h-full w-full object-cover object-center transition-opacity duration-300 group-hover:opacity-90 lg:h-full lg:w-full"
            alt={article.name || article.title}
            width={500}
            height={115}
            loading="lazy"
          />
        </div>
        <div className="relative m-5 flex-col justify-between">
          <span className="text-foreground-muted mt-2 text-xs font-medium tracking-wide uppercase">
            {article.type}
          </span>
          <ArticleCard.Title className="text-foreground mt-2 h-10 overflow-hidden text-base font-medium">
            {article.name || article.title}
          </ArticleCard.Title>
          <ArticleCard.Subtitle className="text-foreground-light mt-3 flex text-sm">
            <div className="text-accent right-0 flex items-center gap-1.5 text-sm font-medium transition-colors group-hover:underline">
              {t('view') || 'Read more'} <span aria-hidden="true">→</span>
            </div>
          </ArticleCard.Subtitle>
        </div>
      </ArticleCard.Root>
    </Link>
  );
};

export default ArticleItemCard;
