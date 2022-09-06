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
                <Text allowFontScaling={false} style={styles.createQuizTxt}>Gemini Quiz</Text>
            </View>
            <View style={styles.quizContainer}>
                <View
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        height: "90%",
                    }}
                >
                    <Text allowFontScaling={false} style={styles.quizsaved}>Quiz Saved Successfully</Text>
                    <View>
                        <TouchableOpacity style={styles.back} onPress={() => { clearquiz(); navigation.navigate("BasicDetails") }}>
                            <Text allowFontScaling={false} style={styles.startQuizBtn}>Go to Create Quiz Screen</Text>
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
    quizContainer: {
        alignItems: "center",
    },
    back: {
        width: 240,
        height: 50,
        backgroundColor: "#9187E6",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginTop: 15,
    },
    startQuizBtn: {
        color: "#FFFFFF",
        fontFamily: "Montserrat-SemiBold",
        fontSize: 14
    },
    quizsaved: {
        color: "#414254",
        fontSize: 16,
        fontFamily: "Montserrat"
    }
});
export default QuizSubmitted;
