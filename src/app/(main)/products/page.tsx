"use client";
import { useState } from "react";
import Filter from "@/components/products/Filter";
import ProductGrid from "@/components/products/ProductGrid";
import ProductGridSkeleton from "@/components/products/ProductGridSkeleton";
import { GET_PRODUCTS } from "@/graphql/queries/productQueries";
import FilterProvider, { useFilters } from "@/provider/FilterProvider";
import { ApoloGetProductsResponse } from "@/types/Products";
import { useQuery } from "@apollo/client";
import { LuSettings2 } from "react-icons/lu";
import { Drawer } from "@/components/ui/Drawer";
import Sorting from "@/components/products/Sorting";

export default function ProductsPage() {
  return (
    <FilterProvider>
      <ProductsPageContent />
    </FilterProvider>
  );
}

function ProductsPageContent() {
  const { filters, sortBy } = useFilters();
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const { data, loading, previousData } = useQuery<ApoloGetProductsResponse>(GET_PRODUCTS, {
    variables: {
      sortBy,
      filters,
      page: 1,
      pageSize: 20,
    },
  });

  const products = loading ? previousData?.products : data?.products;
  const totalProducts = products?.length || 0;

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

          {loading && !previousData ? <ProductGridSkeleton /> : <ProductGrid products={products || []} />}
        </div>

        <Drawer isOpen={showMobileFilter} onClose={() => setShowMobileFilter(false)} title="فیلتر محصولات">
          <Filter />
        </Drawer>
      </div>
    </div>
  );
}
