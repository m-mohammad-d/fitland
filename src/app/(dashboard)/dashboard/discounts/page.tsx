"use client";

import { GET_ALL_DISCOUNT_CODES } from "@/graphql/queries/discountQueries";
import { UPDATE_DISCOUNT_STATUS } from "@/graphql/mutations/discountMutations";
import { useQuery, useMutation } from "@apollo/client";
import { useReactTable, getCoreRowModel, flexRender, ColumnDef, getSortedRowModel, SortingState, getPaginationRowModel, getFilteredRowModel, ColumnFiltersState } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import Button from "@/components/ui/button";
import Input from "@/components/ui/Input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { FiArrowDown, FiChevronLeft, FiChevronRight, FiEdit, FiMoreHorizontal, FiTag, FiAlertCircle } from "react-icons/fi";
import { toast } from "react-hot-toast";
import Link from "next/link";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { BiPlus, BiSearch } from "react-icons/bi";
import DotSpinner from "@/components/ui/DotSpinner";
import { ApoloGetAllDiscountsResponse } from "@/types/Discount";

function ManageDiscounts() {
  const { data, loading, error, refetch } = useQuery<ApoloGetAllDiscountsResponse>(GET_ALL_DISCOUNT_CODES);
  const [updateDiscountStatus] = useMutation(UPDATE_DISCOUNT_STATUS);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      await updateDiscountStatus({
        variables: {
          input: {
            id,
            isActive: !currentStatus,
          },
        },
      });
      toast.success(`کد تخفیف با موفقیت ${!currentStatus ? "فعال" : "غیرفعال"} شد`);
      refetch();
    } catch (error) {
      toast.error("خطا در تغییر وضعیت کد تخفیف");
    }
  };

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        header: ({ column }) => {
          return (
            <Button variant="text" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center gap-2 text-neutral-700">
              کد تخفیف
              <FiArrowDown className="h-4 w-4" />
            </Button>
          );
        },
        accessorKey: "code",
      },
      {
        header: ({ column }) => {
          return (
            <Button variant="text" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center gap-2 text-neutral-700">
              مقدار تخفیف
              <FiArrowDown className="h-4 w-4" />
            </Button>
          );
        },
        accessorKey: "value",
        cell: ({ row }) => {
          const value = row.original.value;
          const type = row.original.type;
          return (
            <div className="flex items-center gap-2">
              <span className="text-primary font-medium">{type === "PERCENT" ? `${value}%` : `${value.toLocaleString()} تومان`}</span>
            </div>
          );
        },
      },
      {
        header: "نوع تخفیف",
        accessorKey: "type",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <FiTag className="h-4 w-4 text-neutral-500" />
            <span>{row.original.type === "PERCENT" ? "درصدی" : "مبلغی"}</span>
          </div>
        ),
      },
      {
        header: "وضعیت",
        accessorKey: "isActive",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <span className={`rounded-full px-2 py-1 text-xs ${row.original.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{row.original.isActive ? "فعال" : "غیرفعال"}</span>
          </div>
        ),
      },
      {
        header: "عملیات",
        cell: ({ row }) => {
          return (
            <div className="flex items-center justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="text" size="small" className="h-8 w-8 p-0">
                    <FiMoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/dashboard/discounts/edit/${row.original.id}`} className="flex items-center gap-2">
                      <FiEdit className="h-4 w-4" />
                      <span>ویرایش</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={`flex items-center gap-2 ${row.original.isActive ? "text-red-600 focus:text-red-600" : "text-green-600 focus:text-green-600"}`}
                    onClick={() => handleToggleStatus(row.original.id, row.original.isActive)}
                  >
                    {row.original.isActive ? "غیرفعال کردن" : "فعال کردن"}
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
    data: data?.getAllDiscountCodes || [],
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
          <h1 className="text-xl font-bold text-neutral-800 md:text-2xl">مدیریت کدهای تخفیف</h1>
          <p className="mt-1 text-sm text-neutral-500">لیست تمام کدهای تخفیف موجود در فروشگاه</p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-80">
            <div className="relative flex items-center">
              <Input
                placeholder="جستجو در کدهای تخفیف..."
                value={(table.getColumn("code")?.getFilterValue() as string) ?? ""}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => table.getColumn("code")?.setFilterValue(event.target.value)}
                className="w-full rounded-lg border-neutral-200 pr-10"
              />
              <div className="absolute right-3 flex h-full items-center text-neutral-400">
                <BiSearch size={20} />
              </div>
            </div>
          </div>
          <Link
            href="/dashboard/discounts/new"
            className="bg-primary hover:bg-primary/90 flex h-11 w-full items-center justify-center gap-2 rounded-lg px-6 py-2.5 text-sm font-medium text-white transition-colors sm:w-auto"
          >
            <BiPlus className="h-5 w-5" /> افزودن کد تخفیف جدید
          </Link>
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

      <ConfirmModal
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={() => deleteConfirmId && handleToggleStatus(deleteConfirmId, true)}
        title="تغییر وضعیت کد تخفیف"
        description="آیا از تغییر وضعیت این کد تخفیف اطمینان دارید؟"
      />
    </div>
  );
}

export default ManageDiscounts;
