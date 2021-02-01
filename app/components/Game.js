import React, { Component, useState, useEffect, useRef } from 'react';
import { ImageBackground, Image, TouchableOpacity, StyleSheet, Button, Text, View, Alert } from 'react-native';
import { registerRootComponent } from 'expo';
import RNDraw from 'rn-draw'
import Icon from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper'
import { Overlay } from 'react-native-elements';
import {Header} from 'react-native-elements'
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

let customFonts = {
  'NovaSquare': require('../assets/fonts/NovaSquare-Regular.ttf'),
};

const InstructionsOverlay = () => {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleOverlay}>
        <Icon name="question" style= {styles.button}   color = {'white'} size={20}/>
      </TouchableOpacity>

      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <View style={{ height: 300 , width: 300}}>
          <Swiper style={styles.wrapper} showsButtons={false}>
            <View style={styles.slide}>
            <Image source={require("../assets/logo.png")} style={{ height:'30%', width:'40%', marginBottom:30}} />
              <Text style={styles.text}>Welcome to StudyTricks Connect All!</Text>
            </View>
            <View style={styles.slide}>
              <Text style={styles.text}>Start by connecting the highlighted dots by drawing a line between them.</Text>
            </View>
            <View style={styles.slide}>
              <Text style={styles.text}>The line can not touch any other line or dots (excluding the highlighted dots)</Text>
            </View>
            <View style={styles.slide}>
              <Text style={styles.text}>Each dot will be highlighted twice</Text>
            </View>
            <View style={styles.slide}>
              <Text style={styles.text}>To receive the next pair of highlighted dots, press next.</Text>
            </View>
            <View style={styles.slide}>
              <Text style={styles.text}>Good luck and have fun!</Text>
            </View>
          </Swiper>
        </View>
      </Overlay>

    </View>
  );
};

const IntroOverlay = () => {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View>
      <Header
           centerComponent={<TouchableOpacity onPress={toggleOverlay}><Image source={require("../assets/logo.png")} style ={{  resizeMode: 'contain', height:100}}/></TouchableOpacity>}           
           containerStyle={{
             height:95,
             backgroundColor:'transparent',
             borderBottomColor:'transparent'
            }}
          />
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <View style={{ height: 300 , width: 300}}>
          <Swiper style={styles.wrapper} showsButtons={false}>
            <View style={styles.slide}>
              <Text style={styles.text}>Welcome to Study Tricks!</Text>
            </View>
            <View style={styles.slide}>
              <Text style={styles.text}>Do you feel like you can never get yourself to sit down and start doing schoolwork? Our revolutionary method is for you then!</Text>
            </View>
            <View style={styles.slide}>
              <Text style={styles.text}>The way it works is that you first play a game, then start a timed study session. It's like having dessert before dinner, to get you to sit down at the table.</Text>
            </View>
            <View style={styles.slide}>
              <Text style={styles.text}>By setting a clear end to how long you will be studying, and breaking it up into small sections (the Pomodoro method), you won't even notice how much time has passed!</Text>
            </View>
            <View style={styles.slide}>
              <Text style={styles.text}>Click anywhere to start!</Text>
            </View>
          </Swiper>
        </View>
      </Overlay>
    </View>
  );
};

export default class Game extends React.Component{
    static navigationOptions = { headerShown: false ,title: 'Game'};
    state={
    lines:[],
    fontsLoaded: false,
    strikeNum:0};

    async _loadFontsAsync() {
      await Font.loadAsync(customFonts);
      this.setState({ fontsLoaded: true });
    }

    componentDidMount() {
      this._loadFontsAsync();
    }

    rewind=()=>{
      this._undo()
    }
    clear=()=>{
      this._clear()
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



          if (this.state.fontsLoaded) {return(
<>


          <ImageBackground source={require("../assets/background.png")} style={{ resizeMode: 'cover', width: '100%', height: '100%' }}>

          
            <IntroOverlay/>

              <RNDraw
              containerStyle={{
                backgroundColor: 'transparent',
                borderTopColor: 'white',
                borderBottomColor: 'white',
                borderWidth:1,
                }}
                  strokes={[]}
                  rewind={(undo) => {this._undo = undo}}
                  clear={(clear) => {this._clear = clear}}
                  next={(next) => {this._next = next}}
                  color={'white'}
                  strokeWidth={4}
                  onChangeStrokes={(strokes,strikes) => {//this is good for debugging at the front-end
                     // this.state.lines.push(strokes[strokes.length-1].props.d);
                     // console.log(this.state.lines);
                     // if(this.checkLine()){
                     //    console.log("LINES detected");
                     // }
                     this.state.strikeNum=strikes;
                     this.setState({strikeNum:strikes})
                     console.log(this.state.strikeNum);
                  }
               }
                />

<Text style={styles.skipButtonText}>Strikes:{this.state.strikeNum}</Text>
  
            <View style={{ flexDirection: "row" , backgroundColor: "transparent", justifyContent: "space-evenly"}}>
                <TouchableOpacity onPress={this.rewind}>
                  <Icon name="undo" style= {styles.button} color = {'white'} size={20}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.clear}>
                  <Icon name="eraser" style= {styles.button}  color = {'white'} size={20}/>
                </TouchableOpacity>
                <InstructionsOverlay/>
              </View>

              <TouchableOpacity style = {styles.skipButton} onPress={createTwoButtonAlert}>
                <Text style = {styles.skipButtonText}>Move Onto Timer</Text>
              </TouchableOpacity>

</ImageBackground>


</>

)}else {
  return <AppLoading />;
}
    }
}
registerRootComponent(Game);
const styles = StyleSheet.create({
    button:{
      height:30,
      paddingTop:10,
      paddingBottom:30,
      width:'100%',
      justifyContent: "space-evenly"

    },
    skip: {
      alignSelf: 'center',
      marginTop:15,
      backgroundColor: 'white',
      justifyContent: 'center',
      color: 'black'
    },
  wrapper: {},
  slide: {
    flex: 1,
    paddingRight: 18,
    paddingLeft: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#38127a',
  },
  text: {
    fontFamily:'NovaSquare',
    color:'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  skipButton: {
    backgroundColor: '#38127a',
    height: 30,
   borderWidth:1,
   borderColor:'white',
   borderRadius:15,
   width:'40%',
   alignSelf:'center',
   justifyContent:'center',
   margin:5

 },
 skipButtonText:{
   fontFamily:'NovaSquare',
   color:'white',
   fontSize:15,
   justifyContent:'center',
   textAlign:'center'
 },
  });
