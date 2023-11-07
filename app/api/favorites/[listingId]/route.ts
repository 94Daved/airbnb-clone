import { NextResponse } from "next/server";

import getCurrentUser from "@/actions/get-current-user";
import db from "@/libs/db";

export async function POST(
  req: Request,
  { params }: { params: { listingId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("No User loggin in", { status: 401 });
    }

    if (!params.listingId || typeof params.listingId !== "string") {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    const user = await db.user.update({
      where: { id: currentUser.id },
      data: { favoriteIds: [...currentUser.favoriteIds, params.listingId] },
    });

    return Response.json(user);
  } catch (error) {
    console.log("[POST_FAVORITEIDs_ERROR]");
    return new NextResponse("[POST_FAVORITEIDs_ERROR]", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { listingId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("No User loggin in", { status: 401 });
    }

    if (!params.listingId || typeof params.listingId !== "string") {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    let newFavorites = currentUser.favoriteIds.filter(
      (id) => id !== params.listingId
    );

    const user = await db.user.update({
      where: { id: currentUser.id },
      data: { favoriteIds: [...newFavorites] },
    });

    return Response.json(user);
  } catch (error) {
    console.log("[DELETE_FAVORITEIDs_ERROR]");
    return new NextResponse("[DELETE_FAVORITEIDs_ERROR]", { status: 500 });
  }
}
