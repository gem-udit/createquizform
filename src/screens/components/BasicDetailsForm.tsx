import React, { useContext, useEffect, useState } from "react";
import { QuizContext } from "../../context/QuizContextApi";
import Dropdown from "react-native-element-dropdown/src/components/Dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useFocusEffect } from "@react-navigation/native";
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
import Navigation from "../../Navigation";
const BasicDetailForm = ({ navigation }) => {
  const [isPickerShowFromDate, setIsPickerShowFromDate] = useState(false);
  const [isPickerShowToDate, setIsPickerShowToDate] = useState(false);
  const [fromDate, setFromDate] = useState(new Date(Date.now()));
  const [toDate, setToDate] = useState(new Date(Date.now()));

  const showPickerFromDate = () => {
    setIsPickerShowFromDate(true);
  };
  const showPickerToDate = () => {
    setIsPickerShowToDate(true);
  };

  const onChangeFromDate = (event: any, value: Date) => {
    setFromDate(value);
    if (Platform.OS === "android") {
      setIsPickerShowFromDate(false);
    }
    console.log(value)
  };
  const onChangeToDate = (event: any, value: Date) => {
    setToDate(value);
    if (Platform.OS === "android") {
      setIsPickerShowToDate(false);
    }
    console.log(value)
  };
  // useFocusEffect(() => {
  //   React.useCallback(() => {
  //     setQuizDetails
  //     //   Id: quiz.Basic_Details.Id,
  //     //   No_ofQuestions: quiz.Basic_Details.No_ofQuestions === 0 ? "" : quiz.Basic_Details.No_ofQuestions.toString(),
  //     //   category: quiz.Basic_Details.category,
  //     //   quizName: quiz.Basic_Details.quizName,
  //     //   Time: quiz.Basic_Details.Time === 0 ? "" : quiz.Basic_Details.Time.toString(),
  //     //   TimePeriod: {
  //     //     start: new Date(),
  //     //     end: new Date(),
  //     //   },
  //     //   pointsPerQuestion: quiz.Basic_Details.pointsPerQuestion === 0 ? "" : quiz.Basic_Details.pointsPerQuestion.toString(),
  //     //   logoUrl: quiz.Basic_Details.logoUrl,
  //     // })
  //   }, [])
  // })
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused.
      alert('Home Screen was focused');
      setQuizDetails({
        Id: quiz.Basic_Details.Id,
        No_ofQuestions: quiz.Basic_Details.No_ofQuestions === 0 ? "" : quiz.Basic_Details.No_ofQuestions.toString(),
        category: quiz.Basic_Details.category,
        quizName: quiz.Basic_Details.quizName,
        Time: quiz.Basic_Details.Time === 0 ? "" : quiz.Basic_Details.Time.toString(),
        TimePeriod: {
          start: new Date(),
          end: new Date(),
        },
        pointsPerQuestion: quiz.Basic_Details.pointsPerQuestion === 0 ? "" : quiz.Basic_Details.pointsPerQuestion.toString(),
        logoUrl: quiz.Basic_Details.logoUrl,
      })
      return () => {
        // Do something when the screen is unfocused
        alert('Home Screen was unfocused');
      };
    }, [])
  );
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
  const [isFocus, setIsFocus] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [saveLogoBtnClicked, setSaveLogoBtnClicked] = useState(false);
  const [saveLogoBtnClickedError, setSaveLogoBtnClickedError] = useState("");
  let { submitQuizDetails, quiz }: any = useContext(QuizContext);
  const integerRegExp = RegExp(/^[0-9]+$/);
  const [quizDetails, setQuizDetails] = useState({
    //   Id: quizDetailsProp.Id,
    //   No_ofQuestions: quizDetailsProp.No_ofQuestions,
    //   quizName: quizDetailsProp.quizName,
    //   Time: quizDetailsProp.Time,
    //   TimePeriod: quizDetailsProp.TimePeriod,
    //   category: quizDetailsProp.category,
    //   pointsPerQuestion: quizDetailsProp.pointsPerQuestion,
    //   logoUrl: quizDetailsProp.logoUrl,
    // });
    Id: quiz.Basic_Details.Id,
    No_ofQuestions: quiz.Basic_Details.No_ofQuestions === 0 ? "" : quiz.Basic_Details.No_ofQuestions.toString(),
    category: quiz.Basic_Details.category,
    quizName: quiz.Basic_Details.quizName,
    Time: quiz.Basic_Details.Time === 0 ? "" : quiz.Basic_Details.Time.toString(),
    TimePeriod: {
      start: new Date(),
      end: new Date(),
    },
    pointsPerQuestion: quiz.Basic_Details.pointsPerQuestion === 0 ? "" : quiz.Basic_Details.pointsPerQuestion.toString(),
    logoUrl: quiz.Basic_Details.logoUrl,
  });

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
    if (name === "category") {
      setQuizDetails({
        ...quizDetails,
        [name]: fieldData.value,
      });
    } else {
      setQuizDetails({
        ...quizDetails,
        [name]: fieldData,
      });
    }
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
    }
    setQuizDetailsErrors({
      ...quizDetailsErrors,
      logoUrl: "",
    });
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
        console.log(error);
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
  const onSubmit = (): void => {
    let quizInfoErrors = quizDetailsErrors;
    let isQuizDetailsValid = true;
    if (!saveLogoBtnClicked && quiz.Basic_Details.logoUrl === "") {
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
      TimePeriod: quizInfoErrors.TimePeriod,
      pointsPerQuestion: quizInfoErrors.pointsPerQuestion,
      logoUrl: quizInfoErrors.logoUrl,
      category: quizInfoErrors.category,
    });
    if (isQuizDetailsValid) {
      submitQuizDetails(quizDetails);
      setQuizDetails({
        Id: "",
        No_ofQuestions: "",
        quizName: "",
        Time: "",
        TimePeriod: {
          start: new Date(),
          end: new Date(),
        },
        pointsPerQuestion: "",
        logoUrl: "",
        category: "",
      });
      navigation.navigate("Questions", {
        quesAns: {
          Ques: "",
          CorrectAns: "",
        },
        incorrectAns: {
          option1: "",
          option2: "",
          option3: "",
        },
      })
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.createQuizHeader}>
        <Text style={styles.createQuizTxt}>Create Quiz</Text>
      </View>
      <ScrollView>
        <View style={styles.quizConatiner}>
          <View style={styles.quizSmallContainer}>
            <View style={styles.quizCard}>
              <View style={styles.quizCardTextContainer}>
                <Text style={styles.quizCardText}>Fill Quiz Basic Details</Text>
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
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  data={categories}
                  value={quizDetails.category}
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
                      value={fromDate}
                      mode={"date"}
                      display={"default"}
                      onChange={onChangeFromDate}
                      style={styles.datePickerIOS}
                    />
                    <Text>Select expiry date of quiz (Touch Below)</Text>
                    <DateTimePicker
                      value={toDate}
                      mode={"date"}
                      display={"compact"}
                      onChange={onChangeToDate}
                      style={styles.datePickerIOS}
                    />
                  </View>
                )}
                {Platform.OS !== "ios" && <Text>Enter Quiz Time Period</Text>}
                {Platform.OS !== "ios" && (
                  <View>
                    <View style={styles.pickedDateContainer}>
                      <Text style={styles.pickedDate}>
                        {fromDate.toDateString()}
                      </Text>
                    </View>
                    {!isPickerShowFromDate && (
                      <View style={styles.datebtnContainer}>
                        <Button
                          title="From Date"
                          color="purple"
                          onPress={showPickerFromDate}
                        />
                      </View>
                    )}
                    {isPickerShowFromDate && (
                      <DateTimePicker
                        value={fromDate}
                        mode={"date"}
                        display={"default"}
                        is24Hour={true}
                        onChange={onChangeFromDate}
                        style={styles.datePickerAndroid}
                      />
                    )}
                    <View style={styles.pickedDateContainer}>
                      <Text style={styles.pickedDate}>
                        {toDate.toDateString()}
                      </Text>
                    </View>
                    {!isPickerShowToDate && (
                      <View style={styles.datebtnContainer}>
                        <Button
                          title="To Date"
                          color="purple"
                          onPress={showPickerToDate}
                        />
                      </View>
                    )}

                    {isPickerShowToDate && (
                      <DateTimePicker
                        value={toDate}
                        mode={"date"}
                        display={"default"}
                        is24Hour={true}
                        onChange={onChangeToDate}
                        style={styles.datePickerAndroid}
                      />
                    )}
                  </View>
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
  btnText: {
    color: "white",
    fontWeight: "bold",
  },
  pickerStyle: {
    width: "100%",
    height: 40,
    fontSize: 14,
  },
  pickedDateContainer: {
    padding: 20,
    backgroundColor: "#eee",
    borderRadius: 10,
  },
  pickedDate: {
    fontSize: 18,
    color: "black",
  },
  datebtnContainer: {
    padding: 30,
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
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
export default BasicDetailForm;
