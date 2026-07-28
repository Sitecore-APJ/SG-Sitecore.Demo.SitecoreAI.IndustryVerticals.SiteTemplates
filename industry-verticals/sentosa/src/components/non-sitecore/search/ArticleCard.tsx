import { ArticleCard } from '@sitecore-search/ui';
import Link from 'next/link';
import Image from 'next/image';
import { DEFAULT_IMG_URL } from '@/constants/search';
import { EntityModel } from '@sitecore-search/react';
import { useI18n } from 'next-localization';
import { ArrowRight } from 'lucide-react';

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
      className="focus:outline-secondary"
      aria-label={article.name || article.title}
    >
      <ArticleCard.Root key={article.id} className={`sentosa-card group relative ${className}`}>
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={validImageUrl}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            alt={article.name || article.title}
            width={500}
            height={375}
            loading="lazy"
          />
          {article.type && <span className="category-badge">{article.type}</span>}
        </div>
        <div className="flex flex-col gap-2 p-4">
          <ArticleCard.Title className="text-foreground line-clamp-2 text-base font-semibold">
            {article.name || article.title}
          </ArticleCard.Title>
          <ArticleCard.Subtitle className="text-secondary mt-1 flex items-center gap-1 text-sm font-medium">
            {t('view') || 'View'} <ArrowRight className="size-3.5" />
          </ArticleCard.Subtitle>
        </div>
      </ArticleCard.Root>
    </Link>
  );
};

export default ArticleItemCard;
