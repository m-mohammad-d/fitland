import Hero from "@/components/home/Hero";
import MainOffers from "@/components/home/MainOffer";
import Banner from "@/components/ui/Banner";

export default function Home() {
  return (
    <div>
      <Hero />
      <MainOffers />
      <Banner imageUrl="/images/Baner.png" mobileImageUrl="images/Baner-mobile.png" />
    </div>
  );
}
