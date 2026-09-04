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
      className="focus:outline-accent"
      aria-label={article.name || article.title}
    >
      <ArticleCard.Root
        key={article.id}
        className={`group relative overflow-hidden rounded-sm transition-all duration-300 hover:shadow-md ${className}`}
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
        <div className="relative flex-col justify-between py-4">
          {article.type && <span className="tag-pill mb-3">{article.type}</span>}
          <ArticleCard.Title className="mt-3 h-auto overflow-hidden text-base leading-snug font-bold">
            {article.name || article.title}
          </ArticleCard.Title>
          <ArticleCard.Subtitle className="text-foreground-light mt-3 flex text-sm">
            <div className="text-accent group-hover:text-accent-dark right-0 flex items-center gap-1 text-sm font-semibold transition-colors">
              {t('view') || 'View'} <ArrowRight className="size-3" />
            </div>
          </ArticleCard.Subtitle>
        </div>
      </ArticleCard.Root>
    </Link>
  );
};

export default ArticleItemCard;
