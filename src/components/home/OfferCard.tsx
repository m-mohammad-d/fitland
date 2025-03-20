interface OfferCardProps {
  image: string;
  title: string;
  brand: string;
}
const OfferCard: React.FC<OfferCardProps> = ({
  image,
  title,
  brand,
}) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
      <img src={image} alt={title} className="w-full h-80 object-cover" />
      <div className="bg-secondary-700 text-white p-4 rounded-b-2xl relative">
        <p className="text-lg font-semibold">
          جدید ترین تخفیفات فصل برند {brand}
        </p>
        <p className="text-sm">{title}</p>
      </div>
    </div>
  );
};

export default OfferCard;
