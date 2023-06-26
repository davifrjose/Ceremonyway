import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

interface IParams {
  items?: string[];
  userId?: string;
  authorId?: string;
  
}
export default async function getSimulations (
  params: IParams
)
{
try {
  const { items, userId, authorId} = params;

  const query: any = {};

  if (items) {
    query.items = items;
  };

  if (userId) {
    query.userId = userId;
  }

  if (authorId) {
    query.listing = { userId: authorId };
  }
  const currentUser = await getCurrentUser();
  


  const simulations = await prisma.simulation.findMany({
    where: {
      userId: currentUser?.id,
    },
    orderBy: {
      createdAt: 'desc'
    },
    include: { SimulationListings: true }
  });

  // const safeSimulations = await Promise.all( simulations.map(
  //   async (simulation) => ({
  //   ...simulation,
  //   createdAt: simulation.createdAt.toISOString(),
  //   listings: await Promise.all( simulation..map(async reservationId => {
  //     const list = await prisma.listing.findFirst({ where: { id: reservationId }})

  //     return list
  //   })),
  // })));

  
  
  return simulations;
}catch (error: any) {
  throw new Error(error);
}
}