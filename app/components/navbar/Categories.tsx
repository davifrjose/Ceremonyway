'use client'

import Container from "../Conatiner"
import { TiLocation } from 'react-icons/ti'
import { BsFillCameraFill } from 'react-icons/bs'
import { BiMusic } from 'react-icons/bi'
import { MdFoodBank } from 'react-icons/md'
import { GiFlowerPot, GiMagicHat } from 'react-icons/gi'
import CategoryBox from "../CategoryBox"
import { usePathname, useSearchParams } from "next/navigation"
export const categories = [ 
{
  label : "Espaços",
  icon : TiLocation,
  description: "Espaços disponíveis"
},
{
  label : "Fotógrafos",
  icon : BsFillCameraFill,
  description: "Fotógrafos disponíveis"
},
{
  label : "Música",
  icon : BiMusic,
  description: "Artitas disponíveis"
},
{
  label : "Catering",
  icon : MdFoodBank,
  description: "Catering disponíveis"
},
{
  label : "Flores",
  icon : GiFlowerPot,
  description: "Arranjos florais"
},
{
  label : "Animadores",
  icon : GiMagicHat,
  description: "Animações disponíveis"
},


]

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  if (!isMainPage) {
    return null;
  }
  return(
    <Container>
      <div
       className="
       pt-4
       flex 
       flex-row 
       items-center 
       justify-between
       overflow-x-auto
     "
      >
        {categories.map((item) =>(
          <CategoryBox
            key={item.label}
            label={item.label}
            selected={category === item.label}
            icon={item.icon}
            />
            
        ))}
      </div>
    </Container>

  )

}

export default Categories
