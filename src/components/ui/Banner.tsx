import Image from "next/image";

interface BannerProps {
  imageUrl: string;
  mobileImageUrl: string;
}

const Banner: React.FC<BannerProps> = ({ imageUrl, mobileImageUrl }) => {
  return (
    <div className="w-full">
      <Image src={mobileImageUrl} alt="Mobile Banner" width={375} layout="responsive" height={200} className="w-full md:hidden" />

      <Image src={imageUrl} alt="Desktop Banner" width={1200} height={600} className="hidden h-[600px] w-full md:block" />
    </div>
  );
};

export default Banner;
