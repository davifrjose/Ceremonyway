import { SafeUser } from "@/app/types";
import React from "react";
import Avatar from "../Avatar";

interface AnswerBoxProps {
  currentUser?: SafeUser | null;
  createdAt: string;
  question: string;
}

const Answerbox: React.FC<AnswerBoxProps> = ({
  currentUser,
  createdAt,
  question
}) => {
  return(
    <div className="px-8 mt-8">
          <div className="flex space-x-3">
            <div className="flex-shrink-0">
            <div className="hidden md:block">
              <Avatar src={currentUser?.image} />
            </div>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-900">
                <a href="#" className="hover:underline">
                {currentUser?.name}
                </a>
              </p>
              <p className="text-sm text-gray-500">
                <a href="#" className="hover:underline">
                  {createdAt}
                </a>
              </p>
            </div>
          </div>

          <p className="mt-2 text-sm px-2">
          O tempo que uma noiva leva para se preparar pode variar significativamente, dependendo de vários fatores, como o estilo de maquiagem e penteado escolhidos, o tipo de vestido, a complexidade do conjunto e as preferências pessoais da noiva.

Normalmente, o processo de preparação da noiva começa algumas horas antes da cerimônia de casamento. 
          </p>
        </div>
  )

}

export default Answerbox;