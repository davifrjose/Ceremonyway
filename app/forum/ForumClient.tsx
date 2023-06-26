import QuestionBox from "../components/forum/QuestionBox"
import QuestionBox2 from "../components/forum/QuestionBox2"
import { SafeForumQuestion, SafeUser } from "../types"
import { ForumHeader } from "./header"

interface ForumQuestionProps {
  forumQuestions: SafeForumQuestion[]
  currentUser?: SafeUser | null,
  
}

const ForumQuestionClient: React.FC<ForumQuestionProps> = ({
  forumQuestions,
  currentUser,
  
}) => {
  return(
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <ForumHeader />
      <hr className="my-4" />
      <section>
      {forumQuestions.map((forumQuestion) => (
        <><QuestionBox
          currentUser={currentUser}
          key={forumQuestion.id}
          createdAt={forumQuestion.createdAt.toLocaleString()}
          question={forumQuestion.question || ''}
        
          />
          <QuestionBox2 /></>


      ))}

      </section>
    </div>
  )
  }

  export default ForumQuestionClient; 