import Link from "next/link";
import OfferCard from "./OfferCard";
import { FaArrowLeft } from "react-icons/fa";

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
    <section className="bg-gradient-to-b from-white to-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-12 md:flex-row">
          <div className="w-full md:w-2/3">
            <div className="grid gap-6 sm:grid-cols-2">
              {offers.map((offer, index) => (
                <OfferCard key={index} image={offer.image} title={offer.title} brand={offer.brand} />
              ))}
            </div>
          </div>

          <div className="hidden w-full text-center md:block md:w-1/3 md:text-right">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">جدید ترین پیشنهادات</h2>
            <div className="mx-auto mt-4 h-1 w-20 bg-orange-500 md:mx-0 md:mr-0"></div>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">جدید ترین پیشنهادات با ارسال رایگان تهیه کنید و در سریع ترین زمان درب منزل تحویل بگیرید</p>
            <Link
              href="/products"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-orange-500 px-8 py-4 text-lg font-semibold text-white transition-all hover:scale-105 hover:bg-orange-600 hover:shadow-lg"
            >
              مشاهده همه پیشنهادات
              <FaArrowLeft />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainOffers;
