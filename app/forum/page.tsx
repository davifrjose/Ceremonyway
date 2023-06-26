import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getForumQuestion from "../actions/getForumQuestion";
import ForumQuestionClient from "./ForumClient";

const ForumPage = async () =>{
  const currentUser = await getCurrentUser();
  
  if (!currentUser) {
    return (
      <ClientOnly> 
        <EmptyState
          title="Não autorizado"
          subtitle="Por favor faça login"
        />
      </ClientOnly>
    )
  }

  const forumQuestions = await getForumQuestion();

  

  return (
    
    <ClientOnly>
      <ForumQuestionClient 
      forumQuestions={forumQuestions}
      currentUser={currentUser}
      />
    </ClientOnly>
  )
}

export default ForumPage