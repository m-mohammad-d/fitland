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
    <div className="container mx-auto my-12 flex flex-col items-center justify-between gap-4 p-6 md:flex-row md:p-10">
      <div className="grid w-full gap-4 sm:grid-cols-2 md:w-auto md:gap-6">
        {offers.map((offer, index) => (
          <OfferCard key={index} image={offer.image} title={offer.title} brand={offer.brand} />
        ))}
      </div>
      <div className="hidden w-full text-center md:block md:w-auto md:text-right">
        <h2 className="text-secondary mb-4 text-xl font-bold md:text-2xl">جدید ترین پیشنهادات</h2>
        <p className="mb-6 max-w-md text-sm text-neutral-700 md:text-base">جدید ترین پیشنهادات با ارسال رایگان تهیه کنید و در سریع ترین زمان درب منزل تحویل بگیرید</p>
        <button className="mt-4 rounded-lg bg-orange-500 px-4 py-2 text-base font-semibold text-white transition hover:bg-orange-600 md:mt-6 md:px-6 md:py-3 md:text-lg">مشاهده همه پیشنهادات</button>
      </div>
    </div>
  );
};

export default MainOffers;
