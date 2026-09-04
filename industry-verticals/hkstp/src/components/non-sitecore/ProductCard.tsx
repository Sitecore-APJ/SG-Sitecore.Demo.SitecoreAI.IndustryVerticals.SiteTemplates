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
        className={`border-border flex min-h-123 w-full flex-col overflow-hidden rounded-sm border transition-shadow hover:shadow-md ${className}`}
      >
        {/* Product Image */}
        <div className="bg-background-surface flex h-72 w-full items-center justify-center p-6">
          <ContentSdkImage
            field={product.Image1}
            className="max-h-full max-w-full object-contain"
            priority
          />
        </div>

        {/* Product Details */}
        <div className="bg-background flex grow-1 flex-col items-start px-5 pt-4 pb-8 text-left">
          <p className="!text-foreground-muted text-xs font-semibold tracking-wide uppercase">
            <Text field={product.Category?.fields?.CategoryName} />
          </p>

          <h6 className="!text-foreground mt-2 line-clamp-2 text-base font-bold">
            <Text field={product.Title} />
          </h6>

          <StarRating
            rating={product.Rating || 0}
            showOnlyFilled
            className="!text-accent mt-2 mb-5"
          />

          <h6 className="!text-foreground mt-auto font-bold">
            <span className="mr-1 align-super text-sm">{currencySymbol} </span>
            {formattedPrice}
          </h6>
        </div>
      </div>
    </Link>
  );
};
