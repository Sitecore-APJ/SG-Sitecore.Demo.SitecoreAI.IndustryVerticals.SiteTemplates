import ShortArrow from '@/assets/icons/arrow-short/ArrowShort';

interface CarouselButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  direction?: 'prev' | 'next';
  className?: string;
}

const CarouselButton = ({ direction = 'next', className = '', ...props }: CarouselButtonProps) => {
  return (
    <button
      className={`!text-foreground border-border bg-background z-10 size-11 content-center border shadow-none ${className}`}
      {...props}
    >
      <ShortArrow className={direction === 'prev' ? 'rotate-180' : ''} />
    </button>
  );
};

export default CarouselButton;
