import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { ImageBackground,Image, LogBox, Button, TouchableOpacity, StyleSheet, Text, View, Alert, Animated } from 'react-native';
import useInterval from '@use-it/interval';
import Notification from './Notification';
import SlidingUpPanel from 'rn-sliding-up-panel';
import Checklist from './Checklist';
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
  state= {
    fontsLoaded: false,
    openended: false
  }
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
    if (state.params.listoftimes == [-5]){ //NEW
      this.setState({openended:true})
    }
    else{
      let listoftimes=state.params.listoftimes.map(min=>min*60)//mins to seconds
    }//NEW
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
            style={{paddingLeft:5, paddingTop:7}}
          />
        </TouchableOpacity>} containerStyle={{
          height:95,
          backgroundColor:'transparent',
          borderBottomColor:'transparent'
          }}
        />
          {/*<Text> Study session until {end.toLocaleString()} </Text>*/}
          {this.state.openended? <Openended/>: <NewTimer listoftimes={listoftimes}/>} {/*new*/}

          <TouchableOpacity style = {styles.startButton} onPress={() => this._firstPanel.show()}>
            <Text style = {styles.startButtonText}>View Check List</Text>
          </TouchableOpacity>

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
  const [timeAlert, setTimeAlert]= useState("Start Timer to Begin");
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

  useInterval(()=>{
    if (!buttonClicked) return
    if(seconds>1){ //regular timer operations
      setSeconds(seconds-1)
      setTimeAlert((i%2) ? "Take a Break!"  : "Study Session Has Started")
      return
    }
    if (i=== props.listoftimes.length-1){ //if end of timer
      setTimeAlert("Done!")
      setButtonClicked(false)
      setSeconds(0)
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
      <View style={{justifyContent:"center"}}>
        <Text style={styles.timerText}>{timeLeftCalculator(seconds)} </Text>
        <Text style={styles.statusText}>{timeAlert} </Text>
        <TouchableOpacity style = {styles.startButton} onPress={()=>{setButtonClicked(!buttonClicked);}}>
          <Text style = {styles.startButtonText}>{buttonClicked ? "Pause" : "Start"}</Text>
        </TouchableOpacity>
      {/*<ProgressBar i={i}/>*/}
    </View>
 </>
  )
}

const Openended =()=>{
  const [buttonClicked, setButtonClicked] = useState(false);
  const [timeAlert, setTimeAlert]= useState("Start Timer to Begin");
  const [i, setI]=useState(0) //counter of listoftimes
  const [seconds,setSeconds]=useState(1200)
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

  useInterval(()=>{
    if (!buttonClicked) return
    if(seconds>1){ //regular timer operations
      setSeconds(seconds-1)
      setTimeAlert((i%2) ? "Take a Break!"  : "Study Session Has Started")
      return
    }
    if (i=== props.listoftimes.length-1){ //if end of timer
      setTimeAlert("Done!")
      setButtonClicked(false)
      setSeconds(0)
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
      <View style={{justifyContent:"center"}}>
        <Text style={styles.timerText}>{timeLeftCalculator(seconds)} </Text>
        <Text style={styles.statusText}>{timeAlert} </Text>
        <TouchableOpacity style = {styles.startButton} onPress={()=>{setButtonClicked(!buttonClicked);}}>
          <Text style = {styles.startButtonText}>{buttonClicked ? "Pause" : "Start"}</Text>
        </TouchableOpacity>
      {/*<ProgressBar i={i}/>*/}
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
    timerText: {
      fontFamily:'NovaSquare',
      color:'white',
      fontSize:40,
      fontWeight: 'bold',
      textAlign:'center',
      paddingVertical:45
    },
    statusText: {
      fontFamily:'NovaSquare',
      color:'white',
      fontSize:25,
      fontWeight: 'bold',
      textAlign:'center',
      paddingVertical:20,
      paddingBottom:60

    },
    startButtonText:{
      fontFamily:'NovaSquare',
      color:'white',
      fontSize:25,
      justifyContent:'center',
      textAlign:'center',


    },
    startButton: {
      marginVertical:10,
      backgroundColor: '#38127a',
      height: 60,
     borderWidth:1,
     borderColor:'white',
     borderRadius:15,
     width:'60%',
     alignSelf:'center',
     justifyContent:'center',

   },
    slidingPanelContainer: {
      flex: 1,
      backgroundColor: '#FFF',
      alignItems: 'center',
    }
  });
