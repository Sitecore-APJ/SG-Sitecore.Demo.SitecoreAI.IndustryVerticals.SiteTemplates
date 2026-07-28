const AccentLine = ({ className }: { className?: string }) => {
  return (
    <span
      className={`bg-foreground mt-3 block h-1 w-16 max-w-full rounded-full group-[.text-center]/heading:mx-auto group-[.text-right]/heading:ml-auto ${className ?? ''}`}
      aria-hidden="true"
    />
  );
};

export default AccentLine;
