import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default class Detail extends React.Component{
    static navigationOptions = {title: 'Timer'};

    render(){const NewTimer =(props)=>{
    const [timeLeft, setTimeLeft]= useState("Hasn't started"); //initializes timer text
    var i=0 //counter of number of sessions
    var then= props.newtime[i]*60*1000+Date.now() //finds end of first timer time (in milliseconds)
    useEffect(()=>{ //function that repeats every second
        var x = setInterval(()=>{ //calculates how much time is left

        var now = new Date().getTime();
        var difference = then-now;

        var days = Math.floor(difference / (1000 * 60 * 60 * 24));
        var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft(days + "d " + hours + "h " + minutes + "m " + seconds + "s ");

        if (difference<0){ //when timer ends
            if (i== props.newtime.length-1){
            clearInterval(x);
            setTimeLeft("done");
            }
            else{
            i++;
            then= props.newtime[i]*60*1000+Date.now() //resets timer
            setTimeLeft("switch what you are doing")
            //insert push notification here
            }
        }

        },1000); //the 1000 is what makes it repeat every second
        return () => clearInterval(x);
    },[]);

    return(
        <Text>{timeLeft}</Text>
    )
    }

    //creates some text and a button
    const TimerSetup = (props) => {
    const [getTime, setTime]= useState(0);
    return(
        <>
        <Text> Timer from now to {props.time} </Text>
        <Button
        onPress={()=>{
            //insert make the button actually start the timer
            setTime(props.time);

        }}
        disabled={Boolean(getTime)}
        title={getTime ? "happy studying:)" : "Click to start"}
        />
        </>
    );}
    
    var newtime1 = new Date("Jan 4, 2021 21:00:00"); //9pm today
    var timearray=[0.1,0.1,0.1]
    return (
      <View style={styles.container}>
        <TimerSetup time={newtime1.toLocaleString()}/>
        <NewTimer newtime={timearray}/>
        <StatusBar style="auto" />
      </View>
    );}
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
