import getReservations from "@/app/actions/getReservations";
import { Nunito } from "next/font/google";
import getCurrentUser from "./actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";
import LoginModal from "./components/models/LoginModal";
import RegisterModal from "./components/models/RegisterModal";
import RentModal from "./components/models/RentModal";
import SearchModal from "./components/models/SearchModal";
import CheckOutModal from "./components/models/checkoutModal";
import Navbar from "./components/navbar/Navbar";
import "./globals.css";
import ToasterProvider from "./providers/ToasterProvider";

export const metadata = {
  title: "Ceremonyway",
  description: "Gerenciamento de eventos",
};
const font = Nunito({
  subsets: ["latin"],
});
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  const reservations = await getReservations({ userId: currentUser?.id });
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <SearchModal />
          <RentModal />
          <LoginModal />
          <RegisterModal />
          <CheckOutModal reservations={reservations} />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
