import React, {useState, useEffect} from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Timer from "./components/Timer"
import Questionnaire from "./components/Questionnaire"
import Checklist from "./components/Checklist"


const Stack = createStackNavigator({
  Questionnaire: { screen: Questionnaire},
  Timer: { screen: Timer },
  Checklist: {screen: Checklist}
});

const App = createAppContainer(Stack);
export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
