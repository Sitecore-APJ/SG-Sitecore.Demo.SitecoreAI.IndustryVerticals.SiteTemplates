import { usePagination } from '@/hooks/usePagination';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useI18n } from 'next-localization';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  windowSize?: number;
  paginationButtonClasses?: string;
}

export const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
  windowSize = 3,
  paginationButtonClasses = 'px-3 py-2 md:px-4 md:py-3 border border-transparent',
}: PaginationProps) => {
  const { totalPages, startPage, endPage, visiblePages } = usePagination({
    totalItems,
    currentPage,
    itemsPerPage,
    windowSize,
  });

  const { t } = useI18n();
  if (totalPages <= 1) return null;
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="mt-12 flex items-center justify-center space-x-2 text-xs tracking-[0.12em] uppercase md:space-x-3">
      {currentPage > 1 && (
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className={`${paginationButtonClasses} border-border bg-background hover:border-foreground`}
        >
          <span className="md:hidden">
            <ChevronLeft size={16} />
          </span>
          <span className="hidden md:block">{t('pagination_prev_btn_text') || 'Prev'}</span>
        </button>
      )}

      {startPage > 1 && (
        <>
          <button
            onClick={() => handlePageChange(1)}
            className={`${paginationButtonClasses} ${
              currentPage === 1
                ? 'border-foreground bg-foreground text-background'
                : 'border-border bg-background hover:border-foreground'
            }`}
          >
            1
          </button>
          <span className="md:px-2">...</span>
        </>
      )}

      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`${paginationButtonClasses} ${
            page === currentPage
              ? 'border-foreground bg-foreground text-background'
              : 'border-border bg-background hover:border-foreground'
          }`}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          <span className="md:px-2">...</span>
          <button
            onClick={() => handlePageChange(totalPages)}
            className={`${paginationButtonClasses} ${
              currentPage === totalPages
                ? 'border-foreground bg-foreground text-background'
                : 'border-border bg-background hover:border-foreground'
            }`}
          >
            {totalPages}
          </button>
        </>
      )}

      {currentPage < totalPages && (
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className={`${paginationButtonClasses} border-border bg-background hover:border-foreground`}
        >
          <span className="md:hidden">
            <ChevronRight size={16} />
          </span>
          <span className="hidden md:block">{t('pagination_next_btn_text') || 'Next'}</span>
        </button>
      )}
    </div>
  );
};
