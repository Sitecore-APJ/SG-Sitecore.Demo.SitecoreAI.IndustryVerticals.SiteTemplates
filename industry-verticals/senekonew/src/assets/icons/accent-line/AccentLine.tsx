import { cn } from '@/shadcn/lib/utils';

const AccentLine = ({ className }: { className?: string }) => {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'bg-accent mt-3 block h-1.5 w-16 max-w-full rounded-full group-[.text-center]/heading:mx-auto group-[.text-right]/heading:ml-auto',
        className
      )}
    />
  );
};

export default AccentLine;
