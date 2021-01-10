import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default class Timer extends React.Component{
    static navigationOptions = {title: 'Timer'};
    state={
      buttonclicked: false
    }
    render(){
    var newtime1 = new Date("Jan 4, 2021 21:00:00"); //9pm today
    const { navigate, state } =this.props.navigation;
    var startTimer = false; //for connecting button

    return (
      <View style={styles.container}>
        <Text> Timer from now to {newtime1.toLocaleString()} </Text>
        <Button
          onPress={()=>{
            this.setState({ buttonclicked: true });
            startTimer=true;
          }}
          disabled={this.state.buttonclicked}
          title={this.state.buttonclicked ? "happy studying:)" : "Click to start"}
        />
        <NewTimer newtime={state.params.listoftimes} startTimer={true}/>
        <Button
           title= "Before you start, make a to do list!"
           onPress={() => navigate('Checklist')}

       />
        <StatusBar style="auto" />
      </View>
    );}
}

const NewTimer =(props)=>{
  var timertext = "Hasn't Started"
  const [timeLeft, setTimeLeft]= useState(timertext); //initializes timer text
  var i=0 //counter of number of sessions
  var seconds= props.newtime[i]*60 //time left on timer in seconds
  useEffect(()=>{
      var x = setInterval(()=>{ //function that repeats every second
        if (props.startTimer) {
          seconds--;
          timertext=timeLeftCalculator(seconds);
        }
        else{
          timertext="Paused";
        }

        if (seconds<0){ //when timer ends
            if (i== props.newtime.length-1){
              clearInterval(x);//not sure if this needs to be here
              timertext="done";
            }
            else{
              i++;
              seconds= props.newtime[i]*60; //resets timer
              timertext="switch what you are doing";
              //insert push notification here
            }
        }
        setTimeLeft(timertext);
      },1000); //the 1000 is what makes it repeat every second
    return () => clearInterval(x);
  },[]);
  return(
      <Text>{timeLeft}</Text>
  )
}

function timeLeftCalculator(seconds){
  var days = Math.floor(seconds / ( 60 * 60 * 24));
  var hours = Math.floor((seconds % (60 * 60 * 24)) / ( 60 * 60));
  var minutes = Math.floor((seconds % ( 60 * 60)) / 60);
  var secs = Math.floor(seconds % 60 );
  var timertext=days + "d " + hours + "h " + minutes + "m " + secs + "s "
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
