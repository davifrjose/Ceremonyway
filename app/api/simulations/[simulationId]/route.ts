import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  simulationId?: string;
}

export async function DELETE(
  request: Request, 
  { params }: { params: IParams }
){
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { simulationId } = params;

  if (!simulationId || typeof simulationId !== 'string') {
    throw new Error('Not getting id');
  }

  const simulation = await prisma.simulation.deleteMany({
    where: {
      id: simulationId,
      OR : {
        userId: currentUser.id
      }
    },
  });

  return NextResponse.json(simulation);
}