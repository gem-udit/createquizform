import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Modal,
  Dimensions
} from "react-native";
import { QuizContext } from "../../context/QuizContextApi";
import { db } from "../../firebase/config";
import { FontAwesome } from "@expo/vector-icons";
let { width, height } = Dimensions.get("window");
import { collection, addDoc } from "firebase/firestore";
const QuizDetails = ({ navigation, }) => {
  const { quiz, clearquiz, deletequiz }: any = useContext(QuizContext);
  //console.log(quiz)
  const [showWarning, SetshowWarning] = useState(false);
  useEffect(() => {
    console.log(quiz);
    console.log("------------");
  }, [navigation, quiz])
  const handleRemoveItem = async (id: Object) => {
    deletequiz(id);
  }
  const submitQuiz = async () => {
    try {
      await addDoc(collection(db, "QuizData"), quiz);
    } catch (err) {
      console.log(err);
    }
    navigation.navigate("quizSubmitted");
  };

  const clearquizdetails = () => {
    clearquiz();
    navigation.navigate("BasicDetails");
  };

  const edit = () => {
    navigation.navigate("BasicDetails");
  };
  const alert = () => {
    SetshowWarning(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.createQuizHeader}>
        <Text allowFontScaling={false} style={styles.createQuizTxt}>Gemini Quiz</Text>
      </View>
      <ScrollView>
        <View style={styles.completedFormContainer}>
          <Text allowFontScaling={false} style={styles.completedFormText}>
            Quiz Basic Details and Questions filled Successfully. Review the details
            and click on Submit Button at bottom of screen to save your Quiz
          </Text>
          <View style={styles.quizDetailsQuestionsContainer}>
            <View style={styles.basicDetailContainer}>
              <Text allowFontScaling={false} style={styles.quizDetailsHeading}>Quiz Basic Details</Text>
              {quiz.Basic_Details.logoUrl !== "" && (
                <View style={styles.quizDetailsQuizLogoContainer}>
                  <Image
                    style={styles.quizDetailsQuizLogo}
                    source={{ uri: quiz.Basic_Details.logoUrl }}
                  ></Image>
                  <TouchableOpacity
                    style={{ bottom: "12%", left: "50%" }}
                    onPress={edit}
                  >
                    <Image
                      source={require("../../../assets/edit.png")}
                      style={{
                        width: width / 17.72,
                        height: width / 15.72,
                        alignSelf: "center",
                        tintColor: "#6A5AE1",
                      }} />
                  </TouchableOpacity>
                </View>
              )}
              <View style={styles.basicDetailRow}>
                <Text allowFontScaling={false} style={styles.basicDetailTitle}>Quiz Title</Text>
                <Text allowFontScaling={false} style={styles.basicDetailData}>
                  {quiz.Basic_Details.quizName}
                </Text>
              </View>
              <View style={styles.basicDetailRow}>
                <Text allowFontScaling={false} style={styles.basicDetailTitle}>Quiz From Date</Text>
                <Text allowFontScaling={false} style={styles.basicDetailData}>
                  {(new Date(quiz.Basic_Details.TimePeriod.start)).toDateString()}
                </Text>
              </View>
              <View style={styles.basicDetailRow}>
                <Text allowFontScaling={false} style={styles.basicDetailTitle}>Quiz To Date</Text>
                <Text allowFontScaling={false} style={styles.basicDetailData}>
                  {(new Date(quiz.Basic_Details.TimePeriod.end)).toDateString()}
                </Text>
              </View>
              <View style={styles.basicDetailRow}>
                <Text allowFontScaling={false} style={styles.basicDetailTitle}>Quiz Duration</Text>
                <Text allowFontScaling={false} style={styles.basicDetailData}>
                  {quiz.Basic_Details.Time}
                </Text>
              </View>
              <View style={styles.basicDetailRow}>
                <Text allowFontScaling={false} style={styles.basicDetailTitle}>
                  Points Per Questions
                </Text>
                <Text allowFontScaling={false} style={styles.basicDetailData}>
                  {quiz.Basic_Details.pointsPerQuestion}
                </Text>
              </View>
              <View style={styles.basicDetailRow}>
                <Text allowFontScaling={false} style={styles.basicDetailTitle}>Total Questions</Text>
                <Text allowFontScaling={false} style={styles.basicDetailData}>
                  {quiz.Basic_Details.No_ofQuestions}
                </Text>
              </View>
              <View style={styles.basicDetailRow}>
                <Text allowFontScaling={false} style={styles.basicDetailTitle}>Category</Text>
                <Text allowFontScaling={false} style={styles.basicDetailData}>
                  {quiz.Basic_Details.category}
                </Text>
              </View>
              <Text allowFontScaling={false} style={styles.quizDetailsHeading}>Quiz Questions</Text>
              {quiz.Questionare.map((question: any, index: number) => (
                <View style={{ flexDirection: "row" }} key={index}>
                  <View style={styles.questionareContainer}>
                    <View>
                      <Text allowFontScaling={false} style={styles.questionareTitle}>
                        Question {index + 1}
                      </Text>
                      <Text allowFontScaling={false} style={styles.questionareData}>
                        {question.Ques}
                      </Text>
                    </View>
                    <View>
                      <Text allowFontScaling={false} style={styles.questionareTitle}>Answer</Text>
                      <Text allowFontScaling={false} style={styles.questionareData}>
                        {question.CorrectAns}
                      </Text>
                    </View>
                    <View>
                      <Text allowFontScaling={false} style={styles.questionareTitle}>
                        Incorrect Answer
                      </Text>
                      {question.Incorrect_Ans.map(
                        (incorrectOption: String, index: number) => (
                          <Text allowFontScaling={false} style={styles.questionareData} key={index}>
                            {index + 1}. {incorrectOption}
                          </Text>
                        )
                      )}
                    </View>
                  </View>
                  <View style={{ flexDirection: "column", top: height / 50, left: "2%" }}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("Questions", {
                          index: index,
                          question: question,
                        })
                      }
                    >
                      <Image
                        source={require("../../../assets/edit.png")}
                        style={{
                          width: width / 17.72,
                          height: width / 15.72,
                          alignSelf: "center",
                          tintColor: "#6A5AE1",
                        }}
                      />
                    </TouchableOpacity>
                    {quiz.Questionare.length > 1 ?
                      (<TouchableOpacity onPress={() => handleRemoveItem(index)}>
                        <Image
                          source={require("../../../assets/Bin.png")}
                          style={{
                            width: width / 18.72,
                            height: width / 16.72,
                            alignSelf: "center",
                            top: "20%",
                            tintColor: "#6A5AE1",
                          }}
                        />
                      </TouchableOpacity>) : (<></>)}
                  </View>
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
                <Text allowFontScaling={false} style={styles.btnText}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.deleteBtnBackground,
                  styles.questionButtonsStyling,
                ]}
                onPress={alert}
              >
                <Text allowFontScaling={false} style={styles.btnText}>Delete quiz</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      {showWarning && (
        <View style={styles.body}>
          <Modal
            visible={showWarning}
            transparent
            onRequestClose={() => SetshowWarning(false)}
          >
            <View style={styles.centered_view}>
              <View style={styles.warning_modal}>
                <View style={styles.modal_heading}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <FontAwesome
                      name="exclamation-circle"
                      style={{
                        color: "white",
                        fontSize: 20,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    ></FontAwesome>
                    <Text allowFontScaling={false} style={styles.textheading}>
                      Confirm Delete
                    </Text>
                  </View>
                </View>
                <View style={[styles.modal_body]}>
                  <Text allowFontScaling={false} style={styles.text}>
                    Are you sure you want to delete this quiz ?
                  </Text>
                  <View
                    style={{
                      justifyContent: "flex-end",
                      flexDirection: "row",
                    }}
                  >
                    <Pressable onPress={clearquizdetails}>
                      <View style={styles.textYes}>
                        <Text
                          allowFontScaling={false}
                          style={{
                            alignSelf: "center",
                            color: "white",
                            fontWeight: "bold",
                          }}
                        >
                          YES
                        </Text>
                      </View>
                    </Pressable>
                    <Pressable onPress={() => SetshowWarning(false)}>
                      <View style={styles.textNo}>
                        <Text
                          allowFontScaling={false}
                          style={{
                            alignSelf: "center",
                            color: "grey",
                            fontWeight: "bold",
                          }}
                        >
                          NO
                        </Text>
                      </View>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      )}
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
  completedFormContainer: {
    width: "100%",
    padding: 10,
  },
  completedFormText: {
    marginBottom: 10,
    color: "#414254",
    fontSize: 14,
    fontFamily: "Montserrat"
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
    paddingBottom: 10,
    fontFamily: "Montserrat-SemiBold",
    fontSize: 14
  },
  questionareData: {
    paddingBottom: 10,
    paddingLeft: 10,
    fontFamily: "Montserrat",
    fontSize: 14
  },
  questionareTitle: {
    paddingBottom: 10,
    paddingLeft: 10,
    fontFamily: "Montserrat-SemiBold",
    fontSize: 14
  },

  basicDetailData: {
    width: "45%",
    paddingBottom: 10,
    fontFamily: "Montserrat",
    fontSize: 14
  },
  quizDetailsQuizLogoContainer: {
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    borderRadius: 20,
    flexDirection: "row",
  },
  quizDetailsQuizLogo: {
    width: 100,
    height: "70%",
    borderRadius: 20,
  },
  quizDetailsHeading: {
    fontSize: 22,
    marginTop: 10,
    marginBottom: 10,
    fontFamily: "Montserrat-SemiBold"
  },
  submitBtnBackground: {
    backgroundColor: "#9187E6",
  },
  deleteBtnBackground: {
    backgroundColor: "#E46566",
    left: "10%"
  },
  questionButtonsStyling: {
    width: "30%",
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  btnText: {
    color: "white",
    fontFamily: "Montserrat-SemiBold",
    fontSize: 14
  },
  btnContainer: {
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
  },
  cardbody: {
    width: "80%",
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 15,
    marginBottom: 35,
  },
  cardbutton: {
    display: "flex",
    width: "10.7%",
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    width: 20,
    height: 19.75,
    paddingTop: 13,
    tintColor: "#498BEA",
  },
  circle: {
    width: 34,
    height: 34,
    paddingBottom: 10,
    borderRadius: 17,
    paddingTop: 10,
    backgroundColor: "rgba(73, 139, 234, 0.3)",
    fontSize: 11,
    color: "#007AFF",
  },
  circleData: {
    width: 20,
    height: 18,
    color: "#007AFF",
    textAlign: "center",
    fontFamily: "Montserrat-Bold",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 14,
    top: -3,
    left: 7,
  },
  centered_view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000099",
  },
  warning_modal: {
    width: "86%",
    height: height / 4.5,
    backgroundColor: "#ffffff",
    borderRadius: 7,
  },
  modal_heading: {
    overflow: "hidden",
    position: "relative",
    width: "100%",
    backgroundColor: "#498BEA",
    borderRadius: 7,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    height: "30%",
    paddingLeft: "5%",
    justifyContent: "center",
  },
  modal_body: {
    margin: "5%",
  },
  text: {
    flexDirection: "row",
    color: "#000000",
    fontSize: width / 26,
    fontFamily: "Montserrat",
  },
  textheading: {
    color: "white",
    fontSize: width / 18,
    fontFamily: "Montserrat",
    marginLeft: "4%",
  },
  textYes: {
    fontSize: width / 22,
    margin: "5%",
    marginRight: 20,
    marginBottom: "0%",
    fontFamily: "Montserrat",
    borderWidth: 2,
    borderColor: "#498BEA",
    backgroundColor: "#498BEA",
    color: "white",
    fontWeight: "bold",
    borderRadius: 4,
    height: height / 21.5,
    width: width / 5.8,
    justifyContent: "center",
    alignContent: "center",
  },
  textNo: {
    position: "relative",
    fontSize: width / 22,
    marginTop: "7%",
    color: "grey",
    fontFamily: "Montserrat",
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#498BEA",
    height: height / 21.5,
    width: width / 5.8,
    fontWeight: "bold",
    borderRadius: 4,
    alignSelf: "center",
    justifyContent: "center",
  },
  body: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
  },
});
export default QuizDetails;
