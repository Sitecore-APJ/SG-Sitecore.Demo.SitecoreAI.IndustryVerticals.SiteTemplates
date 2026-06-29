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
          className={`size-8 rounded-sm border text-sm transition-colors ${
            selectedSize?.id === size.id
              ? 'bg-accent text-background border-accent'
              : 'border-border bg-background hover:border-accent'
          }`}
        >
          {size.fields?.ProductSize?.value ?? '-'}
        </button>
      ))}
    </div>
  );
};
