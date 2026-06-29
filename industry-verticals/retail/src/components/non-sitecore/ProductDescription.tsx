import { Text as ContentSdkText, useSitecore } from '@sitecore-content-sdk/nextjs';
import { Product } from '@/types/products';
import StarRating from '../non-sitecore/StarRating';
import { useLocale } from '@/hooks/useLocaleOptions';
import { calculateAverageRating } from '@/helpers/productUtils';

interface ProductDescriptionProps {
  product: Product;
}

export const ProductDescription = ({ product }: ProductDescriptionProps) => {
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const { currency } = useLocale();

  const reviews = product?.Reviews || [];
  const reviewCount = reviews.length;
  const averageRating = calculateAverageRating(reviews);

  return (
    <>
      <h1 className="font-heading pt-3 text-3xl font-medium lg:pt-0 lg:text-4xl">
        <ContentSdkText field={product.Title} />
      </h1>

      {(product?.Price?.value || isPageEditing) && (
        <p className="text-xl">
          {currency} <ContentSdkText field={product.Price} />
        </p>
      )}

      {!!product?.Reviews?.length && (
        <div className="flex items-center space-x-3">
          <span className="text-foreground text-lg">{averageRating}</span>
          <StarRating rating={averageRating} className="!text-gold" />
          <div className="bg-foreground-muted h-7 w-px" />
          <span className="text-foreground-muted text-sm">
            {reviewCount} Customer Review{reviewCount !== 1 ? 's' : ''}
          </span>
        </div>
      )}

      {(product?.ShortDescription?.value || isPageEditing) && (
        <p className="text-foreground text-lg">
          <ContentSdkText field={product.ShortDescription} />
        </p>
      )}
    </>
  );
};
