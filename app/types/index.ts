import { Listing, Reservation, Simulation, User, SimulationListings, ForumQuestions } from "@prisma/client"

export type SafeListing = Omit<
  Listing,
  "createdAt"
> & {
  createdAt : string;
}

export type SafeReservation = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt : string;
  startDate : string;
  endDate : string;
  listing : SafeListing;
}

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt : string;
  updatedAt : string;
  emailVerified : string | null;
}
export type SafeForumQuestion = Omit<
  User,
  "createdAt" | "updatedAt" | "question"
> & {
  createdAt : Date;
  updatedAt : string;
  question : string | null;
}
export type SafeSimulation = Omit<
  Simulation,
  "createdAt" | "title" | "description" | "listing" | "simulationListings"
> & {
  createdAt : string;
  title : string;
  description : string;
  listing : SafeListing[];
  simulationListings : SafeSimulationListing[];
}

export type SafeSimulationListing = Omit<
  SimulationListings,
  "listeingQty"  | "startDate" | "endDate" | "listing"
> & {

  listeingQty : number;
  startDate : string;
  endDate : string;
  listing : SafeListing;

}