import { Product } from '@/types/products';

interface ProductSizeControlProps {
  sizes?: Product['Size'];
  selectedSize?: Product['Size'][number];
  onSelect: (size: Product['Size'][number]) => void;
}

export const ProductSizeControl = ({
  sizes = [],
  selectedSize,
  onSelect,
}: ProductSizeControlProps) => {
  if (!sizes.length) return null;

  return (
    <div className="flex gap-3">
      {sizes.map((size) => (
        <button
          key={size.id}
          onClick={() => onSelect(size)}
          className={`size-9 border text-xs font-medium tracking-wide transition-colors ${
            selectedSize?.id === size.id
              ? 'border-foreground bg-foreground text-background'
              : 'border-border bg-background hover:border-foreground'
          }`}
        >
          {size.fields?.ProductSize?.value ?? '-'}
        </button>
      ))}
    </div>
  );
};
