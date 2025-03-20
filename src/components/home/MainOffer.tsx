import OfferCard from "./OfferCard";

interface Offer {
  image: string;
  title: string;
  brand: string;
}

interface MainOffersProps {
  offers: Offer[];
}

const MainOffers: React.FC<MainOffersProps> = ({ offers }) => {
  return (
    <div className="p-6 md:p-10 flex flex-col md:flex-row gap-4 container mx-auto my-12 items-center justify-between">
      <div className="grid sm:grid-cols-2 gap-4 md:gap-6 w-full md:w-auto">
        {offers.map((offer, index) => (
          <OfferCard
            key={index}
            image={offer.image}
            title={offer.title}
            brand={offer.brand}
          />
        ))}
      </div>
      <div className="hidden md:block w-full md:w-auto text-center md:text-right">
        <h2 className="text-xl md:text-2xl font-bold text-secondary mb-4">
          جدید ترین پیشنهادات
        </h2>
        <p className="max-w-md text-neutral-700 mb-6 text-sm md:text-base">
          جدید ترین پیشنهادات با ارسال رایگان تهیه کنید و در سریع ترین زمان درب
          منزل تحویل بگیرید
        </p>
        <button className="mt-4 md:mt-6 bg-orange-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg text-base md:text-lg font-semibold hover:bg-orange-600 transition">
          مشاهده همه پیشنهادات
        </button>
      </div>
    </div>
  );
};

export default MainOffers;
