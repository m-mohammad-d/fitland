"use client";
import { GET_PRODUCTS } from "@/graphql/queries/productQueries";
import { useFilters } from "@/provider/FilterProvider";
import { ApoloGetProductsResponse } from "@/types/Products";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { LuSearch, LuSettings2 } from "react-icons/lu";
import { Drawer } from "../ui/Drawer";
import Filter from "./Filter";
import ProductGrid from "./ProductGrid";
import ProductGridSkeleton from "./ProductGridSkeleton";
import Sorting from "./Sorting";
import Pagination from "../ui/Pagination";
import EmptyState from "../ui/EmptyState";
export default function ProductsPageContent() {
  const { filters, sortBy, page, updatePage } = useFilters();
  const pageSize = 8;
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const { data, loading, previousData } = useQuery<ApoloGetProductsResponse>(GET_PRODUCTS, {
    variables: {
      sortBy,
      filters,
      page: page,
      pageSize: pageSize,
    },
  });

  const products = loading ? previousData?.products.items : data?.products.items;
  const totalProducts = data?.products.totalCount || 0;

  return (
    <div className="container mx-auto px-4">
      <div className="mt-6 flex flex-col gap-6 lg:flex-row">
        <div className="hidden flex-shrink-0 lg:block lg:w-80">
          <Filter />
        </div>

        <div className="flex-1">
          <div className="mb-6">
            <Sorting totalProducts={totalProducts} />

            <button onClick={() => setShowMobileFilter(true)} className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm lg:hidden">
              <LuSettings2 />
              فیلتر محصولات
            </button>
          </div>
          {loading ? <ProductGridSkeleton /> : <ProductGrid products={products || []} />}
          {data?.products.totalCount === 0 && <EmptyState title="محصولی یافت نشد" description="لطفاً فیلترها را تغییر دهید و دوباره امتحان کنید." icon={<LuSearch />} />}
          <Pagination currentPage={page} totalPages={Math.ceil(totalProducts / pageSize)} onPageChange={updatePage} />
        </div>

        <Drawer isOpen={showMobileFilter} onClose={() => setShowMobileFilter(false)} title="فیلتر محصولات">
          <Filter />
        </Drawer>
      </div>
    </div>
  );
}
