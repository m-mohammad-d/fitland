"use client";
import Filter from "@/components/products/Filter";
import ProductGrid from "@/components/products/ProductGrid";
import ProductGridSkeleton from "@/components/products/ProductGridSkeleton";
import Sorting from "@/components/products/Sorting";
import { GET_PRODUCTS } from "@/graphql/queries/productQueries";
import FilterProvider, { useFilters } from "@/provider/FilterProvider";
import { GetProductsResponse } from "@/types/Products";
import { useQuery } from "@apollo/client";

export default function ProductsPage() {
  return (
    <FilterProvider>
      <ProductsPageContent />
    </FilterProvider>
  );
}

function ProductsPageContent() {
  const { filters } = useFilters();
  const { data, loading, previousData } = useQuery<GetProductsResponse>(
    GET_PRODUCTS,
    {
      variables: {
        sortBy: filters.sort || null,
        order: "DESC",
        filters,
        page: 1,
        pageSize: 20,
      },
    }
  );

  const products = loading ? previousData?.products : data?.products;

  return (
    <div className="container mx-auto px-4">
      <Sorting />

      <div className="flex flex-col md:flex-row gap-6 mt-6">
        <div className="md:w-80 flex-shrink-0">
          <Filter />
        </div>

        <div className="flex-1">
          {loading && !previousData ? (
            <ProductGridSkeleton />
          ) : (
            <ProductGrid products={products || []} />
          )}
        </div>
      </div>
    </div>
  );
}
