import db from "@/libs/db";

const getListingById = async (listingId?: string) => {
  if (!listingId) {
    return null;
  }

  try {
    const listing = await db.listing.findUnique({
      where: { id: listingId },
      include: { user: true },
    });

    if (!listing) {
      return null;
    }

    return {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toISOString(),
        updatedAt: listing.user.updatedAt.toISOString(),
        emailVerified: listing.user.emailVerified?.toISOString() || null,
      },
    };
  } catch (error: any) {
    throw new Error(error);
  }
};

export default getListingById;
