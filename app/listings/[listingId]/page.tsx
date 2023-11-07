import getCurrentUser from "@/actions/get-current-user";
import getListingById from "@/actions/get-listingby-id";
import ClientOnly from "@/components/clientonly";
import EmptyState from "@/components/empty-state";
import ListingClient from "./listing-client";
import getReservations from "@/actions/get-reservations";

const ListingPage = async ({ params }: { params: { listingId: string } }) => {
  const currentUser = await getCurrentUser();
  const reservations = await getReservations(params);
  const listing = await getListingById(params.listingId);

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        currentUser={currentUser}
        reservations={reservations}
      />
    </ClientOnly>
  );
};

export default ListingPage;
