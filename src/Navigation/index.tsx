// import { createStackNavigator } from "@react-navigation/stack";
import BasicDetailsForm from "../screens/components/BasicDetailsForm";
import QuestionareForm from "../screens/components/QuestionareForm";
import QuizDetails from "../screens/components/QuizDetails";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateQuizForm from "../screens/CreateQuizForm";
import QuizSubmitted from "../screens/components/quizSubmitted";
const Stack = createNativeStackNavigator();

function Navigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="BasicDetails"
                component={BasicDetailsForm}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Questions"
                component={QuestionareForm}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="quizDetails"
                component={QuizDetails}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="quizSubmitted"
                component={QuizSubmitted}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default Navigation;