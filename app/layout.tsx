import type { Metadata } from "next";
import { Nunito } from "next/font/google";

import "./globals.css";
import ClientOnly from "@/components/clientonly";
import Navbar from "@/components/navbar/navbar";
import ToasterProvider from "@/components/providers/toaster-provder";
import RegisterModal from "@/components/modals/register-modal";
import RentModal from "@/components/modals/rent-modal";
import LoginModal from "@/components/modals/login-modal";
import getCurrentUser from "@/actions/get-current-user";
import SearchModal from "@/components/modals/search-modal";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb clone",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <Navbar currentUser={currentUser} />
          <RegisterModal />
          <LoginModal />
          <RentModal />
          <SearchModal />
          <ToasterProvider />
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
