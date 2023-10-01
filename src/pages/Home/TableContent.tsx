import { Alert, alertVariants } from "@/components/Alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/Table";
import { flexRender } from "@tanstack/react-table";

export const TableContent = ({ data }: any) => {
  return (
    <>
      <Table>
        <TableHeader>
          {data.getHeaderGroups().map((headerGroup: any) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header: any) => {
                return (
                  <TableHead
                    key={header.id}
                    className="[&:first-child]:sticky [&:first-child]:left-0 [&:last-child]:sticky [&:last-child]:right-0 [&:last-child]:w-[50px]"
                  >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        {data.getRowModel().rows?.length ? (
          <TableBody>
            {data.getRowModel().rows.map((row: any) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell: any, index: number) => {
                  const isLastCol = index === row.getVisibleCells().length - 1;
                  if (isLastCol) return null;
                  const colSpan = isLastCol ? 2 : 1;

                  return (
                    <TableCell
                      key={cell.id}
                      colSpan={colSpan}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        ) : null}
      </Table>
      {data.getRowModel().rows?.length ? null : <Alert type={alertVariants.NotFound} />}
    </>
  );
};
