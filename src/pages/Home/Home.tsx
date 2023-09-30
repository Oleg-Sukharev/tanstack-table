import { FC, useState, useMemo } from "react";
import { useQuery } from "react-query";
import { userService } from "@/services/userService";
import { IUser } from "@/constants/types";
import { PaginationControls } from "./PaginationControls";
import { SearchInput } from "./SearchInput";
import { Alert, alertVariants } from "@/components/Alert";
import { TableContent } from "./TableContent";
import {
  PaginationState,
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  getFilteredRowModel,
  FilterFn,
} from "@tanstack/react-table";
import { ITEMS_PER_PAGE, STATIC_COLUMNS, HIDDEN_IN_CHECk_LIST } from "@/constants/constants";

import { IconButton } from "@/components/IconButton";
import { Link } from "@/components/Link";
import { Checkbox } from "@/components/Checkbox";

import { Avatar } from "@/components/Avatar";
import SettingsIcon from "@/assets/images/settingsIcon.svg?react";
import MaleIcon from "@/assets/images/maleIcon.svg?react";
import FemaleIcon from "@/assets/images/femaleIcon.svg?react";
import { Icon } from "@/components/Icon";
import { formatDate } from "@/utils/formatDate";
import { useLocalStorage } from "@/hooks/useLocalStorage";

import { rankItem } from "@tanstack/match-sorter-utils";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/DropdownMenu";

declare module "@tanstack/table-core" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
}

export const Home: FC = () => {
  const [query, setQuery] = useState<string>("");
  const [globalFilter, setGlobalFilter] = useLocalStorage("globalFilter", "");
  const [columnVisibility, setColumnVisibility] = useLocalStorage("columnVisibility", {});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: ITEMS_PER_PAGE[0],
  });

  const handleChangeQuery = (value: string) => {
    setPagination({ ...pagination, pageIndex: 0 });
    setQuery(value);
  };

  const fetchDataOptions = {
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
    query,
  };

  const { isLoading, error, data, isSuccess } = useQuery(
    ["data", fetchDataOptions],
    () => userService.fetchUsersData(pagination.pageIndex, pagination.pageSize, query),
    { keepPreviousData: true },
  );

  const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value);

    // Store the itemRank info
    addMeta({
      itemRank,
    });

    // Return if the item should be filtered in/out
    return itemRank.passed;
  };

  const columns = useMemo<ColumnDef<IUser>[]>(
    () => [
      {
        accessorKey: "fullname",
        header: "Full Name",
        // accessorFn: (row) => [`${row.firstName} ${row.maidenName} ${row.lastName}`, row.image],
        accessorFn: (row) => `${row.firstName} ${row.maidenName} ${row.lastName}`,
        cell: ({ row, getValue }) => {
          // const [fullname, src] = row.getValue<string[]>("fullname");
          const fullname = String(getValue());

          return (
            <div className="flex items-center gap-2">
              <Avatar url={row.original.image} /> {fullname}
            </div>
          );
        },
      },
      {
        accessorKey: "birthday",
        header: "birthday",
        accessorFn: (row) => `${formatDate(row.birthDate)} (${row.age} years old)`,
      },
      {
        header: "gender",
        accessorKey: "gender",
        cell: ({ getValue }) => {
          const gender = String(getValue());
          const icon = gender === "male" ? MaleIcon : FemaleIcon;
          return (
            <div className="flex items-center">
              <Icon Svg={icon} />
              <span className="ml-1 first-letter:uppercase">{gender}</span>
            </div>
          );
        },
      },
      {
        header: "email",
        accessorKey: "email",
        enableGlobalFilter: false,
        cell: ({ getValue }) => {
          const mail = String(getValue());
          return <Link text={mail} url={`mailto:${mail}`} className="font-normal text-state-900 no-underline" />;
        },
      },
      {
        header: "phone",
        accessorKey: "phone",
        cell: ({ getValue }) => {
          const phone = String(getValue());
          return <Link text={phone} url={`tel::${phone}`} className="font-normal text-state-900 no-underline" />;
        },
      },
      {
        header: "username",
        accessorKey: "username",
      },
      {
        accessorKey: "general",
        header: "General info",
        accessorFn: (row) => {
          const { bloodGroup, height, weight, hair } = row;
          const parts = [
            bloodGroup && `Bloodgroup: "${bloodGroup}"`,
            height && `Height: ${height}`,
            weight && `Weight: ${weight}`,
            hair?.color && `Hair color: ${hair.color.toLowerCase()}`,
          ].filter(Boolean);

          const result = parts.join("; ");
          return result;
        },
      },
      {
        header: "domain",
        accessorKey: "domain",
        cell: ({ getValue }) => {
          const domain = String(getValue());
          return <Link text={domain} url={domain} />;
        },
      },
      {
        header: "ip",
        accessorKey: "ip",
      },
      {
        header: "Mac ip",
        accessorKey: "macAddress",
      },
      {
        accessorKey: "address",
        header: "address",
        accessorFn: (row) => {
          const {
            address: { address: actualAddress, city, postalCode },
          } = row;
          return `${actualAddress}, ${city} ${postalCode}`;
        },
      },
      {
        accessorKey: "bank",
        header: "bank",
        accessorFn: (row) => row.bank?.cardType,
      },
      {
        header: "university",
        accessorKey: "university",
      },

      {
        accessorKey: "company",
        header: "company",
        accessorFn: (row) => row.company?.name,
      },

      {
        header: "ein",
        accessorKey: "ein",
      },

      {
        header: "ssn",
        accessorKey: "ssn",
      },
      {
        accessorKey: "settings",
        header: () => (
          <span className="relative w-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <IconButton Svg={SettingsIcon} area-label="Show Settings" className="rounded-full bg-gray-900" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <SearchInput
                  initialValue={table.getState().globalFilter}
                  onChange={(value) => setGlobalFilter(String(value))}
                />
                <div className="scrollbar mt-2 max-h-[21rem] overflow-auto">
                  {table.getAllLeafColumns().map((column) => {
                    if (HIDDEN_IN_CHECk_LIST.includes(column.id)) return null;

                    return (
                      <Checkbox
                        key={column.id}
                        checked={column.getIsVisible()}
                        onClick={column.getToggleVisibilityHandler()}
                        disabled={STATIC_COLUMNS.includes(column.id)}
                        className="cursor-pointer"
                        aria-label="show/hide column"
                      >
                        {column.id}
                      </Checkbox>
                    );
                  })}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </span>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: data?.results ?? [],
    columns,
    pageCount: data ? Math.ceil(data.totalUsers / pagination.pageSize) : 0,
    globalFilterFn: fuzzyFilter,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      pagination,
      columnVisibility,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    debugTable: true,
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="m-auto max-w-7xl">
      <h1 className="sr-only">User list</h1>
      <SearchInput onChange={handleChangeQuery} />
      <div className="mt-2 rounded-xl border border-gray-600">
        <div className="flex h-[535px] flex-col">
          {isSuccess && <TableContent data={table} />}
          {!!error && <Alert type={alertVariants.Error} />}
          {isLoading && <Alert type={alertVariants.Loading} />}
        </div>
        <PaginationControls table={table} total={data?.totalUsers} />
      </div>
    </div>
  );
};
