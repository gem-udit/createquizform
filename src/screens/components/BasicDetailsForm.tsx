import React, { useContext, useEffect, useState } from "react";
import { QuizContext } from "../../context/QuizContextApi";
import Dropdown from "react-native-element-dropdown/src/components/Dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import DatePickerCalendar from 'react-native-calendarview-datepicker';
import Calendar from 'react-native-calendar-datepicker';
import moment from "moment";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  Button,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase/config";
const BasicDetailForm = ({ navigation }) => {
  const [isPickerShowFromDate, setIsPickerShowFromDate] = useState(false);
  const [isPickerShowToDate, setIsPickerShowToDate] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [saveLogoBtnClicked, setSaveLogoBtnClicked] = useState(false);
  const [saveLogoBtnClickedError, setSaveLogoBtnClickedError] = useState("");
  let { quiz, setQuiz }: any = useContext(QuizContext);
  const integerRegExp = RegExp(/^[0-9]+$/);
  const [date, setDate] = useState(moment());
  const [state, setState] = useState(moment());
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

  const showPickerFromDate = () => {
    setIsPickerShowFromDate(true);
  };
  const showPickerToDate = () => {
    setIsPickerShowToDate(true);
  };

  const onChangeFromDate = (event: any, value: Date) => {
    setQuiz({
      ...quiz,
      Basic_Details: {
        ...quiz.Basic_Details,
        TimePeriod: {
          ...quiz.Basic_Details.TimePeriod,
          start: value.toString(),
        },
      },
    });
    if (Platform.OS === "android") {
      setIsPickerShowFromDate(false);
    }
  };
  const onChangeToDate = (event: any, value: Date) => {
    setQuiz({
      ...quiz,
      Basic_Details: {
        ...quiz.Basic_Details,
        TimePeriod: {
          ...quiz.Basic_Details.TimePeriod,
          end: value.toString(),
        },
      },
    });
    if (Platform.OS === "android") {
      setIsPickerShowToDate(false);
    }
  };

  const [quizDetailsErrors, setQuizDetailsErrors] = useState({
    No_ofQuestions: "",
    quizName: "",
    Time: "",
    TimePeriod: "",
    category: "",
    pointsPerQuestion: "",
    logoUrl: "",
  });
  const onChangeQuizDetails = (name: string) => (fieldData: any) => {
    setQuizDetailsErrors({
      ...quizDetailsErrors,
      [name]: "",
    });

    if (
      name === "No_ofQuestions" ||
      name === "Time" ||
      name === "pointsPerQuestion"
    ) {
      setQuiz({
        ...quiz,
        Basic_Details: {
          ...quiz.Basic_Details,
          [name]: Number(fieldData),
        },
      });
    } else if (name === "category") {
      setQuiz({
        ...quiz,
        Basic_Details: {
          ...quiz.Basic_Details,
          [name]: fieldData.value,
        },
      });
    } else {
      setQuiz({
        ...quiz,
        Basic_Details: {
          ...quiz.Basic_Details,
          [name]: fieldData,
        },
      });
    }
  };
  const handleImgaeUploadClick = async () => {
    setSaveLogoBtnClickedError("");
    setSaveLogoBtnClicked(false);
    let systemImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [7, 7],
      quality: 1,
    });
    if (!systemImage.cancelled) {
      setQuiz({
        ...quiz,
        Basic_Details: {
          ...quiz.Basic_Details,
          logoUrl: systemImage.uri,
        },
      });
    }
    setQuizDetailsErrors({
      ...quizDetailsErrors,
      logoUrl: "",
    });
  };
  const saveQuizLogo = async () => {
    setSaveLogoBtnClicked(true);
    setQuizDetailsErrors({
      ...quizDetailsErrors,
      logoUrl: "",
    });
    setSaveLogoBtnClickedError("");
    const uploadUri = quiz.Basic_Details.logoUrl;
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
        console.log(error);
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setQuiz({
            ...quiz,
            Basic_Details: {
              ...quiz.Basic_Details,
              logoUrl: downloadURL,
            },
          });
        });
      }
    );
  };
  const onSubmit = (): void => {
    let quizInfoErrors = quizDetailsErrors;
    let isQuizDetailsValid = true;
    if (!saveLogoBtnClicked) {
      setSaveLogoBtnClickedError("Please click on save image");
      isQuizDetailsValid = false;
    }
    if (quiz.Basic_Details.quizName === "") {
      quizInfoErrors.quizName = "Quiz Name is Required";
      isQuizDetailsValid = false;
    }
    if (quiz.Basic_Details.category === "") {
      quizInfoErrors.category = "Quiz Category is Required";
      isQuizDetailsValid = false;
    }
    if (quiz.Basic_Details.Time === "") {
      quizInfoErrors.Time = "Quiz Time is Required";
      isQuizDetailsValid = false;
    } else if (!integerRegExp.test(quiz.Basic_Details.Time)) {
      quizInfoErrors.Time = "Quiz Time should be integer";
      isQuizDetailsValid = false;
    } else {
      if (quiz.Basic_Details.Time < 10 || quiz.Basic_Details.Time > 30) {
        quizInfoErrors.Time = "Quiz Time should be between 10 and 30 minutes";
        isQuizDetailsValid = false;
      }
    }
    if (quiz.Basic_Details.pointsPerQuestion === "") {
      quizInfoErrors.pointsPerQuestion = "Points per question is Required";
      isQuizDetailsValid = false;
    } else if (!integerRegExp.test(quiz.Basic_Details.pointsPerQuestion)) {
      quizInfoErrors.pointsPerQuestion =
        "Points per question should be integer";
      isQuizDetailsValid = false;
    } else {
      if (
        quiz.Basic_Details.pointsPerQuestion < 10 ||
        quiz.Basic_Details.pointsPerQuestion > 100
      ) {
        quizInfoErrors.pointsPerQuestion =
          "Points per question should be between 10 and 100";
        isQuizDetailsValid = false;
      }
    }
    if (quiz.Basic_Details.No_ofQuestions === "") {
      quizInfoErrors.No_ofQuestions = "Number of question is Required";
      isQuizDetailsValid = false;
    } else if (!integerRegExp.test(quiz.Basic_Details.No_ofQuestions)) {
      quizInfoErrors.No_ofQuestions = "Number of question should be integer";
      isQuizDetailsValid = false;
    }
    if (quiz.Basic_Details.logoUrl === "") {
      quizInfoErrors.logoUrl = "Logo Url is Required";
      isQuizDetailsValid = false;
    }
    setQuizDetailsErrors({
      No_ofQuestions: quizInfoErrors.No_ofQuestions,
      quizName: quizInfoErrors.quizName,
      Time: quizInfoErrors.Time,
      TimePeriod: quizInfoErrors.TimePeriod,
      pointsPerQuestion: quizInfoErrors.pointsPerQuestion,
      logoUrl: quizInfoErrors.logoUrl,
      category: quizInfoErrors.category,
    });
    if (isQuizDetailsValid) {
      if (quiz.Basic_Details.No_ofQuestions === quiz.Questionare.length)
        navigation.navigate("quizDetails");
      navigation.navigate("Questions", {
        index: -1,
        question: {
          Ques: "",
          CorrectAns: "",
          Incorrect_Ans: ["", "", ""],
        },
      });
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.createQuizHeader}>
        <Text style={styles.createQuizTxt}>Gemini Quiz</Text>
      </View>
      <ScrollView>
        <View style={styles.quizConatiner}>
          <View style={styles.quizSmallContainer}>
            <View style={styles.quizCard}>
              <View style={styles.quizCardTextContainer}>
                <Text style={styles.quizCardText}>Fill Quiz Basic Details</Text>
              </View>
              {quiz.Basic_Details.logoUrl.length !== 0 && (
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.quizLogo}
                    source={{ uri: quiz.Basic_Details.logoUrl }}
                  ></Image>
                  {saveLogoBtnClicked && progressPercent < 100 && (
                    <Text style={{ bottom: "5%" }}>Uploading...</Text>
                  )}
                  {saveLogoBtnClicked && progressPercent === 100 && (
                    <Text style={{ bottom: "5%" }}>Uploaded</Text>
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
                <Text style={styles.content}>Enter Quiz Name</Text>
                <TextInput
                  placeholder="Enter Quiz Name"
                  onChangeText={onChangeQuizDetails("quizName")}
                  value={quiz.Basic_Details.quizName}
                  style={styles.textInputStyling}
                />
                {quizDetailsErrors.quizName !== "" && (
                  <Text style={styles.incorrectFeedback}>
                    {quizDetailsErrors.quizName}
                  </Text>
                )}
                <Text style={styles.content}>Select Quiz Category</Text>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  data={categories}
                  value={quiz.Basic_Details.category}
                  labelField={"text"}
                  valueField={"value"}
                  placeholder={!isFocus ? "Select category" : "..."}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={onChangeQuizDetails("category")}
                />
                {quizDetailsErrors.category !== "" && (
                  <Text style={styles.incorrectFeedback}>
                    {quizDetailsErrors.category}
                  </Text>
                )}
                {Platform.OS === "ios" && (
                  <View style={{ marginTop: 10 }}>
                    <Text>Select starting date of quiz (Touch below)</Text>
                    <DateTimePicker
                      value={new Date(quiz.Basic_Details.TimePeriod.start)}
                      mode={"date"}
                      display={"default"}
                      onChange={onChangeFromDate}
                      style={styles.datePickerIOS}
                    />

                    <Text>Select expiry date of quiz (Touch Below)</Text>
                    <DateTimePicker
                      value={new Date(quiz.Basic_Details.TimePeriod.end)}
                      mode={"date"}
                      display={"compact"}
                      onChange={onChangeToDate}
                      style={styles.datePickerIOS}
                    />
                  </View>
                )}
                {Platform.OS !== "ios" && <Text style={styles.content}>Enter Quiz Time Period</Text>}
                {Platform.OS !== "ios" && (
                  <View>
                    <View style={styles.pickedDateContainer}>
                      <Text style={styles.pickedDate}>
                        {(new Date(quiz.Basic_Details.TimePeriod.start)).toDateString()}
                      </Text>
                    </View>
                    {!isPickerShowFromDate && (
                      <View style={styles.datebtnContainer}>
                        <Button
                          title="From Date"
                          color="#9187E6"
                          onPress={showPickerFromDate}
                        />
                      </View>
                    )}
                    {isPickerShowFromDate && (
                      <DateTimePicker
                        value={new Date(quiz.Basic_Details.TimePeriod.start)}
                        mode={"date"}
                        display={"default"}
                        is24Hour={true}
                        onChange={onChangeFromDate}
                        style={styles.datePickerAndroid}
                      />
                    )}
                    <View style={styles.pickedDateContainer}>
                      <Text style={styles.pickedDate}>
                        {(new Date(quiz.Basic_Details.TimePeriod.end)).toDateString()}
                      </Text>
                    </View>
                    {!isPickerShowToDate && (
                      <View style={styles.datebtnContainer}>
                        <Button
                          title="To Date"
                          color="#9187E6"
                          onPress={showPickerToDate}
                        />
                      </View>
                    )}

                    {isPickerShowToDate && (
                      <DateTimePicker
                        value={new Date(quiz.Basic_Details.TimePeriod.end)}
                        mode={"date"}
                        display={"default"}
                        is24Hour={true}
                        onChange={onChangeToDate}
                        style={styles.datePickerAndroid}
                      />
                    )}
                  </View>
                )}
                <Text style={styles.content}>Enter Quiz Duration</Text>
                <TextInput
                  placeholder="Enter Quiz Duration (in minutes)"
                  onChangeText={onChangeQuizDetails("Time")}
                  value={
                    quiz.Basic_Details.Time === 0
                      ? ""
                      : quiz.Basic_Details.Time.toString()
                  }
                  style={styles.textInputStyling}
                  keyboardType={"numeric"}
                />
                {quizDetailsErrors.Time.length !== 0 && (
                  <Text style={styles.incorrectFeedback}>
                    {quizDetailsErrors.Time}
                  </Text>
                )}
                <Text style={styles.content}>Enter Points Per Question</Text>
                <TextInput
                  placeholder="Enter Points per question"
                  onChangeText={onChangeQuizDetails("pointsPerQuestion")}
                  value={
                    quiz.Basic_Details.pointsPerQuestion === 0
                      ? ""
                      : quiz.Basic_Details.pointsPerQuestion.toString()
                  }
                  style={styles.textInputStyling}
                  keyboardType={"numeric"}
                />
                {quizDetailsErrors.pointsPerQuestion.length !== 0 && (
                  <Text style={styles.incorrectFeedback}>
                    {quizDetailsErrors.pointsPerQuestion}
                  </Text>
                )}
                <Text style={styles.content}>Enter Total Questions</Text>
                <TextInput
                  placeholder="Enter Total Questions"
                  onChangeText={onChangeQuizDetails("No_ofQuestions")}
                  value={
                    quiz.Basic_Details.No_ofQuestions === 0
                      ? ""
                      : quiz.Basic_Details.No_ofQuestions.toString()
                  }
                  style={styles.textInputStyling}
                  keyboardType={"numeric"}
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
                    onPress={onSubmit}
                  >
                    <Text style={styles.btnText}>Save Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
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
    backgroundColor: "#9187E6",
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
    width: "40%",
    height: "100%",
    backgroundColor: "#9187E6",
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
    fontSize: 22,
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
  btnText: {
    color: "white",
    fontFamily: "Montserrat-SemiBold",
    fontSize: 14
  },
  pickerStyle: {
    width: "100%",
    height: 40,
    fontSize: 14,
  },
  pickedDateContainer: {
    padding: 10,
    backgroundColor: "#eee",
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10
  },
  pickedDate: {
    fontSize: 14,
    fontFamily: "Montserrat",
  },
  datebtnContainer: {
    padding: 10,
  },
  datePickerIOS: {
    width: "40%",
    height: 50,
    backgroundColor: "white",
    marginTop: 5,
    marginBottom: 5,
  },
  datePickerAndroid: {
    width: 320,
    height: 260,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  dropdown: {
    height: 50,
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop: 10,
    marginBottom: 10
  },
  placeholderStyle: {
    fontSize: 14,
    fontFamily: "Montserrat",
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  content: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 14
  }
});
export default BasicDetailForm;
