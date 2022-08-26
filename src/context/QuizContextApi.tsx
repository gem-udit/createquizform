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
  const submitQuizDetails = (quizDetails: any, fromDate: any, toDate: any) => {

    setQuiz({

      ...quiz,

      Basic_Details: {

        Id: quizDetails.Id,

        No_ofQuestions: Number(quizDetails.No_ofQuestions),

        quizName: quizDetails.quizName,

        Time: Number(quizDetails.Time),

        pointsPerQuestion: Number(quizDetails.pointsPerQuestion),

        logoUrl: quizDetails.logoUrl,

        category: quizDetails.category,

        TimePeriod: {

          start: fromDate,

          end: toDate,

        },

      },

    });

  };

  const submitQuestion = (quesAns: any, incorrectAnswers: any) => {

    setQuiz({

      ...quiz,

      Questionare: [

        ...quiz.Questionare,

        {

          Ques: quesAns.Ques,

          CorrectAns: quesAns.CorrectAns,

          Incorect_Ans: [

            incorrectAnswers.option1,

            incorrectAnswers.option2,

            incorrectAnswers.option3,
          ],
        },
      ],
    });
  };
  return (
    <QuizContext.Provider value={{ quiz, submitQuizDetails, submitQuestion }}>
      {children}
    </QuizContext.Provider>
  );
};

export { QuizContext, QuizState };
