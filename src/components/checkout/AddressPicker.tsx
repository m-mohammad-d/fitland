"use client";
import { useRef, useState } from "react";
import Button from "../ui/Button";
import { LatLngExpression, Map } from "leaflet";
import { CiGps, CiLocationOn } from "react-icons/ci";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";

const MapViewer = dynamic(() => import("@/components/checkout/MapViewer"), {
  ssr: false,
});

interface AddressPickerProps {
  onLocationSelect: (address: string) => void;
}

function AddressPicker({ onLocationSelect }: AddressPickerProps) {
  const mapRef = useRef<Map>(null);
  const [location, setLocation] = useState<LatLngExpression>([35.6892, 51.389]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  async function onChange(lat: number, lon: number) {
    try {
      const { response } = await fetch(
        `/api/getAddress?lat=${lat}&lon=${lon}&format=json`
      ).then((res) => res.json());

      if (response && response.address) {
        const address = response.display_name
          .split(", ")
          .reverse()
          .join(", ")
          .replace(/,\s*\d+-\d+\s*,/g, ", ");
        setSearchQuery(address);
        setSelectedAddress(address);
        return address;
      }
    } catch (error) {
      console.error("خطا در دریافت آدرس:", error);
    }
  }

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const map = mapRef.current;
          map?.setView([latitude, longitude], 13);
          setLocation([latitude, longitude]);
          onChange(latitude, longitude);
        },
        (error) => {
          console.log(error);
          toast.error("Couldn't get your location.");
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  };

  const provider = new OpenStreetMapProvider();

  const handleSearch = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const results = await provider.search({ query: searchQuery });
      if (results.length > 0) {
        const { x, y } = results[0];
        setLocation([y, x]);
        mapRef.current?.setView([y, x], 13);
        onChange(y, x);
      } else {
        toast.error("آدرسی پیدا نشد!");
      }
    }
  };

  const handleSubmit = () => {
    if (selectedAddress) {
      onLocationSelect(selectedAddress);
    } else {
      toast.error("لطفا یک آدرس انتخاب کنید");
    }
  };

  return (
    <div className="w-full h-full relative">
      <MapViewer onChange={onChange} mapRef={mapRef} location={location} />
      <div
        className={`bg-white rounded flex md:button-lg w-28 md:w-[156px] text-primary h-8 md:h-10 items-center justify-center z-[1000] absolute top-4 right-4 cursor-pointer`}
        onClick={() => getUserLocation()}
      >
        <CiGps size={25} className="text-primary" />
        <span className="mr-2">موقعیت من</span>
      </div>

      <div
        className={`absolute z-[1000] flex bottom-[68px] px-1 items-center bg-white dark:bg-background-2 md:bottom-[88px] right-1/2 left-1/2 translate-x-1/2 !w-11/12 max-w-[409px] h-8 md:h-10 rounded overflow-hidden shadow-content-cards`}
      >
        <CiLocationOn className="text-primary" size={25} />
        <input
          type="text"
          placeholder="جستجوی آدرس..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => handleSearch(e)}
          className="outline-none caption-md md:body-sm !w-full !h-full px-2 bg-transparent"
        />
      </div>
      <div className="w-full flex items-center justify-center">
        <Button className="mt-4" onClick={handleSubmit}>
          ثبت موقعیت
        </Button>
      </div>
    </div>
  );
}

export default AddressPicker;
