import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { appdata } from "../../data/appdata";
import moment from "moment";
import { quizData } from "../../data/quizdata";

const Homescreen = ({ navigation }) => {
  const [currentDate, setCurrentDate] = useState("");
  const [greetings, setGreetings] = useState("");

  useEffect(() => {
    var dateMoment = moment().utcOffset("+05:30").format("dddd, D MMMM");
    setCurrentDate(dateMoment);
    var time = moment().utcOffset("+05:30").format("k");
    {
      time >= "12"
        ? time >= "16"
          ? setGreetings("Good Evening")
          : setGreetings("Good Afternoon")
        : setGreetings("Good Morning");
    }
  });
  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <Text>{currentDate}</Text>
      </View>
      <View style={styles.goodTextContainer}>
        <Text style={styles.goodText}>{greetings}</Text>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.cardHolder}>
          <View style={styles.imgContainer}>
            <Image
              source={require("../../../assets/NEO_logo.png")}
              style={styles.img}
            />
          </View>
          <View style={styles.titleTextContainer}>
            <Text style={styles.titleText}>NEO</Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("AppsListScreen", {
                  details: {
                    data: appdata,
                    title: "NEO Apps",
                    navigate: "AppsDescription",
                    add: "NEOForm",
                  },
                });
              }}
            >
              <Text style={styles.buttonText}>Open</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.secondcardContainer}>
        <View style={styles.cardHolder}>
          <View style={styles.imgContainer}>
            <Image
              source={require("../../../assets/quizlogo.jpg")}
              style={styles.img}
            />
          </View>
          <View style={styles.titleTextContainer}>
            <Text style={styles.titleText}>QUIZ</Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("AppsListScreen", {
                  details: {
                    data: quizData,
                    title: "Quizes",
                    navigate: "QuizDescription",
                    add: "BasicDetails",
                  },
                });
              }}
            >
              <Text style={styles.buttonText}>Open</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.recentlyUpdContainer}>
        <Text style={styles.recentText}>Recent Updates</Text>
      </View>
      <View style={styles.recentListHolder}>
        <FlatList
          contentContainerStyle={{ paddingBottom: 50 }}
          data={appdata.sort((a, b) => b.key - a.key)}
          renderItem={({ item }) => (
            <View style={{ height: 150 }}>
              <View style={styles.recentListContainer}>
                <View style={styles.cardHolder}>
                  <View style={styles.imgContainer}>
                    <Image source={item.source} style={styles.img} />
                  </View>
                  <View style={styles.titleTextContainer}>
                    <Text style={styles.titleText}>{item.name}</Text>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionText}>
                      {item.description == "Grey HR" ? (
                        <>
                          {item.description.length > 85 ? (
                            <>{item.description.substring(0, 85) + "..."}</>
                          ) : (
                            <>{item.description}</>
                          )}
                        </>
                      ) : (
                        <>
                          {item.description.length > 70 ? (
                            <>{item.description.substring(0, 70) + "..."}</>
                          ) : (
                            <>{item.description}</>
                          )}
                        </>
                      )}
                    </Text>
                  </View>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => {}}>
                      <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dateContainer: {
    top: 65,
    left: 28,
    width: 200,
  },
  dateText: {
    fontSize: 11,
    lineHeight: 11,
    fontWeight: "500",
    color: "#AAA9C9",
    fontFamily: "Montserrat",
  },
  goodTextContainer: {
    top: 68,
    left: 27,
  },
  goodText: {
    fontWeight: "600",
    fontSize: 22,
    lineHeight: 25.81,
    color: "#666592",
    fontFamily: "Montserrat-Bold",
  },
  cardContainer: {
    height: 200,
    top: 120,
    left: 26,
    right: 28,
  },
  secondcardContainer: {
    height: 200,
    top: 70,
    left: 26,
    right: 28,
  },
  cardHolder: {
    height: "60%",
    width: "87%",
    borderRadius: 14,
    flexDirection: "row",
    padding: 5,
    borderColor: "#498BEA",
    shadowColor: "rgba(20, 20, 20, 0.02)",
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    backgroundColor: " rgba(255, 255, 255, 0.54)",
    elevation: 2,
    alignItems: "center",
  },
  imgContainer: {
    width: 88,
    height: 88,
    borderRadius: 15,
    justifyContent: "center",
    padding: 13,
    left: 10,
    backgroundColor: "#FFFFFF",
    elevation: 1,
  },
  img: {
    width: 60,
    height: 60,
  },
  titleTextContainer: {
    position: "absolute",
    top: 20,
    left: 122,
    backgroundColor: "#FAFAFB",
  },
  titleText: {
    fontSize: 15,
    fontFamily: "Montserrat-Bold",
    lineHeight: 18.2,
  },
  descriptionContainer: {
    width: 130,
    height: 63,
    position: "absolute",
    top: 48,
    left: 121,
    backgroundColor: "#FAFAFB",
  },
  descriptionText: {
    fontWeight: "300",
    color: "#858C94",
    fontFamily: "Montserrat",
    fontSize: 12,
    lineHeight: 14.3,
    backgroundColor: "#FAFAFB",
  },
  buttonContainer: {
    backgroundColor: "rgba(73, 139, 234, 1)",
    width: 60,
    height: 30,
    borderColor: "rgba(73, 139, 234, 1)",
    position: "absolute",
    borderWidth: 1,
    top: 50,
    left: 265,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  buttonText: {
    color: "white",
    fontFamily: "Montserrat",
    width: 52,
    height: 21,
    fontWeight: "600",
    fontSize: 14,
    flex: 1,
    textAlign: "center",
  },
  recentlyUpdContainer: {
    height: 18,
    top: 25,
    left: 26.5,
    width: 320,
    backgroundColor: "transparent",
  },
  recentText: {
    color: "#666592",
    fontFamily: "Montserrat-Bold",
    fontWeight: "600",
    fontSize: 15,
    lineHeight: 18,
  },
  recentListHolder: {
    top: 40,
    bottom: 0,
  },
  recentListContainer: {
    height: 200,
    top: 10,
    left: 26,
    right: 28,
  },
});

export default Homescreen;
