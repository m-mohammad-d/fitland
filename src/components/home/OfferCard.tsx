"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

interface OfferCardProps {
  image: string;
  title: string;
  brand: string;
}

const OfferCard: React.FC<OfferCardProps> = ({ image, title, brand }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group relative h-full overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      <div className="relative p-6">
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="space-y-2">
          <h3 className="text-xl font-bold text-gray-900">{brand}</h3>
          <p className="line-clamp-2 text-sm text-gray-600">{title}</p>
        </motion.div>

        <Link href={`/products?brand=${brand}`} className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-orange-500 transition-colors hover:text-orange-600">
          مشاهده محصولات
          <motion.svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" initial={{ x: 0 }} whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </motion.svg>
        </Link>
      </div>

      <div className="absolute right-0 bottom-0 left-0 h-1 origin-left scale-x-0 transform bg-gradient-to-r from-orange-500 to-orange-400 transition-transform duration-300 group-hover:scale-x-100" />
    </motion.div>
  );
};

export default OfferCard;
