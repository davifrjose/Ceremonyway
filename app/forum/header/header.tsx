"use client";

import Modal from "@/app/components/models/Modal";
import axios from "axios";
import { useRef, useState } from "react";

export const ForumHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const questionRef = useRef<HTMLTextAreaElement>(null);

  const [question, setQuestion] = useState("");

  const handleCreateNew = () => {
    if (!question) {
      questionRef.current?.focus();

      axios.post("/api/forum", {
        question,
      });

      return;
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-xl">Fórum</h1>

        <button
          type="submit"
          onClick={() => setIsOpen(true)}
          className="rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold
           text-white shadow-sm hover:bg-indigo-500 focus-visible:outline
           focus-visible:outline-2 focus-visible:outline-offset-2
          focus-visible:outline-indigo-600"
        >
          Fazer uma questão
        </button>
      </div>

      <Modal
        isOpen={isOpen}
        title="Nova pergunta no fórum"
        actionLabel="Salvar"
        onSubmit={handleCreateNew}
        onClose={() => setIsOpen(false)}
      >
        <form>
          <div className="flex flex-col gap-2">
            <label htmlFor="question">Pergunta *</label>
            <textarea
              ref={questionRef}
              title="add new forum"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              name="message"
              id="question"
              rows={4}
              className="block w-full rounded-md border-0 px-3.5 py-2 
                text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              defaultValue={""}
            />
          </div>
        </form>
      </Modal>
    </>
  );
};
