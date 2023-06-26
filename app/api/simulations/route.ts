import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import useSimulationListingsModal from "@/app/hooks/useSimulationListings";


export async function POST(
  request: Request,
) {
  const currentUser = await getCurrentUser();


  if (!currentUser) {
    return NextResponse.error();
  }
  const body = await request.json();
  const {
    title,
    description,
    items
  } = body;

  /*if (!listingId  || !totalPrice) {
   return NextResponse.error();
 } */

  // Object.keys(body).forEach((value: any) => {
  //   if (!body[value]) {
  //     NextResponse.error();
  //   }
  // });

  try {
    console.log
    const simulation = await prisma.simulation.create({
      data: {
        title,
        description,
        userId: currentUser.id,
      }
    });

    const simulationListings = await prisma.simulationListings.createMany({
      data: items.map((it: any) => ({
        listingId : it.listing.id,    
        simulationId : simulation.id, 
        listeingQty: it.totalPrice, 
        startDate : it.startDate,   
        endDate : it.endDate,
      }))
    });

    return NextResponse.json(simulation), NextResponse.json(simulationListings);

  } catch (err) {
    console.log({ err })
  }
}