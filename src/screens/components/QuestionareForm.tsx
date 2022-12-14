import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { QuizContext } from "../../context/QuizContextApi";
const QuestionareForm = ({ navigation, route }) => {
  const { index, question } = route.params;
  let { updateQuestionare }: any = useContext(QuizContext);
  const [quesAns, setQuesAns] = useState({
    Ques: "",
    CorrectAns: "",
  });

  const [quesAnsError, setQuesAnsError] = useState({
    Ques: "",
    CorrectAns: "",
  });

  const [incorrectAnswers, setIncorrectAnswers] = useState({
    option1: "",
    option2: "",
    option3: "",
  });

  const [incorrectAnsError, setIncorrectAnsError] = useState({
    option1: "",
    option2: "",
    option3: "",
  });
  useEffect(() => {
    // console.log(question);
    setQuesAns({
      Ques: question.Ques,
      CorrectAns: question.CorrectAns,
    });
    setIncorrectAnswers({
      option1: question.Incorrect_Ans[0],
      option2: question.Incorrect_Ans[1],
      option3: question.Incorrect_Ans[2],
    });
    if (
      quiz.Basic_Details.No_ofQuestions === quiz.Questionare.length &&
      index === -1
    )
      navigation.navigate("quizDetails");

  }, [navigation, question]);
  const handleQuesAnsChange = (name: string) => (text: string) => {
    //console.log(text)
    setQuesAnsError({
      ...quesAnsError,
      [name]: "",
    });
    setQuesAns({
      ...quesAns,
      [name]: text,
    });
  };

  const handleIncorrectOptionsChange = (name: string) => (text: string) => {
    setIncorrectAnsError({
      ...incorrectAnsError,
      [name]: "",
    });
    setIncorrectAnswers({
      ...incorrectAnswers,
      [name]: text,
    });
  };
  let { submitQuestion, quiz }: any = useContext(QuizContext);
  const onSubmit = () => {
    let incorrectOptionError = incorrectAnsError;
    let questionAnswerError = quesAnsError;
    let isQuestionFormValid = true;
    if (incorrectAnswers.option1 === "") {
      incorrectOptionError.option1 = "Option 1 is required";
      isQuestionFormValid = false;
    }
    if (incorrectAnswers.option2 === "") {
      incorrectOptionError.option2 = "Option 2 is required";
      isQuestionFormValid = false;
    }
    if (incorrectAnswers.option3 === "") {
      incorrectOptionError.option3 = "Option 3 is required";
      isQuestionFormValid = false;
    }
    if (quesAns.Ques === "") {
      questionAnswerError.Ques = "Question is required";
      isQuestionFormValid = false;
    }
    if (quesAns.CorrectAns === "") {
      questionAnswerError.CorrectAns = "Correct Answer is required";
      isQuestionFormValid = false;
    }
    setIncorrectAnsError({
      option1: incorrectOptionError.option1,
      option2: incorrectOptionError.option2,
      option3: incorrectOptionError.option3,
    });
    setQuesAnsError({
      Ques: questionAnswerError.Ques,
      CorrectAns: questionAnswerError.CorrectAns,
    });
    if (isQuestionFormValid) {
      submitQuestion(quesAns, incorrectAnswers);
      setIncorrectAnswers({
        option1: "",
        option2: "",
        option3: "",
      });
      setQuesAns({
        Ques: "",
        CorrectAns: "",
      });
      if (index !== -1) {
        updateQuestionare(
          {
            Ques: quesAns.Ques,
            CorrectAns: quesAns.CorrectAns,
            Incorrect_Ans: [incorrectAnswers.option1, incorrectAnswers.option2, incorrectAnswers.option3],
          },
          index
        );
        navigation.navigate("quizDetails");
      } else if (
        index === -1 &&
        quiz.Questionare.length === quiz.Basic_Details.No_ofQuestions - 1
      )
        navigation.navigate("quizDetails");
    }
  };
  const resetQuestion = () => {
    setIncorrectAnsError({
      option1: "",
      option2: "",
      option3: "",
    });
    setIncorrectAnswers({
      option1: "",
      option2: "",
      option3: "",
    });
    setQuesAnsError({
      Ques: "",
      CorrectAns: "",
    });
    setQuesAns({
      Ques: "",
      CorrectAns: "",
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.createQuizHeader}>
        <Text allowFontScaling={false} style={styles.createQuizTxt}>Gemini Quiz</Text>
      </View>
      <ScrollView>
        <View style={styles.quizConatiner}>
          <View style={styles.quizSmallContainer}>
            <View style={styles.quizCard}>
              <View style={styles.quizCardContainer}>
                <Text allowFontScaling={false} style={styles.quizCardText}>
                  Fill questions details and click on save each time to save a
                  question
                </Text>
              </View>
              <Text allowFontScaling={false} style={styles.content}>Enter the question</Text>
              <TextInput
                placeholder="Enter the question"
                onChangeText={handleQuesAnsChange("Ques")}
                value={quesAns.Ques}
                style={styles.textInputStyling}
              />
              {quesAnsError.Ques.length !== 0 && (
                <Text allowFontScaling={false} style={styles.incorrectFeedback}>
                  {quesAnsError.Ques}
                </Text>
              )}
              <Text allowFontScaling={false} style={styles.content}>Correct Answer</Text>
              <TextInput
                placeholder="Enter the correct answer"
                onChangeText={handleQuesAnsChange("CorrectAns")}
                value={quesAns.CorrectAns}
                style={styles.textInputStyling}
              />
              {quesAnsError.CorrectAns.length !== 0 && (
                <Text allowFontScaling={false} style={styles.incorrectFeedback}>
                  {quesAnsError.CorrectAns}
                </Text>
              )}
              <Text allowFontScaling={false} style={styles.content}>Incorrect Answers</Text>
              <TextInput
                placeholder="Enter option 1"
                onChangeText={handleIncorrectOptionsChange("option1")}
                value={incorrectAnswers.option1}
                style={styles.textInputStyling}
              />
              {incorrectAnsError.option1.length !== 0 && (
                <Text allowFontScaling={false} style={styles.incorrectFeedback}>
                  {incorrectAnsError.option1}
                </Text>
              )}
              <TextInput
                placeholder="Enter option 2"
                onChangeText={handleIncorrectOptionsChange("option2")}
                value={incorrectAnswers.option2}
                style={styles.textInputStyling}
              />
              {incorrectAnsError.option2.length !== 0 && (
                <Text allowFontScaling={false} style={styles.incorrectFeedback}>
                  {incorrectAnsError.option2}
                </Text>
              )}
              <TextInput
                placeholder="Enter option 3"
                onChangeText={handleIncorrectOptionsChange("option3")}
                value={incorrectAnswers.option3}
                style={styles.textInputStyling}
              />
              {incorrectAnsError.option3.length !== 0 && (
                <Text allowFontScaling={false} style={styles.incorrectFeedback}>
                  {incorrectAnsError.option3}
                </Text>
              )}
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={[
                    styles.saveBtnBackground,
                    styles.questionButtonsStyling,
                  ]}
                  onPress={onSubmit}
                >
                  <Text allowFontScaling={false} style={styles.btnText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.resetBtnBackground,
                    styles.questionButtonsStyling,
                  ]}
                  onPress={resetQuestion}
                >
                  <Text allowFontScaling={false} style={styles.btnText}>Reset</Text>
                </TouchableOpacity>
              </View>
              {index === -1 && (
                <View style={styles.quizCardTextContainer}>
                  <Text allowFontScaling={false} style={styles.quizCardText}>
                    Total Questions Remaining {quiz.Basic_Details.No_ofQuestions - quiz.Questionare.length}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  createQuizTxt: {
    color: "white",
    fontSize: 26,
    top: "10%",
    fontFamily: "Montserrat-SemiBold"
  },
  createQuizHeader: {
    backgroundColor: "#6A5AE1",
    alignItems: "center",
    justifyContent: "center",
    height: 120,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  quizConatiner: {
    alignItems: "center",
  },
  incorrectFeedback: {
    color: "#E46566",
    fontFamily: "Montserrat",
    fontSize: 14,
  },
  btnContainer: {
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "5%"
  },
  quizSmallContainer: {
    width: "90%",
  },
  quizCardTextContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  quizCardText: {
    fontSize: 20,
    fontFamily: "Montserrat-SemiBold"
  },
  quizCard: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#f4f4f4",
    width: "100%",
    backgroundColor: "#ffffff",
    marginBottom: 15,
    marginTop: 15,
    padding: 20,
    shadowColor: "rgba(145, 135, 230, 0.4);",
    shadowOffset: { width: 4, height: 10 },
    shadowOpacity: -10,
    shadowRadius: 26,
    elevation: 2,
  },
  textInputStyling: {
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    borderColor: "lightgrey",
    borderRadius: 7,
    padding: 10,
    justifyContent: "center",
    marginTop: 10,
    fontFamily: "Montserrat",
    fontSize: 14

  },
  saveBtnBackground: {
    backgroundColor: "#9187E6",
    marginRight: 5,
  },
  btnText: {
    color: "white",
    fontFamily: "Montserrat-SemiBold",
    fontSize: 14
  },
  resetBtnBackground: {
    backgroundColor: "#E46566",
  },
  submitBtnBackground: {
    backgroundColor: "#9187E6",
  },
  questionButtonsStyling: {
    width: "25%",
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  quizCardContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  content: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 14
  }
});
export default QuestionareForm;