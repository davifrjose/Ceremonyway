import  { create } from 'zustand'

interface LoginModalStore{
  isOpen: boolean,
  onOpen: () => void,
  onClose: () => void
}

const useLoginModalStore = create<LoginModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useLoginModalStore;
