import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const forum = await prisma.forumQuestions.create({
    data: {
      question: body.question,
      date: new Date(),
      userId: currentUser.id,
    },
  });

  return NextResponse.json(forum);
}
