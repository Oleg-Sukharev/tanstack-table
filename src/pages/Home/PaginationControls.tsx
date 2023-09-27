import { useMemo, useState, useCallback } from "react";
import { IconButton } from "@/components/IconButton";
import LeftIcon from "@/assets/images/leftIcon.svg?react";
import RightIcon from "@/assets/images/rightIcon.svg?react";
import LeftLineIcon from "@/assets/images/leftLineIcon.svg?react";
import RightLineIcon from "@/assets/images/rightLineIcon.svg?react";
import { Input } from "@/components/Input";
import { ITEMS_PER_PAGE } from "@/constants/constants";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/Select";

interface PaginationControlsProps {
  table: any; // Replace 'any' with the actual type of 'table'
  total: number | undefined;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({ table, total = 0 }) => {
  const [inputPage, setInputValue] = useState(() => table.getState().pagination.pageIndex + 1);
  const [pageSize, setPageSize] = useState(() => table.getState().pagination.pageSize);

  const paginationPageIndex = table.getState().pagination.pageIndex;
  const startItem = paginationPageIndex * pageSize + 1;
  const pageCount = table.getPageCount();

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!value || isNaN(Number(value))) {
      setInputValue(value);
      return;
    }
    const newValue = Math.max(1, Math.min(pageCount, Number(value)));
    setInputValue(newValue.toString());
    table.setPageIndex(newValue - 1);
  }, [pageCount, setInputValue, table]);

  const resultString = useMemo(() => {
    const endItem = Math.min((paginationPageIndex + 1) * pageSize, total);
    if (!endItem) return null;
    return `${startItem} - ${endItem} of ${total}`;
  }, [startItem, total, pageSize]);

  const handlePageSizeChange = useCallback(
    (val: string) => {
      table.setPageSize(val);
      setPageSize(val);
    },
    [table, setPageSize]
  );

  return (
    <div className="flex w-full items-center gap-2 rounded-b-xl bg-white p-2">
      <Select
        value={String(pageSize)}
        onValueChange={handlePageSizeChange}
      >
        <SelectTrigger className="w-[88px]" id="itemsPerPage" area-label="Items per page">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {ITEMS_PER_PAGE.map((option) => (
              <SelectItem key={option} value={String(option)}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <span className="font-state-900 ml-1 text-ss font-semibold uppercase">Items per page</span>

      <div className="align-center ml-auto flex items-center gap-2">
        <span className="text-ss font-semibold">{resultString}</span>

        <IconButton
          Svg={LeftLineIcon}
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
          area-label="First page"
        />

        <IconButton
          Svg={LeftIcon}
          onClick={table.previousPage}
          disabled={!table.getCanPreviousPage()}
          area-label="Previous page"
        />

        <Input
          type="number"
          onChange={handleInputChange}
          value={inputPage}
          className="w-16 text-center"
          area-label="Current Page"
        />

        <IconButton
          Svg={RightIcon}
          onClick={table.nextPage}
          disabled={!table.getCanNextPage()}
          area-label="Next"
        />

        <IconButton
          Svg={RightLineIcon}
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
          area-label="Last page"
        />
      </div>
    </div>
  );
};
