import React, { Component, useState, useEffect, useRef } from 'react';
import { Button, StyleSheet, Text, View, Alert } from 'react-native';
import { registerRootComponent } from 'expo';
import BestGame from "./game";

export default class Game extends React.Component{
    static navigationOptions = {title: 'Game'};
    render(){
        const { navigate, state } =this.props.navigation;
        const createTwoButtonAlert = () =>
          Alert.alert(
            "Are you sure you would like to leave this screen?",
            "Leaving will prevent you from returning to the game.",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => navigate('Questionnaire') }
            ],
            { cancelable: false }
          );
        return(
           <>
            <View style={styles.container}>
                <Text>This is the Game Screen</Text>
                <Button title='Skip Game and Go To Questionnaire' onPress={createTwoButtonAlert}/>
            </View>
            <BestGame />
            </>
        )
    }
}
registerRootComponent(Game);
const styles = StyleSheet.create({
    container: {
      flex: 3,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
