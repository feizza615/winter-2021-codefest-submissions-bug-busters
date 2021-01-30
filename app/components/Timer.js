import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { ImageBackground,Image, LogBox, Button, TouchableOpacity, StyleSheet, Text, View, Alert, Animated } from 'react-native';
import useInterval from '@use-it/interval';
import Notification from './Notification';
import SlidingUpPanel from 'rn-sliding-up-panel';
import Checklist from './Checklist';
import GamePanel from './GamePanel';
import { Overlay } from 'react-native-elements';
import {Header} from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons'
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

LogBox.ignoreAllLogs();

let customFonts = {
  'NovaSquare': require('../assets/fonts/NovaSquare-Regular.ttf'),
};
const animatedValue1 = new Animated.Value(0);

export default class Timer extends React.Component{
  static navigationOptions = {title: 'Timer',headerShown: false , headerLeft:()=> null};
  state= {fontsLoaded: false}
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }
    
  render(){
    const createTwoButtonAlert = () =>
      Alert.alert(
        "Are you sure you would like to leave?",
        "Leaving will reset everything",
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
    const { navigate, state } =this.props.navigation;
    let listoftimes=state.params.listoftimes.map(min=>min*60)//mins to seconds
    let sum = listoftimes.reduce(
      ( accumulator, currentValue ) => accumulator + currentValue
    ,0)
    let end= Date.now()+sum*1000 //this doesn't work

    if (this.state.fontsLoaded) {return(
        <>
          <ImageBackground source={require("../assets/background.png")} style={{ resizeMode: 'cover', width: '100%', height: '100%' }}>
        <Header
        centerComponent={<Image source={require("../assets/logo.png")} style={{ height:'90%', width:'40%'}} />}
        leftComponent={
        <TouchableOpacity onPress={createTwoButtonAlert}>
            <Icon
            size={30}
            color={'white'}
            name={'arrow-back-ios'}
            style={{paddingLeft:5, paddingTop:15}}
          />
        </TouchableOpacity>} containerStyle={{
          height:95,
          backgroundColor:'transparent',
          borderBottomColor:'transparent'
          }}
        />
          <Text> Study session until {end.toLocaleString()} </Text>
          <NewTimer listoftimes={listoftimes}/>
          <TouchableOpacity onPress={() => this._firstPanel.show()}><Text>Open First Panel</Text></TouchableOpacity>

          <SlidingUpPanel
            draggableRange={{ top: 600, bottom: 0 }} ref={(c) => this._firstPanel = c} animatedValue={animatedValue1}>
            <View style={styles.slidingPanelContainer}>
              <Checklist/>
            </View>
          </SlidingUpPanel>
          </ImageBackground>
        </>
      )}else{
        return <AppLoading />;
      }
      
      
    }
}

const NewTimer =(props)=>{
  const [buttonClicked, setButtonClicked] = useState(false);
  const [timeAlert, setTimeAlert]= useState("Hasn't Started");
  const [i, setI]=useState(0) //counter of listoftimes
  const [seconds,setSeconds]=useState(props.listoftimes[i])
  const [notify, setNotify]=useState(false)
  const [gameOn, setGame] =useState(false)
  const [visible, setVisible] = useState(false);

  //This function triggers a notification:
  const NotifyUser=()=>{
    if(notify==true){
      setNotify(false);
      Notification();
    }
   return null;
  }

  //This function disables and enables the button for the game panel:
  const DisplayGame=()=>{
    if(i%2==0){
      setGame(true);
      setVisible(false)
      
    }
    else if(i%2==1){
      setGame(false);
   
      
    }
    return null;
  }
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  useInterval(()=>{
    DisplayGame()
    if (!buttonClicked) return
    if(seconds>1){ //regular timer operations
      setSeconds(seconds-1)
      setTimeAlert((i%2) ? "take a break"  : "do work!")
      return
    }
    if (i=== props.listoftimes.length-1){ //if end of timer
      setTimeAlert("done")
      setButtonClicked(false)
      //maybe clearInterval?
    }
    else{ //when switching to next timer HERERERER
      setNotify(true)
      setSeconds(props.listoftimes[i+1])
      setI(i+1)
    }

  },1000)//makes it run every second

  return(
<>  

      <NotifyUser/>
      <Button
        onPress={()=>{
          setButtonClicked(!buttonClicked);
        }}
        //disabled={buttonClicked}
        title={buttonClicked ? "Pause" : "Start"}
      />
      <Text>{timeLeftCalculator(seconds)} </Text>
      <Text>{timeAlert} </Text>
      <ProgressBar i={i}/>
      <View>
      <TouchableOpacity disabled={gameOn} onPress={toggleOverlay}>
        <Text>Game Panel</Text>
      </TouchableOpacity>

      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <View style={{ height: 300 , width: 300}}>
          <GamePanel/>
        </View>
      </Overlay>

    </View>


 </>
  )

}

const ProgressBar=(props)=>{
  return(
    <Text>{props.i} sections done! (baby progress bar)</Text>
  )
}

function timeLeftCalculator(seconds){
  let days = Math.floor(seconds / ( 60 * 60 * 24));
  let hours = Math.floor((seconds % (60 * 60 * 24)) / ( 60 * 60));
  let minutes = Math.floor((seconds % ( 60 * 60)) / 60);
  let secs = Math.floor(seconds % 60 );
  let timertext=days + "d " + hours + "h " + minutes + "m " + secs + "s "
  return timertext;
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    slidingPanelContainer: {
      flex: 1,
      backgroundColor: '#FFF',
      alignItems: 'center',
    }
  });
