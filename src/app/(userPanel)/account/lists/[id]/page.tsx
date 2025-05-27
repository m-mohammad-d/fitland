"use client";

import { useQuery, useMutation } from "@apollo/client";
import { GET_LIST_BY_ID, REMOVE_PRODUCT_FROM_LIST } from "@/graphql/queries/lists";
import { use, useState } from "react";
import { FiTrash2, FiArrowRight } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@/components/ui/Button";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { motion } from "framer-motion";
import { ListProduct } from "@/types/lists";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}
export default function ListDetailsPage({ params }: Props) {
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const router = useRouter();
  const { id } = use(params);

  const { data, loading, refetch } = useQuery(GET_LIST_BY_ID, {
    variables: { id },
  });
  const [removeProduct] = useMutation(REMOVE_PRODUCT_FROM_LIST);

  const handleRemoveProduct = async (productId: string) => {
    try {
      await removeProduct({
        variables: { listId: id, productId },
      });
      toast.success("محصول با موفقیت از فهرست حذف شد");
      setDeleteConfirmId(null);
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("خطا در حذف محصول از فهرست");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="border-primary h-12 w-12 animate-spin rounded-full border-t-2 border-b-2"></div>
      </div>
    );
  }

  const list = data?.getListById;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center gap-4">
        <Button onClick={() => router.back()} variant="text" size="medium" icon={<FiArrowRight />}>
          بازگشت
        </Button>
        <h1 className="text-2xl font-bold">{list?.title}</h1>
      </div>

      <ConfirmModal
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={() => deleteConfirmId && handleRemoveProduct(deleteConfirmId)}
        title="حذف محصول"
        description="آیا از حذف این محصول از فهرست اطمینان دارید؟"
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {list?.products.map((listProduct: ListProduct) => (
          <motion.div key={listProduct.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="overflow-hidden rounded-xl bg-white shadow-lg">
            <Link href={`/product/${listProduct.product.id}`}>
              <div className="relative aspect-square">
                <Image src={listProduct.product.images[0]} alt={listProduct.product.name} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="mb-2 text-lg font-medium">{listProduct.product.name}</h3>
                <div className="flex items-center justify-between">
                  <p className="text-primary font-medium">
                    {listProduct.product.discountedPrice ? listProduct.product.discountedPrice.toLocaleString() : listProduct.product.price.toLocaleString()} تومان
                  </p>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      setDeleteConfirmId(listProduct.product.id);
                    }}
                    variant="text"
                    size="small"
                  >
                    <FiTrash2 />
                  </Button>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
