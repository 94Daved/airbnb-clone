import { Listing, Reservation, User } from "@prisma/client";

export type SafeListings = Omit<Listing, "createdAt"> & {
  createdAt: string;
};

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type SafeReservation = Omit<
  Reservation,
  "startDate" | "endDate" | "createdAt" | "listing"
> & {
  startDate: string;
  endDate: string;
  createdAt: string;
  listing: SafeListings;
};
