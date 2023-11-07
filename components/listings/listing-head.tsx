import Image from "next/image";

import { SafeUser } from "@/types";
import HeartButton from "../heart-button";
import Heading from "../heading";
import useCountries from "@/hooks/use-countries";

interface ListingHeadProps {
  title: string;
  imageSrc: string;
  locationValue: string;
  id: string;
  currentUser?: SafeUser | null;
}

const ListingHead = ({
  title,
  imageSrc,
  locationValue,
  id,
  currentUser,
}: ListingHeadProps) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);
  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div
        className="
        w-full
        h-[60vh]
        overflow-hidden 
        rounded-xl
        relative
      "
      >
        <Image
          src={imageSrc}
          fill
          className="object-cover w-full"
          alt="Image"
        />
        <div
          className="
          absolute
          top-5
          right-5
        "
        >
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
