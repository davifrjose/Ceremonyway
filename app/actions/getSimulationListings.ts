import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function getAllSimulationListings() {
  try {
    const simulationListings = await prisma.simulationListings.findMany({include:{
      listing : true
    }});
    return simulationListings;
  } catch (error) {
    console.error('Error retrieving simulation listings:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Usage example
getAllSimulationListings()
  .then((simulationListings) => {
    console.log('Simulation listings:', simulationListings);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
