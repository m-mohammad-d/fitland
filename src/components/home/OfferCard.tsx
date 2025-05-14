import Image from "next/image";

interface OfferCardProps {
  image: string;
  title: string;
  brand: string;
}
const OfferCard: React.FC<OfferCardProps> = ({ image, title, brand }) => {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
      <Image src={image} alt={title} height={320} width={1200} className="h-80 w-full object-cover" />
      <div className="bg-secondary-700 relative rounded-b-2xl p-4 text-white">
        <p className="text-lg font-semibold">جدید ترین تخفیفات فصل برند {brand}</p>
        <p className="text-sm">{title}</p>
      </div>
    </div>
  );
};

export default OfferCard;
