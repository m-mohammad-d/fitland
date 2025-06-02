"use client";

import { GET_PRODUCTS } from "@/graphql/queries/productQueries";
import { DELETE_PRODUCT } from "@/graphql/mutations/productMutations";
import { ApoloGetProductsResponse, Product } from "@/types/Products";
import { useQuery, useMutation } from "@apollo/client";
import { useReactTable, getCoreRowModel, flexRender, ColumnDef, getSortedRowModel, SortingState, getPaginationRowModel, getFilteredRowModel, ColumnFiltersState } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { FiMoreHorizontal, FiArrowDown, FiChevronLeft, FiChevronRight, FiEdit, FiTrash2, FiPackage, FiTag, FiLayers } from "react-icons/fi";
import { toast } from "react-hot-toast";
import Link from "next/link";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { BiPlus, BiSearch } from "react-icons/bi";
import DotSpinner from "@/components/ui/DotSpinner";

function ManageProducts() {
  const { data, loading, refetch } = useQuery<ApoloGetProductsResponse>(GET_PRODUCTS);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct({
        variables: { id },
      });
      toast.success("محصول با موفقیت حذف شد");
      setDeleteConfirmId(null);
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("خطا در حذف محصول");
    }
  };

  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      {
        header: "تصویر",
        accessorKey: "images",
        cell: ({ row }) => {
          const images = row.original.images;
          return images && images.length > 0 ? (
            <div className="relative h-16 w-16 overflow-hidden rounded-lg">
              <Image src={images[0]} alt={row.original.name} fill className="object-cover" />
            </div>
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-neutral-100">
              <FiPackage className="h-8 w-8 text-neutral-400" />
            </div>
          );
        },
      },
      {
        header: ({ column }) => {
          return (
            <Button variant="text" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center gap-2 text-neutral-700">
              نام محصول
              <FiArrowDown className="h-4 w-4" />
            </Button>
          );
        },
        accessorKey: "name",
      },
      {
        header: ({ column }) => {
          return (
            <Button variant="text" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center gap-2 text-neutral-700">
              قیمت
              <FiArrowDown className="h-4 w-4" />
            </Button>
          );
        },
        accessorKey: "price",
        cell: ({ row }) => {
          const price = row.original.price;
          const discount = row.original.discount;
          const discountedPrice = discount ? price * (1 - discount / 100) : price;

          return (
            <div className="flex flex-col">
              {discount > 0 ? (
                <>
                  <span className="text-sm text-neutral-500 line-through">
                    {new Intl.NumberFormat("fa-IR", {
                      style: "currency",
                      currency: "IRR",
                    }).format(price)}
                  </span>
                  <span className="text-primary font-medium">
                    {new Intl.NumberFormat("fa-IR", {
                      style: "currency",
                      currency: "IRR",
                    }).format(discountedPrice)}
                  </span>
                </>
              ) : (
                <span className="text-neutral-700">
                  {new Intl.NumberFormat("fa-IR", {
                    style: "currency",
                    currency: "IRR",
                  }).format(price)}
                </span>
              )}
            </div>
          );
        },
      },
      {
        header: ({ column }) => {
          return (
            <Button variant="text" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex items-center gap-2 text-neutral-700">
              موجودی
              <FiArrowDown className="h-4 w-4" />
            </Button>
          );
        },
        accessorKey: "stock",
        cell: ({ row }) => {
          const stock = row.original.stock;
          return (
            <div className="flex items-center gap-2">
              <FiLayers className="h-4 w-4 text-neutral-500" />
              <span className={stock > 0 ? "text-green-600" : "text-red-600"}>{stock > 0 ? stock : "ناموجود"}</span>
            </div>
          );
        },
      },
      {
        header: "دسته‌بندی",
        accessorKey: "category.name",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <FiTag className="h-4 w-4 text-neutral-500" />
            <span>{row.original.category?.name}</span>
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
                    <Link href={`/dashboard/products/edit/${row.original.id}`} className="flex items-center gap-2">
                      <FiEdit className="h-4 w-4" />
                      <span>ویرایش</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2 text-red-600 focus:text-red-600" onClick={() => setDeleteConfirmId(row.original.id)}>
                    <FiTrash2 className="h-4 w-4" />
                    <span>حذف</span>
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
    data: data?.products.items || [],
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

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 flex flex-col gap-4 md:mb-8 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-bold text-neutral-800 md:text-2xl">مدیریت محصولات</h1>
          <p className="mt-1 text-sm text-neutral-500">لیست تمام محصولات موجود در فروشگاه</p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-80">
            <div className="relative flex items-center">
              <Input
                placeholder="جستجو در محصولات..."
                value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => table.getColumn("name")?.setFilterValue(event.target.value)}
                className="w-full rounded-lg border-neutral-200 pr-10"
              />
              <div className="absolute right-3 flex h-full items-center text-neutral-400">
                <BiSearch size={20} />
              </div>
            </div>
          </div>
          <Link
            href="/dashboard/products/add"
            className="bg-primary hover:bg-primary/90 flex h-11 w-full items-center justify-center gap-2 rounded-lg px-6 py-2.5 text-sm font-medium text-white transition-colors sm:w-auto"
          >
            <BiPlus className="h-5 w-5" /> افزودن محصول جدید
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
        onConfirm={() => deleteConfirmId && handleDelete(deleteConfirmId)}
        title="حذف محصول"
        description="آیا از حذف این محصول اطمینان دارید؟ این عمل غیرقابل بازگشت است."
      />
    </div>
  );
}

export default ManageProducts;
