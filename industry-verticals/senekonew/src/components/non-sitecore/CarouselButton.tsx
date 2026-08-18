import ShortArrow from '@/assets/icons/arrow-short/ArrowShort';

interface CarouselButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  direction?: 'prev' | 'next';
  className?: string;
}

const CarouselButton = ({ direction = 'next', className = '', ...props }: CarouselButtonProps) => {
  return (
    <button
      className={`!text-primary bg-background border-border z-10 size-11 content-center rounded-full border shadow-sm ${className}`}
      {...props}
    >
      <ShortArrow className={direction === 'prev' ? 'rotate-180' : ''} />
    </button>
  );
};

export default CarouselButton;
