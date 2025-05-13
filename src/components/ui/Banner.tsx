interface BannerProps {
  imageUrl: string;
  mobileImageUrl: string;
}

const Banner: React.FC<BannerProps> = ({ imageUrl, mobileImageUrl }) => {
  return (
    <div className="w-full">
      <img src={mobileImageUrl} alt="Mobile Banner" className="h-full w-full object-cover md:hidden" />
      <img src={imageUrl} alt="Desktop Banner" className="hidden h-[600px] w-full md:block" />
    </div>
  );
};

export default Banner;
