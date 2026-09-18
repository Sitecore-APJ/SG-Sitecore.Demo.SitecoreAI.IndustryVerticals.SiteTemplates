/**
 * Thin underline accent — matches Millennium's editorial eyebrow treatment
 * instead of the prior demo's decorative wavy stroke.
 */
const AccentLine = ({ className }: { className?: string }) => {
  return (
    <span
      aria-hidden="true"
      className={`bg-foreground mt-3 block !h-px w-[7ch] max-w-full group-[.text-center]/heading:mx-auto group-[.text-right]/heading:ml-auto ${className ?? ''}`}
    />
  );
};

export default AccentLine;
