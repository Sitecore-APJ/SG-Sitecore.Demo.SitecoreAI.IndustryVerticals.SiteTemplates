/** Short brand underline used under section titles — HKSTP-style orange bar */
const AccentLine = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 8"
      fill="none"
      className={`mt-2 block h-1.5 w-[5ch] max-w-full group-[.text-center]/heading:mx-auto group-[.text-right]/heading:ml-auto ${className} text-accent`}
      preserveAspectRatio="none"
    >
      <rect x="0" y="2" width="120" height="4" rx="2" fill="currentColor" />
    </svg>
  );
};

export default AccentLine;
