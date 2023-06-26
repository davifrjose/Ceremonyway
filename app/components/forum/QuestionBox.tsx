'use client'
import { SafeUser } from "@/app/types";
import React, { useState } from "react";
import Avatar from "../Avatar";
import CommentBox from "./CommentBox";


interface QuestionBoxProps {
  currentUser?: SafeUser | null;
  createdAt?: string;
  question: string;
  
}


const QuestionBox: React.FC<QuestionBoxProps> = ({
  currentUser,
  createdAt,
  question,
  

}) => {
  const [showComments, setShowComments] = useState(false);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    
    <div>
      <div className="flex justify-between">
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
        <button>Ver respostas</button>
        
      </div>

      <div>
        <p className="mt-2 text-sm">
          {question}
        </p>
      </div>
      

    </div>
    
  )
}

export default QuestionBox;