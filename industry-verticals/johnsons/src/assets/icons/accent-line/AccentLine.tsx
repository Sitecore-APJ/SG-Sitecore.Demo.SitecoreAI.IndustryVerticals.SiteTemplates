/** Straight editorial rule — replaces the retail wavy underline for J&J look */
const AccentLine = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 441 8"
      fill="none"
      className={`mt-3 block h-[3px] w-[4ch] max-w-full group-[.text-center]/heading:mx-auto group-[.text-right]/heading:ml-auto ${className} text-accent`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <rect x="0" y="2" width="441" height="4" fill="currentColor" />
    </svg>
  );
};

export default AccentLine;
