import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
const QuizDetails = ({ quiz }) => {
  return (
    <View style={styles.quizDetailsQuestionsContainer}>
      <View style={styles.basicDetailContainer}>
        <Text style={styles.quizDetailsHeading}>Quiz Basic Details</Text>
        <View style={styles.quizDetailsQuizLogoContainer}>
          <Image
            style={styles.quizDetailsQuizLogo}
            source={{ uri: quiz.Basic_Details.logoUrl }}
          ></Image>
        </View>
        <View style={styles.basicDetailRow}>
          <Text style={styles.basicDetailTitle}>Quiz Title</Text>
          <Text style={styles.basicDetailData}>
            {quiz.Basic_Details.quizName}
          </Text>
        </View>
        {/* <View style={styles.basicDetailRow}>
          <Text style={styles.basicDetailTitle}>Quiz TimePeriod</Text>
          <Text style={styles.basicDetailData}>{quiz.Basic_Details.TimePeriod}</Text>
        </View> */}
        <View style={styles.basicDetailRow}>
          <Text style={styles.basicDetailTitle}>Quiz Duration</Text>
          <Text style={styles.basicDetailData}>{quiz.Basic_Details.Time}</Text>
        </View>
        <View style={styles.basicDetailRow}>
          <Text style={styles.basicDetailTitle}>Points Per Questioons</Text>
          <Text style={styles.basicDetailData}>
            {quiz.Basic_Details.pointsPerQuestion}
          </Text>
        </View>
        <View style={styles.basicDetailRow}>
          <Text style={styles.basicDetailTitle}>Total Questions</Text>
          <Text style={styles.basicDetailData}>
            {quiz.Basic_Details.No_ofQuestions}
          </Text>
        </View>
        <View style={styles.basicDetailRow}>
          <Text style={styles.basicDetailTitle}>Category</Text>
          <Text style={styles.basicDetailData}>
            {quiz.Basic_Details.category}
          </Text>
        </View>
        <Text style={styles.quizDetailsHeading}>Quiz Questions</Text>
        {quiz.Questionare.map((question: any, index: number) => (
          <View style={styles.questionareContainer}>
            <View>
              <Text style={styles.questionareTitle}>Question {index + 1}</Text>
              <Text style={styles.questionareData}>
                <Text>{question.Ques}</Text>
              </Text>
            </View>
            <View>
              <Text style={styles.questionareTitle}>Answer</Text>
              <Text style={styles.questionareData}>{question.CorrectAns}</Text>
            </View>
            <View>
              <Text style={styles.questionareTitle}>Incorrect Answer</Text>
              {question.Incorect_Ans.map(
                (incorrectOption: String, index: number) => (
                  <Text style={styles.questionareData}>
                    {index + 1}. {incorrectOption}
                  </Text>
                )
              )}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  basicDetailRow: {
    flexDirection: "row",
  },
  quizDetailsQuestionsContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  basicDetailContainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#f4f4f4",
    width: "90%",
    backgroundColor: "#ffffff",
    marginBottom: 15,
    marginTop: 15,
    padding: 20,
    shadowColor: "rgba(145, 135, 230, 0.4);",
    shadowOffset: { width: 4, height: 10 },
    shadowOpacity: -10,
    shadowRadius: 26,
    elevation: 2,
    alignItems: "center",
  },
  questionareContainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#f4f4f4",
    width: "95%",
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
  basicDetailTitle: {
    width: "55%",
    fontWeight: "bold",
    paddingBottom: 10,
  },
  questionareData: {
    paddingBottom: 10,
    paddingLeft: 10,
  },
  questionareTitle: {
    fontWeight: "bold",
    paddingBottom: 10,
    paddingLeft: 10,
  },

  basicDetailData: {
    width: "45%",
    paddingBottom: 10,
  },
  quizDetailsQuizLogoContainer: {
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    borderRadius: 20,
  },
  quizDetailsQuizLogo: {
    width: 100,
    height: "70%",
    borderRadius: 20,
  },
  quizDetailsHeading: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
});
export default QuizDetails;
