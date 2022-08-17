import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { storage, db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { Picker } from "@react-native-picker/picker";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import QuizDetails from "./components/QuizDetails";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const CreateQuizForm = () => {
  const categories = [
    {
      text: "Sports",
      value: "Sports",
    },
    {
      text: "Problem Solving",
      value: "Problem Solving",
    },
    {
      text: "English",
      value: "English",
    },
    {
      text: "Other",
      value: "Other",
    },
  ];
  const [showContainer, setshowContainer] = useState(true);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [saveLogoBtnClicked, setSaveLogoBtnClicked] = useState(false);
  const [saveLogoBtnClickedError, setSaveLogoBtnClickedError] = useState("");
  const integerRegExp = RegExp(/^[0-9]+$/);
  const [quiz, setQuiz] = useState({
    Basic_Details: {
      Id: "",
      No_ofQuestions: -1,
      category: "",
      quizName: "",
      Time: 0,
      pointsPerQuestion: 0,
      logoUrl: "",
    },
    Questionare: [],
  });

  const [quizDetails, setQuizDetails] = useState({
    Id: Date.now().toString(),
    No_ofQuestions: "",
    quizName: "",
    Time: "",
    category: "",
    pointsPerQuestion: "",
    logoUrl: "",
  });

  const [quizDetailsErrors, setQuizDetailsErrors] = useState({
    No_ofQuestions: "",
    quizName: "",
    Time: "",
    category: "",
    pointsPerQuestion: "",
    logoUrl: "",
  });

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

  const onChangeQuizDetails = (name: string) => (text: string) => {
    setQuizDetailsErrors({
      ...quizDetailsErrors,
      [name]: "",
    });
    setQuizDetails({
      ...quizDetails,
      [name]: text,
    });
  };

  const onChangeQuesAns = (name: string) => (text: string) => {
    setQuesAnsError({
      ...quesAnsError,
      [name]: "",
    });
    setQuesAns({
      ...quesAns,
      [name]: text,
    });
  };

  const onChangeIncorrectOptions = (name: string) => (text: string) => {
    setIncorrectAnsError({
      ...incorrectAnsError,
      [name]: "",
    });
    setIncorrectAnswers({
      ...incorrectAnswers,
      [name]: text,
    });
  };

  const handleImgaeUploadClick = async () => {
    setSaveLogoBtnClickedError("");
    let systemImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [7, 7],
      quality: 1,
    });
    if (!systemImage.cancelled) {
      setQuizDetails({
        ...quizDetails,
        logoUrl: systemImage.uri,
      });

      // const uploadUri = systemImage.uri;
      // let filename = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);
      // const response = await (await fetch(uploadUri)).blob();
      // const storageRef = ref(storage, `files/${filename}`);
      // const uploadTask = uploadBytesResumable(storageRef, response);

      // uploadTask.on(
      //   "state_changed",
      //   (snapshot) => {
      //     const progress = Math.round(
      //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      //     );
      //     //setProgresspercent(progress);
      //   },
      //   (error) => {
      //     alert(error);
      //   },
      //   () => {
      //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      //       setQuizDetails({
      //         ...quizDetails,
      //         logoUrl: downloadURL,
      //       });
      //     });
      //   }
      // );
    }
    setQuizDetailsErrors({
      ...quizDetailsErrors,
      logoUrl: "",
    });
  };

  const submitQuizDetails = (): void => {
    let quizInfoErrors = quizDetailsErrors;
    let isQuizDetailsValid = true;
    if (!saveLogoBtnClicked) {
      setSaveLogoBtnClickedError("Please click on save image");
      isQuizDetailsValid = false;
    }
    if (quizDetails.quizName === "") {
      quizInfoErrors.quizName = "Quiz Name is Required";
      isQuizDetailsValid = false;
    }
    if (quizDetails.category === "") {
      quizInfoErrors.category = "Quiz Category is Required";
      isQuizDetailsValid = false;
    }
    if (quizDetails.Time === "") {
      quizInfoErrors.Time = "Quiz Time is Required";
      isQuizDetailsValid = false;
    } else if (!integerRegExp.test(quizDetails.Time)) {
      quizInfoErrors.Time = "Quiz Time should be integer";
      isQuizDetailsValid = false;
    } else {
      if (Number(quizDetails.Time) < 10 || Number(quizDetails.Time) > 30) {
        quizInfoErrors.Time = "Quiz Time should be between 10 and 30 minutes";
        isQuizDetailsValid = false;
      }
    }
    if (quizDetails.pointsPerQuestion === "") {
      quizInfoErrors.pointsPerQuestion = "Points per question is Required";
      isQuizDetailsValid = false;
    } else if (!integerRegExp.test(quizDetails.pointsPerQuestion)) {
      quizInfoErrors.pointsPerQuestion =
        "Points per question should be integer";
      isQuizDetailsValid = false;
    } else {
      if (
        Number(quizDetails.pointsPerQuestion) < 10 ||
        Number(quizDetails.pointsPerQuestion) > 100
      ) {
        quizInfoErrors.pointsPerQuestion =
          "Points per question should be between 10 and 100";
        isQuizDetailsValid = false;
      }
    }
    if (quizDetails.No_ofQuestions === "") {
      quizInfoErrors.No_ofQuestions = "Number of question is Required";
      isQuizDetailsValid = false;
    } else if (!integerRegExp.test(quizDetails.No_ofQuestions)) {
      quizInfoErrors.No_ofQuestions = "Number of question should be integer";
      isQuizDetailsValid = false;
    }
    // } else {
    //   if (
    //     Number(quizDetails.No_ofQuestions) < 10 ||
    //     Number(quizDetails.No_ofQuestions) > 20
    //   ) {
    //     quizInfoErrors.No_ofQuestions =
    //       "Number of question should be between 10 and 20";
    //     isQuizDetailsValid = false;
    //   }
    // }
    if (quizDetails.logoUrl === "") {
      quizInfoErrors.logoUrl = "Logo Url is Required";
      isQuizDetailsValid = false;
    }
    setQuizDetailsErrors({
      No_ofQuestions: quizInfoErrors.No_ofQuestions,
      quizName: quizInfoErrors.quizName,
      Time: quizInfoErrors.Time,
      pointsPerQuestion: quizInfoErrors.pointsPerQuestion,
      logoUrl: quizInfoErrors.logoUrl,
      category: quizInfoErrors.category,
    });
    if (isQuizDetailsValid) {
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
        },
      });
      setQuizDetails({
        Id: "",
        No_ofQuestions: "",
        quizName: "",
        Time: "",
        pointsPerQuestion: "",
        logoUrl: "",
        category: "",
      });
      console.log(quizDetails.logoUrl);
      setshowContainer(false);
    }
  };

  const submitQuestion = () => {
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
      setIncorrectAnswers({
        option1: "",
        option2: "",
        option3: "",
      });
      setQuesAns({
        Ques: "",
        CorrectAns: "",
      });
      console.log(quiz);
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
  const submitQuiz = async () => {
    console.log(quiz);
    try {
      await addDoc(collection(db, "QuizData"), quiz);
    } catch (err) {
      console.log(err);
    }
    setQuizSubmitted(true);
  };

  const saveQuizLogo = async () => {
    setSaveLogoBtnClicked(true);
    const uploadUri = quizDetails.logoUrl;
    let filename = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);
    const response = await (await fetch(uploadUri)).blob();
    const storageRef = ref(storage, `files/${filename}`);
    const uploadTask = uploadBytesResumable(storageRef, response);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgressPercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setQuizDetails({
            ...quizDetails,
            logoUrl: downloadURL,
          });
        });
      }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.createQuizHeader}>
        <Text style={styles.createQuizTxt}>Create Quiz</Text>
      </View>
      <ScrollView>
        <View style={styles.quizConatiner}>
          {showContainer && (
            <View style={styles.quizSmallContainer}>
              <View style={styles.quizCard}>
                <View style={styles.quizCardTextContainer}>
                  <Text style={styles.quizCardText}>
                    Fill Quiz Basic Details
                  </Text>
                </View>
                {quizDetails.logoUrl.length !== 0 && (
                  <View style={styles.imageContainer}>
                    <Image
                      style={styles.quizLogo}
                      source={{ uri: quizDetails.logoUrl }}
                    ></Image>
                    {saveLogoBtnClicked && progressPercent < 100 && (
                      <Text>Uploading...</Text>
                    )}
                    {saveLogoBtnClicked && progressPercent === 100 && (
                      <Text>Uploaded</Text>
                    )}
                    <View style={styles.quizLogoBtnContainer}>
                      <TouchableOpacity
                        style={styles.saveQuizLogoBtn}
                        onPress={saveQuizLogo}
                      >
                        <Text style={styles.btnText}>Save Image</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.saveQuizLogoBtn}
                        onPress={handleImgaeUploadClick}
                      >
                        <Text style={styles.btnText}>Change Image</Text>
                      </TouchableOpacity>
                    </View>
                    {saveLogoBtnClickedError.length !== 0 && (
                      <Text style={styles.incorrectFeedback}>
                        {saveLogoBtnClickedError}
                      </Text>
                    )}
                  </View>
                )}
                <View>
                  <Text>Enter Quiz Name</Text>
                  <TextInput
                    placeholder="Enter Quiz Name"
                    onChangeText={onChangeQuizDetails("quizName")}
                    value={quizDetails.quizName}
                    style={styles.textInputStyling}
                  />
                  {quizDetailsErrors.quizName !== "" && (
                    <Text style={styles.incorrectFeedback}>
                      {quizDetailsErrors.quizName}
                    </Text>
                  )}
                  <Text>Select Quiz Category</Text>
                  <View style={styles.textInputStyling}>
                    <Picker
                      selectedValue={quizDetails.category}
                      mode={"dialog"}
                      style={styles.pickerStyle}
                      prompt="Choose Category"
                      onValueChange={onChangeQuizDetails("category")}
                    >
                      {quizDetails.category === "" && (
                        <Picker.Item label={"Choose Category"} value={""} />
                      )}

                      {categories.map((category, index: number) => (
                        <Picker.Item
                          key={index}
                          label={category.text}
                          value={category.value}
                        />
                      ))}
                    </Picker>
                  </View>
                  {quizDetailsErrors.category !== "" && (
                    <Text style={styles.incorrectFeedback}>
                      {quizDetailsErrors.category}
                    </Text>
                  )}
                  <Text>Enter Quiz Duration</Text>
                  <TextInput
                    placeholder="Enter Quiz Duration (in minutes)"
                    onChangeText={onChangeQuizDetails("Time")}
                    value={quizDetails.Time}
                    style={styles.textInputStyling}
                  />
                  {quizDetailsErrors.Time.length !== 0 && (
                    <Text style={styles.incorrectFeedback}>
                      {quizDetailsErrors.Time}
                    </Text>
                  )}
                  <Text>Enter Points Per Question</Text>
                  <TextInput
                    placeholder="Enter Points per question"
                    onChangeText={onChangeQuizDetails("pointsPerQuestion")}
                    value={quizDetails.pointsPerQuestion}
                    style={styles.textInputStyling}
                  />
                  {quizDetailsErrors.pointsPerQuestion.length !== 0 && (
                    <Text style={styles.incorrectFeedback}>
                      {quizDetailsErrors.pointsPerQuestion}
                    </Text>
                  )}
                  <Text>Enter Total Quesions</Text>
                  <TextInput
                    placeholder="Enter Total Questions"
                    onChangeText={onChangeQuizDetails("No_ofQuestions")}
                    value={quizDetails.No_ofQuestions}
                    style={styles.textInputStyling}
                  />
                  {quizDetailsErrors.No_ofQuestions.length !== 0 && (
                    <Text style={styles.incorrectFeedback}>
                      {quizDetailsErrors.No_ofQuestions}
                    </Text>
                  )}
                  <View style={styles.btnContainer}>
                    <TouchableOpacity
                      style={styles.uploadImgBtn}
                      onPress={handleImgaeUploadClick}
                    >
                      <Text style={styles.btnText}>Upload Quiz Logo</Text>
                    </TouchableOpacity>
                  </View>
                  {quizDetailsErrors.logoUrl.length !== 0 && (
                    <Text style={styles.incorrectFeedback}>
                      {quizDetailsErrors.logoUrl}
                    </Text>
                  )}
                  <View style={styles.btnContainer}>
                    <TouchableOpacity
                      style={styles.saveDetailsBtn}
                      onPress={submitQuizDetails}
                    >
                      <Text style={styles.btnText}>Save Details</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          )}
          {!showContainer &&
            quiz.Basic_Details.No_ofQuestions !== quiz.Questionare.length && (
              <View style={styles.quizSmallContainer}>
                <View style={styles.quizCard}>
                  <View style={styles.quizCardTextContainer}>
                    <Text style={styles.quizCardText}>
                      Fill questions details and click on save each time to save
                      a question
                    </Text>
                  </View>
                  <TextInput
                    placeholder="Enter the question"
                    onChangeText={onChangeQuesAns("Ques")}
                    value={quesAns.Ques}
                    style={styles.textInputStyling}
                  />
                  {quesAnsError.Ques.length !== 0 && (
                    <Text style={styles.incorrectFeedback}>
                      {quesAnsError.Ques}
                    </Text>
                  )}
                  <Text>Correct Answer</Text>
                  <TextInput
                    placeholder="Enter the correct answer"
                    onChangeText={onChangeQuesAns("CorrectAns")}
                    value={quesAns.CorrectAns}
                    style={styles.textInputStyling}
                  />
                  {quesAnsError.CorrectAns.length !== 0 && (
                    <Text style={styles.incorrectFeedback}>
                      {quesAnsError.CorrectAns}
                    </Text>
                  )}
                  <Text>Incorrect Answers</Text>
                  <TextInput
                    placeholder="Enter option 1"
                    onChangeText={onChangeIncorrectOptions("option1")}
                    value={incorrectAnswers.option1}
                    style={styles.textInputStyling}
                  />
                  {incorrectAnsError.option1.length !== 0 && (
                    <Text style={styles.incorrectFeedback}>
                      {incorrectAnsError.option1}
                    </Text>
                  )}
                  <TextInput
                    placeholder="Enter option 2"
                    onChangeText={onChangeIncorrectOptions("option2")}
                    value={incorrectAnswers.option2}
                    style={styles.textInputStyling}
                  />
                  {incorrectAnsError.option2.length !== 0 && (
                    <Text style={styles.incorrectFeedback}>
                      {incorrectAnsError.option2}
                    </Text>
                  )}
                  <TextInput
                    placeholder="Enter option 3"
                    onChangeText={onChangeIncorrectOptions("option3")}
                    value={incorrectAnswers.option3}
                    style={styles.textInputStyling}
                  />
                  {incorrectAnsError.option3.length !== 0 && (
                    <Text style={styles.incorrectFeedback}>
                      {incorrectAnsError.option3}
                    </Text>
                  )}
                  <View style={styles.btnContainer}>
                    <TouchableOpacity
                      style={[
                        styles.saveBtnBackground,
                        styles.questionButtonsStyling,
                      ]}
                      onPress={submitQuestion}
                    >
                      <Text style={styles.btnText}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.resetBtnBackground,
                        styles.questionButtonsStyling,
                      ]}
                      onPress={resetQuestion}
                    >
                      <Text style={styles.btnText}>Reset</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.quizCardTextContainer}>
                    <Text style={styles.quizCardText}>
                      Total Question Remaining{" "}
                      {quiz.Basic_Details.No_ofQuestions -
                        quiz.Questionare.length}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          {quiz.Basic_Details.No_ofQuestions === quiz.Questionare.length &&
            !quizSubmitted && (
              <View style={styles.completedFormContainer}>
                <Text style={styles.completedFormText}>
                  Quiz Details and Questions filled Successfully. Review the
                  detials and click on Submit Button at bottom of screen to save
                  your Quiz
                </Text>

                <QuizDetails quiz={quiz} />
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
                </View>
              </View>
            )}
          {quizSubmitted && (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: "90%",
              }}
            >
              <Text>Quiz Saved Successfully</Text>
            </View>
          )}
        </View>
        <StatusBar style="auto" />
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
    fontWeight: "bold",
    fontSize: 26,
  },
  createQuizHeader: {
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
    height: 120,
  },
  quizConatiner: {
    alignItems: "center",
  },
  incorrectFeedback: {
    color: "red",
    marginBottom: 12,
  },
  uploadImgBtn: {
    width: "100%",
    height: "80%",
    backgroundColor: "grey",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    borderRadius: 10,
  },
  saveDetailsBtn: {
    width: "40%",
    height: "80%",
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginRight: 5,
    marginTop: 24,
    marginBottom: 12,
  },
  quizLogoBtnContainer: {
    flexDirection: "row",
    height: "15%",
    alignItems: "center",
    justifyContent: "center",
  },
  saveQuizLogoBtn: {
    width: "35%",
    height: "100%",
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginRight: 5,
  },
  imageContainer: {
    height: 200,
    alignItems: "center",
  },
  quizLogo: {
    width: 100,
    height: "60%",
    marginBottom: 20,
    borderRadius: 20,
  },
  btnContainer: {
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
  },
  quizSmallContainer: {
    width: "90%",
  },
  quizCardTextContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  quizCardText: {
    fontWeight: "bold",
    fontSize: 22,
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
    marginBottom: 6,
    borderColor: "lightgrey",
    borderRadius: 7,
    padding: 10,
    justifyContent: "center",
  },
  saveBtnBackground: {
    backgroundColor: "lightblue",
    marginRight: 5,
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
  },
  resetBtnBackground: {
    backgroundColor: "red",
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
  completedFormContainer: {
    width: "100%",
    padding: 10,
  },
  completedFormText: {
    marginBottom: 10,
    color: "grey",
    fontSize: 16,
  },
  pickerStyle: {
    width: "100%",
    height: 40,
    fontSize: 14,
  },
});
export default CreateQuizForm;
