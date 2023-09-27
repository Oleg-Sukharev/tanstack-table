import * as React from "react";
import { mergeClassesUtils } from "@/utils/mergeClassesUtils";

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="scrollbar m-h-[40px] relative w-full overflow-auto rounded-xl">
      <table ref={ref} className={mergeClassesUtils("w-full caption-bottom", className)} {...props} />
    </div>
  ),
);

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={mergeClassesUtils("sticky top-0 z-10 text-ss [&_tr]:border-b", className)} {...props} />
  ),
);

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={mergeClassesUtils("[&_tr:last-child]:border-0 ", className)} {...props} />
  ),
);

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={mergeClassesUtils(
        "border-b  bg-white transition-colors hover:bg-slate-100 data-[state=selected]:bg-slate-100",
        className,
      )}
      {...props}
    />
  ),
);

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={mergeClassesUtils(
        "font-sm h-7 overflow-hidden text-ellipsis whitespace-nowrap border-r bg-gray-300 px-2 text-left align-middle font-semibold uppercase text-state-800 [&:last-child]:border-0",
        className,
      )}
      {...props}
    />
  ),
);

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={mergeClassesUtils(
        "[&:first-child]:t-0 overflow-hidden text-ellipsis whitespace-nowrap border-r bg-white p-2 align-middle text-sm [&:first-child]:font-semibold [&:last-child]:border-0 ",
        className,
      )}
      {...props}
    />
  ),
);

export { Table, TableHeader, TableBody, TableHead, TableRow, TableCell };
