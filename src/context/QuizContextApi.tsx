import React, { createContext, useState } from "react";

const QuizContext = createContext({});

const QuizState = ({ children }: any) => {
  const [quiz, setQuiz] = useState({
    Basic_Details: {
      Id: Date.now().toString(),
      No_ofQuestions: 0,
      category: "",
      quizName: "",
      Time: 0,
      TimePeriod: {
        start: new Date().toString(),
        end: new Date().toString(),
      },
      pointsPerQuestion: 0,
      logoUrl: "",
    },
    Questionare: [],
  });
  const submitQuizDetails = (quizDetails: any, fromDate: any, toDate: any) => {
    //console.log(fromDate, toDate)

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
  const clearquiz = () => {
    setQuiz({
      Basic_Details: {
        Id: "",
        No_ofQuestions: 0,
        category: "",
        quizName: "",
        Time: 0,
        TimePeriod: {
          start: new Date().toString(),
          end: new Date().toString(),
        },
        pointsPerQuestion: 0,
        logoUrl: "",
      },
      Questionare: [],
    });
  };
  const updateQuestionare = (question:any,updatedIndex:number) =>{
    setQuiz({
      ...quiz,
      Questionare: [
        quiz.Questionare.map((quizQuestion:any,index:number) =>{
          index === updatedIndex ? question : quizQuestion
        })
      ],
    })
  }
  // const editquiz = () => {
  //   setQuiz({
  //     Basic_Details: {
  //       Id: quiz.Basic_Details.Id,
  //       No_ofQuestions: quiz.Basic_Details.No_ofQuestions,
  //       category: quiz.Basic_Details.category,
  //       quizName: quiz.Basic_Details.quizName,
  //       Time: quiz.Basic_Details.Time,
  //       TimePeriod: {
  //         start: new Date(),
  //         end: new Date(),
  //       },
  //       pointsPerQuestion: quiz.Basic_Details.pointsPerQuestion,
  //       logoUrl: "",
  //     },
  //     Questionare: [],
  //   });
  // };
  return (
    <QuizContext.Provider
      value={{
        quiz,
        submitQuizDetails,
        submitQuestion,
        clearquiz,
        setQuiz,
        updateQuestionare
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export { QuizContext, QuizState };
