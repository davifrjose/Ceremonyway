import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function getTotalListingQty(simulationId: string): Promise<number> {
  const simulation = await prisma.simulation.findUnique({
    where: { id: simulationId },
    include: { SimulationListings: true },
  });

  if (!simulation) {
    throw new Error(`Simulation with ID ${simulationId} not found.`);
  }

  const totalQty = simulation.SimulationListings.reduce(
    (sum, listing) => sum + listing.listeingQty,
    0
  );

  return totalQty;
}
