"use client";

import useLoginModalStore from "@/app/hooks/useLoginModal";
import useRegisterModalStore from "@/app/hooks/useRegisterModal";
import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";

import useRentModal from "@/app/hooks/useRentModal";
import { SafeUser } from "@/app/types";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const registerModal = useRegisterModalStore();
  const loginModal = useLoginModalStore();
  const rentModal = useRentModal();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="
          hidden
          md:block
          text-sm
          font-semibold
          py-3
          px-4
          rounded-full
          hover:bg-neutral-100
          transition
          cursor-pointer
        "
        >
          Ceremonyway o seu evento
        </div>
        <div
          onClick={toggleOpen}
          className="
        p-4
        md:py-1
        md:px-2
        border-[1px]
        border-neutral-200
        flex
        flex-row
        items-center
        gap-3
        rounded-full
        cursor-pointer
        hover:shadow-md
        transition
        "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="
          absolute
          rounded-xl
          shadow-md
          w-{40vw}
          md:w-3/4
          bg-white
          z-10
          overflow-hidden
          right-0
          top-12
          text-sm
        "
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => router.push("/eventss")}
                  label="Simular"
                />
                
                <MenuItem onClick={() => router.push("/reservations")} label="Minhas simulacões" />

                <MenuItem
                  onClick={() => router.push("/favorites")}
                  label="Meus favoritos"
                />
                
                <MenuItem onClick={() => router.push("/ideas")} label="Ideias" />

                <MenuItem onClick={() => router.push("/forum")} label="Fórum" />

                

                <MenuItem
                  onClick={rentModal.onOpen}
                  label="Ceremonyway o seu evento"
                />                
                <hr />
                <MenuItem onClick={() => signOut()} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Registar" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;

function useRentalModalStore() {
  throw new Error("Function not implemented.");
}
