import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";


export default async function getForumQuestion(){
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return [];
  }

  const forumQuestion = await prisma.forumQuestions.findMany({
    orderBy: {
      createdAt: 'asc'
    },
    include: {
      user : true
      
    }
  })
  console.log(forumQuestion)

  return forumQuestion;


}