import React from 'react'
import { StyleSheet, TouchableOpacity, TextInput, Text, View,ScrollView, Button } from 'react-native';

export default class Questionnaire extends React.Component{
   static navigationOptions = {title: 'Questionnaire'};
   state = {
    hours: 0,
    mins: 0,
    breaks: 0,
    breakTimes:0,
    workTimes:0
 }

 handleHours = (text) => {
    this.setState({ hours: parseInt(text) })
    //console.log(text)
 }
 handleMins = (text) => {
    this.setState({ mins: parseInt(text) })
 }
 handleBreaks = (text) => {
    this.setState({ breaks: parseInt(text) })
 }
 handleBreakTimes = (text) => {
    this.setState({ breakTimes: parseInt(text) })
 }
 handleWorkTimes = () => {
    //console.log(this.state.hours)
    //console.log(this.state.mins)
    //console.log(this.state.breaks)
    //console.log(this.state.breakTimes)
    let i = 60 * this.state.hours + this.state.mins;
    let j = this.state.breaks * this.state.breakTimes;
    let k = i-j;
    //console.log(k)
    k= k/(this.state.breaks+1);
    this.setState({workTimes:k})
    //console.log(k);
    //console.log(this.state.workTimes)
 }

   render(){
       const { navigate } = this.props.navigation; //props comes from App.js
       let list = []; //array variable
       for(let i=0;i<this.state.breaks*2+1;i++){
          if(i%2==0){
             list.push(this.state.workTimes)
          }
          else{
             list.push(this.state.breakTimes)
          }
       }
       return(
        <>
        <ScrollView style = {styles.container}>
           <TextInput style = {styles.input}
          keyboardType="numeric"
              underlineColorAndroid = "transparent"
              placeholder = "Enter number of hours"
              placeholderTextColor = "#9a73ef"
              autoCapitalize = "none"
              onChangeText = {this.handleHours}/>
           <TextInput style = {styles.input}
          keyboardType="numeric"
              underlineColorAndroid = "transparent"
              placeholder = "Enter number of minutes"
              placeholderTextColor = "#9a73ef"
              autoCapitalize = "none"
              onChangeText = {this.handleMins}/>

           <TextInput style = {styles.input}
          keyboardType="numeric"
              underlineColorAndroid = "transparent"
              placeholder = "Number of Sections"
              placeholderTextColor = "#9a73ef"
              autoCapitalize = "none"
              onChangeText = {this.handleBreaks}/>
           <TextInput style = {styles.input}
          keyboardType="numeric"
              underlineColorAndroid = "transparent"
              placeholder = "Length of Sections"
              placeholderTextColor = "#9a73ef"
              autoCapitalize = "none"
              onChangeText = {this.handleBreakTimes}/>
           <TouchableOpacity
              style = {styles.submitButton}
              onPress = {
                 () => this.handleWorkTimes()
              }>
              <Text style = {styles.submitButtonText}> Submit </Text>
           </TouchableOpacity>
        </ScrollView>
        <Text>
        {this.state.workTimes}
        </Text>
        <Text>
        {list}
        </Text>

           <View style = {styles.container}>
               <Button
                  title= "Go to Timer Screen"
                  onPress={() => navigate('Timer', {listoftimes: list})}

              />
           </View>
           </>
       )
   }
}
const styles = StyleSheet.create({
    container: {
       paddingTop: 23
    },
    input: {
       margin: 15,
       height: 40,
       borderColor: '#7a42f4',
       borderWidth: 1
    },
    submitButton: {
       backgroundColor: '#7a42f4',
       padding: 10,
       margin: 15,
       height: 40,
    },
    submitButtonText:{
       color: 'white'
    }
 });
