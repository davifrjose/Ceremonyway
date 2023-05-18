import  { create } from 'zustand'

interface CheckoutModal {
  isOpen: boolean,
  onOpen: () => void,
  onClose: () => void
}

const useCheckoutModal = create<CheckoutModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useCheckoutModal;
