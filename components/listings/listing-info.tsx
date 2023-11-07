"use client";

import React from "react";

import { SafeUser } from "@/types";
import { IconType } from "react-icons";
import useCountries from "@/hooks/use-countries";
import Avatar from "../avatar";
import Map from "../map";
import ListingCategory from "./listing-category";

type TCategory = {
  label: string;
  description: string;
  icon: IconType;
};

interface ListingInfoProps {
  user: SafeUser;
  category: TCategory | undefined;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
}

const ListingInfo = ({
  user,
  category,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  locationValue,
}: ListingInfoProps) => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div
        className="
          text-xl font-semibold flex flex-row items-center gap-2
        "
      >
        <div>Hosted by {user?.name}</div>
        <Avatar src={user?.image} />
      </div>
      <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
        <div>{guestCount} guests</div>
        <div>{roomCount} rooms</div>
        <div>{bathroomCount} bathrooms</div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category?.label}
          description={category?.description}
        />
      )}
      <hr />
      <div
        className="
      text-lg font-light text-neutral-500"
      >
        {description}
      </div>
      <hr />
      <Map center={coordinates} />
    </div>
  );
};
export default ListingInfo;
