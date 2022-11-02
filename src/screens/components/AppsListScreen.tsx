import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React from "react";

const AppsListScreen = ({ route, navigation }) => {
  const { details } = route.params;
  return (
    <View style={styles.pageContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.arrowImg}>
          <TouchableOpacity
            style={styles.backbtnContainer}
            onPress={() => navigation.navigate("Homescreen")}
          >
            <Image
              source={require("../../../assets/arrow.png")}
              style={{ top: 1 }}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerTitleText}>{details.title}</Text>
      </View>
      <View>
        <FlatList
          contentContainerStyle={{ paddingBottom: 50 }}
          data={details.data.sort((a, b) => a.key - b.key)}
          renderItem={({ item }) => (
            <View style={{ height: 150 }}>
              <View style={styles.neoAppsContainer}>
                <View style={styles.neoAppscardHolder}>
                  <View style={styles.neoAppsimgContainer}>
                    <Image source={item.source} style={styles.neoAppsimg} />
                  </View>
                  <View style={styles.neoAppstitleTextContainer}>
                    <Text style={styles.neoAppstitleText}>{item.name}</Text>
                  </View>
                  <View style={styles.neoAppsdescriptionContainer}>
                    <Text style={styles.neoAppsdescriptionText}>
                      {item.description == "Grey HR" ? (
                        <>
                          {item.description.length > 55 ? (
                            <>{item.description.substring(0, 55) + "..."}</>
                          ) : (
                            <>{item.description}</>
                          )}
                        </>
                      ) : (
                        <>
                          {item.description.length > 55 ? (
                            <>{item.description.substring(0, 55) + "..."}</>
                          ) : (
                            <>{item.description}</>
                          )}
                        </>
                      )}
                    </Text>
                  </View>
                  <View style={styles.neoAppsbtnContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate(details.navigate);
                      }}
                    >
                      <Text style={styles.neoAppsbtnText}>Edit</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(details.add);
        }}
        style={styles.floatingBtnContainer}
      >
        <Text style={styles.floatingbtnText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AppsListScreen;

const styles = StyleSheet.create({
  pageContainer: { flex: 1, top: 20 },
  headerContainer: {
    width: "100%",
    height: 50,
    top: 30,
    marginBottom: 20,
    alignSelf: "center",
  },
  backbtnContainer: {
    width: 35,
    height: 30,
    alignContent: "center",
    alignItems: "center",
  },
  headerTitleText: {
    alignSelf: "center",
    bottom: "50%",
    fontSize: 18,
    fontFamily: "Montserrat-Bold",
  },
  arrowImg: {
    width: 44,
    height: 20,
    left: 20,
    alignItems: "center",
    zIndex: 1,
    backgroundColor: "transparent",
  },

  neoAppsContainer: {
    height: 200,
    top: 10,
    left: 26,
    right: 28,
  },
  neoAppscardHolder: {
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
  neoAppsimgContainer: {
    width: 88,
    height: 88,
    borderRadius: 15,
    justifyContent: "center",
    padding: 13,
    left: 10,
    backgroundColor: "#FFFFFF",
    elevation: 1,
  },
  neoAppsimg: {
    width: 60,
    height: 60,
  },
  neoAppstitleTextContainer: {
    position: "absolute",
    top: 20,
    left: 122,
    backgroundColor: "#FAFAFB",
  },
  neoAppstitleText: {
    fontSize: 15,
    fontFamily: "Montserrat-Bold",
    lineHeight: 18.2,
  },
  neoAppsdescriptionContainer: {
    width: 130,
    height: 63,
    position: "absolute",
    top: 48,
    left: 121,
    backgroundColor: "#FAFAFB",
  },
  neoAppsdescriptionText: {
    fontWeight: "300",
    color: "#858C94",
    fontFamily: "Montserrat",
    fontSize: 12,
    lineHeight: 14.3,
    backgroundColor: "#FAFAFB",
  },
  neoAppsbtnContainer: {
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
  neoAppsbtnText: {
    color: "white",
    fontFamily: "Montserrat",
    width: 52,
    height: 21,
    fontWeight: "600",
    fontSize: 14,
    flex: 1,
    textAlign: "center",
  },
  floatingBtnContainer: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    position: "absolute",
    bottom: "5%",
    right: "5%",
    height: 60,
    backgroundColor: "#38a3a5",
    borderRadius: 100,
  },
  floatingbtnText: { fontSize: 30, color: "#fff" },
});
