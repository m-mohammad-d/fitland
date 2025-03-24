"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, {
  createContext,
  useOptimistic,
  useState,
  useTransition,
} from "react";
import { z } from "zod";

const filterSchema = z.object({
  category: z.array(z.string()).default([]).optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  page: z.number().default(1).optional(),
  brand: z.array(z.string()).default([]).optional(),
  colors: z.array(z.string()).default([]).optional(),
  sizes: z.array(z.string()).default([]).optional(),
  availableOnly: z.boolean().optional(),
  sort: z.string().optional(),
});

type Filters = z.infer<typeof filterSchema>;
type FilterContextType = {
  filters: Filters;
  isPending: boolean;
  updateFilters: (_updates: Partial<Filters>) => void;
  activeSections: Record<string, boolean>;
  setActiveSections: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
};

export const FilterContext = createContext<FilterContextType | undefined>(
  undefined
);

export default function FilterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const filters = filterSchema.safeParse({
    category: searchParams.getAll("category"),
    brand: searchParams.getAll("brand"),
    colors: searchParams.getAll("colors"),
    sizes: searchParams.getAll("sizes"),
    minPrice: searchParams.has("minPrice")
      ? Number(searchParams.get("minPrice"))
      : undefined,
    maxPrice: searchParams.has("maxPrice")
      ? Number(searchParams.get("maxPrice"))
      : undefined,
    availableOnly: searchParams.has("availableOnly")
      ? searchParams.get("availableOnly") === "true"
      : false,
    sort: searchParams.get("sort") || undefined,
    page: searchParams.get("page") || undefined,
  });
  const [activeSections, setActiveSections] = useState<Record<string, boolean>>(
    {
      brand: false,
      category: false,
      colors: false,
      sizes: false,
      availability: false,
      price: false,
    }
  );

  const [isPending, startTransition] = useTransition();

  const [optimisticFilters, setOptimisticFilters] = useOptimistic(
    filters.data,
    (prevState, newFilters: Partial<Filters>) => {
      return {
        ...prevState,
        ...newFilters,
      };
    }
  );

  function updateFilters(updates: Partial<typeof optimisticFilters>) {
    const newState = {
      ...optimisticFilters,
      ...updates,
    };
    const newSearchParams = new URLSearchParams();

    Object.entries(newState).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => {
          newSearchParams.append(key, v);
        });
      } else if (value !== undefined) {
        newSearchParams.set(key, String(value));
      }
    });

    startTransition(() => {
      setOptimisticFilters(updates || {});
      router.replace(`?${newSearchParams}`, { scroll: false });
    });
  }

  return (
    <FilterContext.Provider
      value={{
        filters: optimisticFilters || {},
        isPending,
        updateFilters,
        activeSections,
        setActiveSections,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = React.useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilters must be used within a FilterProvider");
  }
  return context;
}
