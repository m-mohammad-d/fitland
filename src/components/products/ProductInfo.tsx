interface Props {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    images: string[];
    discount?: number;
    discountedPrice?: number;
    colors: { name: string; hex: string }[];
    sizes: string[];
    category: { name: string };
  };
}

export default function ProductInfo({ product }: Props) {
  return (
    <div className="space-y-6 p-6 bg-white rounded-xl shadow-sm">
      <div className="inline-block px-3 py-1 bg-primary-50 text-primary-700 text-sm rounded-full">
        {product.category.name}
      </div>

      <h1 className="text-3xl font-bold text-neutral-800 tracking-tight">
        {product.name}
      </h1>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          {product.discount && (
            <span className="bg-error-100 text-error-800 text-xs px-2 py-1 rounded-full">
              {product.discount}% تخفیف
            </span>
          )}
          {product.stock > 0 && (
            <span className="bg-success-100 text-success-800 text-xs px-2 py-1 rounded-full">
              موجود
            </span>
          )}
        </div>

        <div className="flex items-end gap-3">
          {product.discountedPrice ? (
            <>
              <span className="text-2xl font-bold text-secondary-700">
                {product.discountedPrice.toLocaleString()}
              </span>
              <span className="text-lg text-neutral-500 line-through">
                {product.price.toLocaleString()}
              </span>
            </>
          ) : (
            <span className="text-2xl font-bold text-secondary-800">
              {product.price.toLocaleString()}
            </span>
          )}
          <span className="text-sm text-neutral-500 mb-1">تومان</span>
        </div>
      </div>

      <div className="border-t border-neutral-100"></div>

      <div>
        <p className="text-sm font-medium text-neutral-700 mb-2">انتخاب رنگ</p>
        <div className="flex gap-3">
          {product.colors.map((color, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                title={color.name}
                style={{ backgroundColor: color.hex }}
                className="w-8 h-8 rounded-full border-2 border-white shadow-sm hover:ring-2 hover:ring-primary-400 transition-all cursor-pointer"
              />
              <span className="text-xs text-neutral-600">{color.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-neutral-700 mb-2">انتخاب سایز</p>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((size, i) => (
            <button
              key={i}
              className="px-4 py-2 rounded-lg bg-neutral-50 border border-neutral-200 text-sm hover:border-primary-400 hover:text-primary-700 hover:bg-primary-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-300"
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-2 flex items-center justify-between">
        <div className="text-sm text-neutral-500">
          {product.stock > 0 ? (
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-success-500"></span>
              {product.stock} عدد در انبار
            </span>
          ) : (
            <span className="text-error-500">موجودی تمام شد</span>
          )}
        </div>

        <button
          disabled={product.stock <= 0}
          className={`px-6 py-3 rounded-lg font-medium ${
            product.stock > 0
              ? "bg-primary-600 hover:bg-primary-700 text-white shadow-md hover:shadow-lg transition-all"
              : "bg-neutral-200 text-neutral-500 cursor-not-allowed"
          }`}
        >
          {product.stock > 0 ? "افزودن به سبد خرید" : "ناموجود"}
        </button>
      </div>
    </div>
  );
}
