import * as React from 'react';
import Navigation from "./src/Navigation";
import { NavigationContainer } from "@react-navigation/native";
import { QuizState } from './src/context/QuizContextApi';
export default function App() {
  return (
    <NavigationContainer>
      <QuizState>
        <Navigation /></QuizState>
    </NavigationContainer>
  );
}
