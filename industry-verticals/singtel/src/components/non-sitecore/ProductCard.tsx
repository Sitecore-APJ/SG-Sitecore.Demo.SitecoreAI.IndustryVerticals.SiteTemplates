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
        className={`border-border bg-background flex min-h-112 w-full flex-col overflow-hidden rounded-2xl border transition-shadow hover:shadow-md ${className}`}
      >
        <div className="bg-background-surface flex h-64 w-full items-center justify-center p-6">
          <ContentSdkImage
            field={product.Image1}
            className="max-h-full max-w-full object-contain"
            priority
          />
        </div>

        <div className="flex grow flex-col items-start px-5 pt-4 pb-6 text-left">
          <p className="!text-foreground-muted text-sm">
            <Text field={product.Category?.fields?.CategoryName} />
          </p>

          <h6 className="!text-foreground font-body mt-1 line-clamp-2 text-base font-semibold">
            <Text field={product.Title} />
          </h6>

          <StarRating
            rating={product.Rating || 0}
            showOnlyFilled
            className="!text-accent mt-2 mb-4"
          />

          <h6 className="!text-foreground font-body mt-auto text-lg font-bold">
            <span className="mr-0.5 align-super text-sm">{currencySymbol}</span>
            {formattedPrice}
          </h6>
        </div>
      </div>
    </Link>
  );
};
