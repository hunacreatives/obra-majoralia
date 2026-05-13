import { useState, useCallback, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const ARROW_GUTTER = 128;
const FOOTER_H = 52;
const PAGE_RATIO = 16 / 9;

const PdfViewer = ({
  file,
  headerHeight = 0,
}: {
  file: string;
  headerHeight?: number;
}) => {
  const [numPages, setNumPages] = useState(0);
  const [page, setPage] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const [pageWidth, setPageWidth] = useState(900);

  const measure = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const availW = el.clientWidth - ARROW_GUTTER;
    const availH = el.clientHeight - headerHeight - FOOTER_H - 32; // 32px vertical padding
    const widthFromHeight = availH * PAGE_RATIO;
    setPageWidth(Math.floor(Math.min(availW, widthFromHeight)));
  }, [headerHeight]);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  const onLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    measure();
  }, [measure]);

  return (
    <div ref={containerRef} className="relative w-full h-full flex flex-col items-center bg-[#f5f4f3]">

      {/* Left arrow */}
      <button
        onClick={() => setPage(p => Math.max(1, p - 1))}
        disabled={page <= 1}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/90 border border-[#e4e3e2] shadow-sm hover:bg-white transition-colors duration-200 disabled:opacity-20 cursor-pointer disabled:cursor-default"
        aria-label="Previous page"
      >
        <i className="ri-arrow-left-s-line text-[#383838] text-xl" />
      </button>

      {/* Right arrow */}
      <button
        onClick={() => setPage(p => Math.min(numPages, p + 1))}
        disabled={page >= numPages}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/90 border border-[#e4e3e2] shadow-sm hover:bg-white transition-colors duration-200 disabled:opacity-20 cursor-pointer disabled:cursor-default"
        aria-label="Next page"
      >
        <i className="ri-arrow-right-s-line text-[#383838] text-xl" />
      </button>

      {/* PDF page — constrained to available space */}
      <div className="flex-1 w-full flex items-center justify-center overflow-hidden">
        <Document
          file={file}
          onLoadSuccess={onLoadSuccess}
          loading={
            <span className="text-[11px] tracking-[3px] text-[#bbb] uppercase" style={{ fontFamily: 'var(--font-sans)' }}>
              Loading...
            </span>
          }
        >
          <Page
            pageNumber={page}
            width={pageWidth}
            renderAnnotationLayer={false}
            renderTextLayer={false}
          />
        </Document>
      </div>

      {/* Page counter */}
      <div className="shrink-0 pb-4 flex items-center gap-4">
        <div className="flex gap-1">
          {Array.from({ length: numPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`block rounded-full transition-all duration-200 cursor-pointer ${
                i + 1 === page ? 'w-4 h-[3px] bg-[#383838]' : 'w-[3px] h-[3px] bg-[#ccc] hover:bg-[#999]'
              }`}
            />
          ))}
        </div>
        <span className="text-[11px] tracking-[2px] text-[#999]" style={{ fontFamily: 'var(--font-sans)' }}>
          {page} / {numPages}
        </span>
      </div>
    </div>
  );
};

export default PdfViewer;
