const AccentLine = ({ className }: { className?: string }) => {
  return (
    <span
      aria-hidden="true"
      className={`bg-accent mt-2 block h-[0.22em] min-h-1.5 w-[7ch] max-w-full group-[.text-center]/heading:mx-auto group-[.text-right]/heading:ml-auto ${className ?? ''}`}
    />
  );
};

export default AccentLine;
