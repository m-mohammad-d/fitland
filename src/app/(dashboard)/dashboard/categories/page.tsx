"use client";

import { GET_CATEGORIES } from "@/graphql/queries/categoryQueries";
import { useQuery } from "@apollo/client";
import { useReactTable, getCoreRowModel, flexRender, ColumnDef, getSortedRowModel, SortingState, getPaginationRowModel, getFilteredRowModel, ColumnFiltersState } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import Button from "@/components/ui/button";
import Input from "@/components/ui/Input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { FiMoreHorizontal, FiArrowDown, FiChevronLeft, FiChevronRight, FiEdit, FiAlertCircle } from "react-icons/fi";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";
import DotSpinner from "@/components/ui/DotSpinner";
import { ApolloGetCategorysResponse, Category } from "@/types/Category";

function ManageCategories() {
  const { data, loading, error } = useQuery<ApolloGetCategorysResponse>(GET_CATEGORIES);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const columns = useMemo<ColumnDef<Category>[]>(
    () => [
      {
        header: ({ column }) => {
          return (
            <Button variant="text" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center gap-2 text-neutral-700">
              نام دسته‌بندی
              <FiArrowDown className="h-4 w-4" />
            </Button>
          );
        },
        accessorKey: "name",
      },
      {
        header: "عملیات",
        cell: ({ row }) => {
          return (
            <div className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="text" size="small" className="h-8 w-8 p-0">
                    <FiMoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/dashboard/categories/edit/${row.original.id}`} className="flex items-center gap-2">
                      <FiEdit className="h-4 w-4" />
                      <span>ویرایش</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        },
      },
    ],
    [],
  );

  const table = useReactTable({
    data: data?.categories || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  if (loading) return <DotSpinner />;
  if (error)
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-4">
        <FiAlertCircle className="h-12 w-12 text-red-500" />
        <p className="text-lg text-neutral-700">خطا در دریافت اطلاعات</p>
      </div>
    );

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 flex flex-col gap-4 md:mb-8 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-bold text-neutral-800 md:text-2xl">مدیریت دسته‌بندی‌ها</h1>
          <p className="mt-1 text-sm text-neutral-500">لیست تمام دسته‌بندی‌های ثبت شده در سیستم</p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-80">
            <div className="relative flex items-center">
              <Input
                placeholder="جستجو در دسته‌بندی‌ها..."
                value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => table.getColumn("name")?.setFilterValue(event.target.value)}
                className="w-full rounded-lg border-neutral-200 pr-10"
              />
              <div className="absolute right-3 flex h-full items-center text-neutral-400">
                <BiSearch size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-neutral-200 bg-neutral-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="px-4 py-3 text-right font-medium whitespace-nowrap text-neutral-700 md:px-6 md:py-4">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-neutral-50">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3 whitespace-nowrap text-neutral-700 md:px-6 md:py-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-neutral-200 px-4 py-4 sm:flex-row md:px-6">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="small" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="gap-2">
              <FiChevronRight className="h-4 w-4" />
              قبلی
            </Button>
            <Button variant="outline" size="small" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="gap-2">
              بعدی
              <FiChevronLeft className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-sm text-neutral-700">
            صفحه {table.getState().pagination.pageIndex + 1} از {table.getPageCount()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageCategories;
