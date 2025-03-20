interface BannerProps {
  imageUrl: string;
  mobileImageUrl: string;
}

const Banner: React.FC<BannerProps> = ({ imageUrl, mobileImageUrl }) => {
  return (
    <div className="w-full">
      <img
        src={mobileImageUrl}
        alt="Mobile Banner"
        className="w-full h-full object-cover md:hidden"
      />
      <img
        src={imageUrl}
        alt="Desktop Banner"
        className="hidden md:block w-full h-[600px]"
      />
    </div>
  );
};

export default Banner;
