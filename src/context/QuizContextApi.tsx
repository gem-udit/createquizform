import React, { createContext, useState } from "react";

const QuizContext = createContext({});

const QuizState = ({ children }: any) => {
  const [quiz, setQuiz] = useState({
    Basic_Details: {
      Id: "",
      No_ofQuestions: -1,
      category: "",
      quizName: "",
      Time: 0,
      TimePeriod: {
        start: new Date(),
        end: new Date(),
      },
      pointsPerQuestion: 0,
      logoUrl: "",
    },
    Questionare: [],
  });
  return (
    <QuizContext.Provider value={{ quiz, setQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};

export { QuizContext, QuizState };
