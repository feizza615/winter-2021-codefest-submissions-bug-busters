import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import useInterval from '@use-it/interval';
import Notification from './Notification';
import SlidingUpPanel from 'rn-sliding-up-panel';
import Checklist from './Checklist';


const NotifyUser=(props)=>{
  if(props.notify==true){
   props.setNotify(false);
   Notification();
  }
 return null;
}

export default class Timer extends React.Component{
    static navigationOptions = {title: 'Timer'};
    render(){

      const { navigate, state } =this.props.navigation;
      //let listoftimes=state.params.listoftimes.map(min=>min*60)//mins to seconds
      let listoftimes = [10,20,10,10]
      let sum = listoftimes.reduce(
        ( accumulator, currentValue ) => accumulator + currentValue
      ,0)
      let end= Date.now()+sum*1000 //this doesn't work
      return(
        <View style={styles.container}>
        <Text> Study session until {end.toLocaleString()} </Text>
        <NewTimer listoftimes={listoftimes}/>
        <Button title='Show panel' onPress={() => this._panel.show()} />
        <SlidingUpPanel ref={c => this._panel = c}>
          <View style={styles.container}>
            <Checklist/>
            <Button title='Hide' onPress={() => this._panel.hide()} />
          </View>
        </SlidingUpPanel>
        <StatusBar style="auto" />
        </View>
      )
    }
}


const NewTimer =(props)=>{
  const [buttonClicked, setButtonClicked] = useState(false);
  const [timeAlert, setTimeAlert]= useState("Hasn't Started");
  const [i, setI]=useState(0) //counter of listoftimes
  const [seconds,setSeconds]=useState(props.listoftimes[i])
  const [notify, setNotify]=useState(false)

  useInterval(()=>{
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
      <NotifyUser notify={notify} setNotify={setNotify}/>
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
  });
