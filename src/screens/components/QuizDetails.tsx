import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { QuizContext } from "../../context/QuizContextApi";
import { db } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";
const QuizDetails = ({ navigation }) => {
  const { quiz, clearquiz, editquiz }: any = useContext(QuizContext);

  const submitQuiz = async () => {
    try {
      await addDoc(collection(db, "QuizData"), quiz);
    } catch (err) {
      console.log(err);
    }
    navigation.navigate("quizSubmitted")
  };

  const clearquizdetails = () => {
    clearquiz()
    navigation.navigate("BasicDetails")
  }

  const edit = () => {
    navigation.navigate("BasicDetails")
  }

  return (
    <View style={styles.container}>
      <View style={styles.createQuizHeader}>
        <Text style={styles.createQuizTxt}>Create Quiz</Text>
      </View>
      <ScrollView>
        <View style={styles.completedFormContainer}>
          <Text style={styles.completedFormText}>
            Quiz Details and Questions filled Successfully. Review the
            details and click on Submit Button at bottom of screen to save
            your Quiz
          </Text>
          <View style={styles.quizDetailsQuestionsContainer}>
            <View style={styles.basicDetailContainer}>
              <Text style={styles.quizDetailsHeading}>Quiz Basic Details</Text>
              {quiz.Basic_Details.logoUrl !== "" &&
                <View style={styles.quizDetailsQuizLogoContainer}>
                  <Image
                    style={styles.quizDetailsQuizLogo}
                    source={{ uri: quiz.Basic_Details.logoUrl }}
                  ></Image>
                  <TouchableOpacity
                    style={{ bottom: "12%", left: "50%" }}
                    onPress={edit}
                  >
                    <Text>Edit</Text></TouchableOpacity>
                </View>}
              <View style={styles.basicDetailRow}>
                <Text style={styles.basicDetailTitle}>Quiz Title</Text>
                <Text style={styles.basicDetailData}>
                  {quiz.Basic_Details.quizName}
                </Text>
              </View>
              <View style={styles.basicDetailRow}>
                <Text style={styles.basicDetailTitle}>Quiz From Date</Text>
                <Text style={styles.basicDetailData}>{quiz.Basic_Details.TimePeriod.start}</Text>
              </View>
              <View style={styles.basicDetailRow}>
                <Text style={styles.basicDetailTitle}>Quiz To Date</Text>
                <Text style={styles.basicDetailData}>{quiz.Basic_Details.TimePeriod.end}</Text>
              </View>
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
                <View style={{ flexDirection: 'row' }}>
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
                            {index + 1}.{incorrectOption}
                          </Text>
                        )
                      )}
                    </View>
                  </View>
                  <View style={{ flexDirection: "column" }}>
                    <TouchableOpacity
                      onPress={() => { navigation.navigate("Questions") }}><Text>edit</Text></TouchableOpacity>
                    <TouchableOpacity><Text>delete</Text></TouchableOpacity></View>
                </View>
              ))}
            </View>
            <View style={styles.btnContainer}>

              <TouchableOpacity
                style={[
                  styles.submitBtnBackground,
                  styles.questionButtonsStyling,
                ]}
                onPress={submitQuiz}
              >
                <Text style={styles.btnText}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.submitBtnBackground,
                  styles.questionButtonsStyling,
                ]}
                onPress={clearquizdetails}
              >
                <Text style={styles.btnText}>Delete quiz</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
};
const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  createQuizTxt: {
    color: "white",
    fontWeight: "bold",
    fontSize: 26,
  },
  createQuizHeader: {
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
    height: 120,
  },
  completedFormContainer: {
    width: "100%",
    padding: 10,
  },
  completedFormText: {
    marginBottom: 10,
    color: "grey",
    fontSize: 16,
  },
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
    flexDirection: "row"
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
  submitBtnBackground: {
    backgroundColor: "green",
  },
  questionButtonsStyling: {
    width: "25%",
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
  },
  btnContainer: {
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
  },
});
export default QuizDetails;
