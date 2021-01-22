import React, { Component, useState, useEffect, useRef } from 'react';
import { TouchableOpacity, Button, StyleSheet, Text, View, Alert } from 'react-native';
import { registerRootComponent } from 'expo';
import BestGame from "./game";
import RNDraw from 'rn-draw'

export default class Game extends React.Component{
    static navigationOptions = {title: 'Game'};
    rewind=()=>{
      this._undo()
    }

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
           <View style={{ width: 400, height: 400 }}>
           <RNDraw
           containerStyle={{
            backgroundColor: '#FFF',
            width: 400,
            height: 400,
            }}
              strokes={[]}
              containerStyle={{backgroundColor: 'rgba(0,0,0,0.01)'}}
              rewind={(undo) => {this._undo = undo}}
              clear={(clear) => {this._clear = clear}}
              color={'#000000'}
              strokeWidth={4}
              onChangeStrokes={(strokes) => console.log(strokes)}
            />
            </View>
              <TouchableOpacity
              onPress={this.rewind}
            >
              <Text >Rewind</Text>
            </TouchableOpacity>
            <View style={styles.container}>
                <Text>This is the Game Screen</Text>
                <Button title='Skip Game and Go To Questionnaire' onPress={createTwoButtonAlert}/>
            </View>
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
