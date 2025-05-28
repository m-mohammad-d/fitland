import { useReactTable, getCoreRowModel, flexRender, ColumnDef, getSortedRowModel, SortingState, getPaginationRowModel, getFilteredRowModel, ColumnFiltersState } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { FiMoreHorizontal, FiArrowDown, FiChevronLeft, FiChevronRight, FiEdit } from "react-icons/fi";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";
import { Order } from "@/types/Order";
import { formatJalaliDate } from "@/lib/Date";

interface OrdersTableProps {
  orders: Order[];
}

export default function OrdersTable({ orders }: OrdersTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const columns = useMemo<ColumnDef<Order>[]>(
    () => [
      {
        header: ({ column }) => {
          return (
            <Button variant="text" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center gap-2 text-neutral-700">
              شناسه سفارش
              <FiArrowDown className="h-4 w-4" />
            </Button>
          );
        },
        accessorKey: "id",
      },
      {
        header: ({ column }) => {
          return (
            <Button variant="text" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center gap-2 text-neutral-700">
              نام مشتری
              <FiArrowDown className="h-4 w-4" />
            </Button>
          );
        },
        accessorKey: "user.name",
      },
      {
        header: ({ column }) => {
          return (
            <Button variant="text" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center gap-2 text-neutral-700">
              ایمیل مشتری
              <FiArrowDown className="h-4 w-4" />
            </Button>
          );
        },
        accessorKey: "user.email",
      },
      {
        header: ({ column }) => {
          return (
            <Button variant="text" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center gap-2 text-neutral-700">
              شماره تماس
              <FiArrowDown className="h-4 w-4" />
            </Button>
          );
        },
        accessorKey: "user.phone",
        cell: ({ row }) => {
          return row.original.user.phone || "-";
        },
      },
      {
        header: ({ column }) => {
          return (
            <Button variant="text" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center gap-2 text-neutral-700">
              تاریخ ثبت سفارش
              <FiArrowDown className="h-4 w-4" />
            </Button>
          );
        },
        accessorKey: "createdAt",
        cell: ({ row }) => {
          return formatJalaliDate(row.original.createdAt);
        },
      },
      {
        header: ({ column }) => {
          return (
            <Button variant="text" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center gap-2 text-neutral-700">
              تاریخ تحویل
              <FiArrowDown className="h-4 w-4" />
            </Button>
          );
        },
        accessorKey: "deliveryDate",
        cell: ({ row }) => {
          return formatJalaliDate(row.original.deliveryDate);
        },
      },
      {
        header: ({ column }) => {
          return (
            <Button variant="text" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center gap-2 text-neutral-700">
              نحوه پرداخت
              <FiArrowDown className="h-4 w-4" />
            </Button>
          );
        },
        accessorKey: "paymentMethod",
        cell: ({ row }) => {
          const paymentMethods = {
            ONLINE: "پرداخت آنلاین",
            ON_DELIVERY: "پرداخت در محل",
            WALLET: "پرداخت از کیف پول",
          } as const;
          return paymentMethods[row.original.paymentMethod as keyof typeof paymentMethods] || row.original.paymentMethod;
        },
      },
      {
        header: ({ column }) => {
          return (
            <Button variant="text" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center gap-2 text-neutral-700">
              قیمت کل
              <FiArrowDown className="h-4 w-4" />
            </Button>
          );
        },
        accessorKey: "totalPrice",
        cell: ({ row }) => {
          return `${row.original.totalPrice.toLocaleString()} تومان`;
        },
      },
      {
        header: ({ column }) => {
          return (
            <Button variant="text" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center gap-2 text-neutral-700">
              وضعیت
              <FiArrowDown className="h-4 w-4" />
            </Button>
          );
        },
        accessorKey: "status",
        cell: ({ row }) => {
          const statusColors = {
            PENDING: "bg-yellow-100 text-yellow-800",
            PROCESSING: "bg-blue-100 text-blue-800",
            COMPLETED: "bg-green-100 text-green-800",
            CANCELLED: "bg-red-100 text-red-800",
          } as const;
          const statusText = {
            PENDING: "در انتظار پرداخت",
            PROCESSING: "در حال پردازش",
            COMPLETED: "تکمیل شده",
            CANCELLED: "لغو شده",
          } as const;
          return (
            <span className={`rounded-full px-3 py-1 text-sm ${statusColors[row.original.status as keyof typeof statusColors]}`}>
              {statusText[row.original.status as keyof typeof statusText]}
            </span>
          );
        },
      },
      {
        header: ({ column }) => {
          return (
            <Button variant="text" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center gap-2 text-neutral-700">
              کد تخفیف
              <FiArrowDown className="h-4 w-4" />
            </Button>
          );
        },
        accessorKey: "discountCode",
        cell: ({ row }) => {
          if (!row.original.discountCode?.code) return "-";
          return (
            <div className="flex flex-col">
              <span>{row.original.discountCode?.code}</span>
              {row.original.discountCode?.type === "PERCENT" && (
                <span className="text-xs text-green-600">{row.original.discountCode.value}% تخفیف</span>
              )}
            </div>
          );
        },
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
                    <Link href={`/dashboard/orders/edit/${row.original.id}`} className="flex items-center gap-2">
                      <FiEdit className="h-4 w-4" />
                      <span>مشاهده جزئیات</span>
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
    data: orders,
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

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 md:mb-8 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-bold text-neutral-800 md:text-2xl">مدیریت سفارش‌ها</h1>
          <p className="mt-1 text-sm text-neutral-500">لیست تمام سفارش‌های ثبت شده در سیستم</p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-80">
            <div className="relative flex items-center">
              <Input
                placeholder="جستجو در سفارش‌ها..."
                value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => table.getColumn("id")?.setFilterValue(event.target.value)}
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