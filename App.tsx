import * as React from 'react';
import Navigation from "./src/Navigation";
import { NavigationContainer } from "@react-navigation/native";
import { QuizState } from './src/context/QuizContextApi';
import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NavigationContainer>
        <QuizState>
          <Navigation /></QuizState>
      </NavigationContainer>
    );
  }
}