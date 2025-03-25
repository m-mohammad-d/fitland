"use client";
import { useState } from "react";
import Filter from "@/components/products/Filter";
import ProductGrid from "@/components/products/ProductGrid";
import ProductGridSkeleton from "@/components/products/ProductGridSkeleton";
import { GET_PRODUCTS } from "@/graphql/queries/productQueries";
import FilterProvider, { useFilters } from "@/provider/FilterProvider";
import { GetProductsResponse } from "@/types/Products";
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
  const { data, loading, previousData } = useQuery<GetProductsResponse>(
    GET_PRODUCTS,
    {
      variables: {
        sortBy,
        filters,
        page: 1,
        pageSize: 20,
      },
    }
  );

  const products = loading ? previousData?.products : data?.products;
  const totalProducts = data?.products.length || 0;

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        <div className="hidden lg:block lg:w-80 flex-shrink-0">
          <Filter />
        </div>

        <div className="flex-1">
          <div className="mb-6">
            <Sorting totalProducts={totalProducts} />


            <button
              onClick={() => setShowMobileFilter(true)}
              className="lg:hidden mt-4 flex items-center gap-2 w-full justify-center px-4 py-2 bg-gray-100 rounded-lg text-sm"
            >
              <LuSettings2 />
              فیلتر محصولات
            </button>
          </div>


          {loading && !previousData ? (
            <ProductGridSkeleton />
          ) : (
            <ProductGrid products={products || []} />
          )}
        </div>

        <Drawer
          isOpen={showMobileFilter}
          onClose={() => setShowMobileFilter(false)}
          title="فیلتر محصولات"
        >
          <Filter />
        </Drawer>
      </div>
    </div>
  );
}
