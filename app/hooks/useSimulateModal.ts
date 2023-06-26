import  { create } from 'zustand'

interface SimulationModalStore{
  isOpen: boolean,
  onOpen: () => void,
  onClose: () => void,
  listeningIds: string[];
  addListeningId : (ids : string[]) => void;
}
   
const useSimulationModal = create<SimulationModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  listeningIds: [],
  addListeningId: (ids : string[]) =>{
    set({ listeningIds : ids})
  }
}));

export default useSimulationModal;
