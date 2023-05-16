'use client';

import dynamic from "next/dynamic";
import { IconType } from "react-icons";

import useStateCities from "@/app/hooks/useCities";
import { SafeUser } from "@/app/types";

import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";


const Map = dynamic(() => import('../Map'), {
  ssr: false
});

interface ListingInfoProps {
  user: SafeUser,
  description: string;
  guestCount: number;
  category: {
    icon: IconType,
    label: string;
    description: string;
  } | undefined
  locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  guestCount,
  category,
  locationValue,
}) => {
  const { getByValue } = useStateCities();

  const coordinates = getByValue(locationValue)

  //const coordinates = getByValue(locationValue)?.longitude
  console.log({ coordinates })


  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div
          className="
            text-xl 
            font-semibold 
            flex 
            flex-row 
            items-center
            gap-2
          "
        >
          <div>Hospedado por {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div className="
            flex 
            flex-row 
            items-center 
            gap-4 
            font-light
            text-neutral-500
          "
        >
          <div>
            {guestCount} Convidados
          </div>
        </div>
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
      <div className="
      text-lg font-light text-neutral-500">
        {description}
      </div>
      <hr />
      <Map center={[Number(coordinates?.latitude), Number(coordinates?.longitude)]} />
    </div>
  );
}

export default ListingInfo;