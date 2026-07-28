import { NextImage as ContentSdkImage, Text } from '@sitecore-content-sdk/nextjs';
import Link from 'next/link';
import { Product } from '@/types/products';
import { useLocale } from '@/hooks/useLocaleOptions';
import { Tag } from 'lucide-react';

interface ProductCardProps {
  product: Partial<Product> & {
    Rating: number;
  };
  url: string;
  className?: string;
}

export const ProductCard = ({ product, url, className }: ProductCardProps) => {
  const { currencySymbol } = useLocale();
  const formattedPrice =
    product.Price?.value && !isNaN(product.Price?.value)
      ? product.Price.value.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : product.Price?.value;

  const categoryName = product.Category?.fields?.CategoryName?.value;
  const hasPromo = (product.Rating ?? 0) >= 4;

  return (
    <Link href={url} passHref>
      <article className={`sentosa-card group flex h-full w-full flex-col ${className ?? ''}`}>
        {/* Product Image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <ContentSdkImage
            field={product.Image1}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            priority
          />
          {categoryName && <span className="category-badge">{categoryName}</span>}
        </div>

        {/* Product Details */}
        <div className="flex grow flex-col gap-3 px-4 pt-4 pb-5">
          <h6 className="!text-foreground line-clamp-2 text-base leading-snug font-semibold">
            <Text field={product.Title} />
          </h6>

          {categoryName && (
            <p className="!text-foreground-muted text-sm">
              <Text field={product.Category?.fields?.CategoryName} />
            </p>
          )}

          <div className="border-border border-t pt-3">
            <div className="flex items-center justify-between gap-2">
              <p className="!text-foreground text-base font-semibold">
                <span className="text-foreground-muted mr-1 text-xs font-normal">From</span>
                <span className="align-super text-xs">{currencySymbol}</span>
                {formattedPrice}
              </p>
              {hasPromo && (
                <span className="promo-badge">
                  <Tag className="size-3" />
                  Promo available
                </span>
              )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};
