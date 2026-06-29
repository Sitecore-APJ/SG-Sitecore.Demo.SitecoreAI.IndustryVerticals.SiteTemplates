import { NextImage as ContentSdkImage, Text } from '@sitecore-content-sdk/nextjs';
import StarRating from './StarRating';
import Link from 'next/link';
import { Product } from '@/types/products';
import { useLocale } from '@/hooks/useLocaleOptions';

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
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        })
      : product.Price?.value;

  return (
    <Link href={url} passHref>
      <div
        className={`group flex min-h-110 w-full flex-col overflow-hidden transition-opacity hover:opacity-95 ${className}`}
      >
        <div className="bg-background-accent flex aspect-4/5 w-full items-center justify-center overflow-hidden p-4">
          <ContentSdkImage
            field={product.Image1}
            className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
            priority
          />
        </div>

        <div className="bg-background flex grow flex-col items-start px-1 pt-4 pb-6 text-left">
          <p className="text-foreground-muted text-xs tracking-wide uppercase">
            <Text field={product.Category?.fields?.CategoryName} />
          </p>

          <h6 className="font-heading text-foreground mt-2 line-clamp-2 text-base font-medium">
            <Text field={product.Title} />
          </h6>

          <StarRating
            rating={product.Rating || 0}
            showOnlyFilled
            className="!text-gold mt-2 mb-4"
          />

          <p className="text-foreground mt-auto text-sm font-normal">
            <span className="text-foreground-muted mr-1 text-xs">{currencySymbol}</span>
            {formattedPrice}
          </p>
        </div>
      </div>
    </Link>
  );
};
