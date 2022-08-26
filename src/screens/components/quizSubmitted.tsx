import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

const QuizSubmitted = ({ navigation, route }) => {
    return (
        <View style={styles.container}>
            <View style={styles.createQuizHeader}>
                <Text style={styles.createQuizTxt}>Create Quiz</Text>
            </View>
            <View style={styles.quizConatiner}>
                <View
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        height: "90%",
                    }}
                >
                    <Text>Quiz Saved Successfully</Text>
                    <TouchableOpacity onPress={() => { navigation.navigate("BasicDetails") }}>
                        <Text>Back to Basic Create Quiz page</Text>
                    </TouchableOpacity>
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
});
export default QuizSubmitted;
