import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default class Timer extends React.Component{
    static navigationOptions = {title: 'Timer'};
    render(){
      const { navigate, state } =this.props.navigation;
      let listoftimes=state.params.listoftimes.map(min=>min*60)
      let end= Date.now()// +sum*60*1000 //insert func that gets end of array
      return(
        <View style={styles.container}>
        <Text> Study session until {end.toLocaleString()} </Text>
        <NewTimer listoftimes={listoftimes}/>
        <Button
           title= "Before you start, make a to do list!"
           onPress={() => navigate('Checklist')}

       />
        <StatusBar style="auto" />
        </View>
      )
    }
}


const NewTimer =(props)=>{
  let timertext = "  "
  const [buttonClicked, setButtonClicked] = useState(false);
  const [timeLeft, setTimeLeft]= useState(timertext); //initializes timer text


  let i=0 //counter of number of sessions
  let seconds= props.listoftimes[i]//time left on timer in seconds

  useEffect(()=>{ let x = setInterval(()=>{ //function that repeats every second
        if (buttonClicked){
          if (seconds<0){ //when timer ends
              if (i== props.listoftimes.length-1){
                clearInterval(x);//not sure if this needs to be here
                timertext="done";
              }
              else{ //when switching to next chunk of time
                i++;
                seconds= props.listoftimes[i]; //resets timer
                timertext="switch what you are doing";
                //insert push notification here
              }
            }
          else{ //normal timer running
            timertext=timeLeftCalculator(seconds);
          }
          seconds --
        }
        else if (timertext=="Hasn't Started"){
          timertext=" " //this is easier than making it say "Paused"
        }
        setTimeLeft(timertext);
      },1000); //the 1000 is what makes it repeat every second
    return () => clearInterval(x);},[buttonClicked]);

  return(
    <>
      <Button
        onPress={()=>{
          setButtonClicked(!buttonClicked);
        }}
        disabled{buttonClicked}
        title={buttonClicked ? "Pause" : "Start"}
      />
      <Text>{timeLeft} ShouldStart: {buttonClicked.toString()}</Text>
    </>
  )
}

const ProgressBar=(props)=>{
  const [numSections, setNumSections]= useState(0); //initializes timer text
  return(
    <Text>{numSections} done! </Text>
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
