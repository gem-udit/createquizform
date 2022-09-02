import React, { useContext } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from "react-native";
import { QuizContext } from "../../context/QuizContextApi";
let { width, height } = Dimensions.get("window");
const QuizSubmitted = ({ navigation, route }) => {
    const { clearquiz }: any = useContext(QuizContext);
    return (
        <View style={styles.container}>
            <View style={styles.createQuizHeader}>
                <Text style={styles.createQuizTxt}>Gemini Quiz</Text>
            </View>
            <View style={styles.quizConatiner}>
                <View
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        height: "90%",
                    }}
                >
                    <Text style={styles.quizsaved}>Quiz Saved Successfully</Text>
                    <View style={styles.startQuizCnt}>
                        <TouchableOpacity style={styles.back} onPress={() => { clearquiz(); navigation.navigate("BasicDetails") }}>
                            <Text style={styles.startQuizBtn}>Go to Create Quiz Screen</Text>
                        </TouchableOpacity></View>
                </View>

            </View>
        </View>
    )
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
    back: {
        backgroundColor: ""
    },
    startQuizCnt: {
        alignSelf: "center",
        backgroundColor: "transparent",
        alignItems: "center",
        marginTop: height / 85.4,
        width: width,
    },
    startQuizBtn: {
        color: "#FFFFFF",
        borderColor: "#6A5AE1",
        borderWidth: 1,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 8,
        backgroundColor: "#6A5AE1",
        elevation: 11,
        shadowColor: "grey",
        shadowOpacity: 0.84,
        shadowOffset: { width: 4, height: 20 },
        shadowRadius: 34,
        textAlign: "center",
        fontFamily: "Montserrat-SemiBold",
        justifyContent: "center",
    },
    quizsaved: {
        color: "#414254",
        fontSize: 16,
        fontFamily: "Montserrat"
    }
});
export default QuizSubmitted;
