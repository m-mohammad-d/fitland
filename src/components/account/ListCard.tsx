'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiEdit2, FiTrash2, FiShoppingBag } from 'react-icons/fi';
import Button from '@/components/ui/Button';
import { List } from '@/types/lists';

interface ListCardProps {
  list: List;
  onEdit: (id: string, title: string) => void;
  onDelete: (id: string) => void;
  onViewDetails: (id: string) => void;
}

export default function ListCard({ list, onEdit, onDelete, onViewDetails }: ListCardProps) {
  return (
    <motion.div
      key={list.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold">{list.title}</h2>
          <div className="flex gap-2">
            <Button
              onClick={() => onEdit(list.id, list.title)}
              variant="text"
              size="small"
              icon={<FiEdit2 />}
            >
              ویرایش
            </Button>
            <Button
              onClick={() => onDelete(list.id)}
              variant="text"
              size="small"
              icon={<FiTrash2 />}
            >
              حذف
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {list.products.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <FiShoppingBag size={48} className="mx-auto mb-2" />
              <p>این فهرست خالی است</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3">
                {list.products.slice(0, 2).map((listProduct) => (
                  <motion.div
                    key={listProduct.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative aspect-square"
                  >
                    <Image
                      src={listProduct.product.images[0]}
                      alt={listProduct.product.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </motion.div>
                ))}
              </div>
              {list.products.length > 2 && (
                <div className="text-center text-gray-500">
                  +{list.products.length - 2} محصول دیگر
                </div>
              )}
              <Button
                onClick={() => onViewDetails(list.id)}
                variant="outline"
                size="medium"
                className="w-full"
              >
                مشاهده جزئیات
              </Button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
} 