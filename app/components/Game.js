import React, { Component, useState, useEffect, useRef } from 'react';
import { TouchableOpacity, StyleSheet, Button, Text, View, Alert } from 'react-native';
import { registerRootComponent } from 'expo';
import RNDraw from 'rn-draw'
import Icon from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper'
import { Overlay } from 'react-native-elements';

const OverlayExample = () => {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleOverlay}>
        <Icon name="question" style= {styles.button}  size={50}/>
      </TouchableOpacity>

      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <View style={{ height: 300 , width: 300}}>
          <Swiper style={styles.wrapper} showsButtons={false}>
            <View style={styles.slide}>
              <Text style={styles.text}>Welcome to Connect All!</Text>
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
export default class Game extends React.Component{
    static navigationOptions = { headerShown: false ,title: 'Game'};
    // state={
    //   lines:[]};
    rewind=()=>{
      this._undo()
    }
    clear=()=>{
      this._clear()
    }

    //new
    //next=()=>{
      //this.next()
      //console.log("next");
    //}

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

           <View style={{flex: 1, backgroundColor:"white"}}>


            <View style={{height: 520, borderBottomWidth:2,  borderTopWidth: 2,  }}>
              <RNDraw
              containerStyle={{
                backgroundColor: '#FFF',
                width: 400,
                height: 400,
                }}

                  strokes={[]}
                  containerStyle={{backgroundColor: 'white'}}
                  rewind={(undo) => {this._undo = undo}}
                  clear={(clear) => {this._clear = clear}}
                  next={(next) => {this._next = next}}
                  color={'#000000'}
                  strokeWidth={4}
                  onChangeStrokes={(strokes) => {//this is good for debugging at the front-end
                     // this.state.lines.push(strokes[strokes.length-1].props.d);
                     // console.log(this.state.lines);
                     // if(this.checkLine()){
                     //    console.log("LINES detected");
                     // }
                  }
               }
                />
            </View>


            <View style={{ flexDirection: "row" , backgroundColor: "white", justifyContent: "space-evenly"}}>
                <TouchableOpacity onPress={this.rewind}>
                  <Icon name="undo" style= {styles.button} size={50}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.clear}>
                  <Icon name="forward" style= {styles.button}  size={50}/>
                </TouchableOpacity>
                <OverlayExample/>
              </View>


              <View style={styles.skip}>
                  <Button color="black" title='Skip Game' onPress={createTwoButtonAlert}/>
              </View>

            </View>


        )
    }
}
registerRootComponent(Game);
const styles = StyleSheet.create({
    button:{
      height:100,
      paddingTop:30,
      paddingBottom:30,
      width:50,
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
    backgroundColor: 'white'
  },
  text: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold'
  }
  });
