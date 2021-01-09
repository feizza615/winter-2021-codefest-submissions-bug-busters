import React from 'react'
import { StyleSheet, TouchableOpacity, TextInput, Text, View, Button } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker'
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
        <View style = {styles.container}>
        <DropDownPicker
        items={[
{label: '45 mins', value: 45,},
{label: '1 hour', value: 60, },
{label: '1 hour 15 mins', value: 75,},
{label: '1 hour 30 mins', value: 90,},
{label: '1 hour 45 mins', value: 105,},
{label: '2 hours', value: 120,},
{label: '2 hour 15 mins', value: 135,},
{label: '2 hour 30 mins', value: 150,},
]}

containerStyle={{height: 40}}
dropDownStyle={{marginTop: 2}}
        placeholder="Select number of minutes"
     //    items={this.state.mins}
        onChangeItem={(item)=>{this.setState({
          hours:parseInt(Math.floor(item.value/60)),
          mins:parseInt(item.value%60)
        })
     }}
     />
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
        </View>
        <Text>
        {this.state.workTimes}
        </Text>
        <Text>
        {list}
        </Text>

           <View style = {styles.container}>
               <Button
                  title= "Go to Timer Screen"
                  onPress={() => navigate('Timer')}
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
