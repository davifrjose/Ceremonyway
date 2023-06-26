import  { create } from 'zustand'
import { SafeListing } from '../types';

type SimulationListing = {
  listing : SafeListing;
  totalPrice : number;
  startDate: Date;
  endDate: Date;
}

interface SimulationListingsStore{
  items: Array<SimulationListing>;
  add : (sim : SimulationListing) => void;
  remove : (id : SafeListing["id"]) => void;
}

const useSimulationListingsModal = create<SimulationListingsStore>((set) => ( {
  items: [],
  add(sim) {
      set(state =>({ items : [...state.items, sim] }))
  },
  remove(id){
    set(state =>({ items : state.items.filter(st => st.listing.id !== id) }))
  }
}))

export default useSimulationListingsModal;