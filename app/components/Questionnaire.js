
import React,{useState} from 'react'
import { StyleSheet, TouchableOpacity, TextInput, Text, View,ScrollView, Button } from 'react-native';
import Timer from './Timer'
import DropDownPicker from 'react-native-dropdown-picker'
import Icon from 'react-native-vector-icons/MaterialIcons'


const CheckBox =(props)=>{
      const [selected, setSelected] = useState(true);
      const changeBoxStatus=()=> {setSelected(!selected);props.changeState();}

      return(
         <>
         <View>
        <TouchableOpacity style={[styles.checkBox]} onPress={changeBoxStatus} >
            <Icon
                size={30}
                color={'#211f30'}
                name={ selected ? 'check-box' : 'check-box-outline-blank'}
            />
            </TouchableOpacity><Text>Enable recommendation for breaks?</Text>
            </View>
            </>
      )
}


export default class Questionnaire extends React.Component{
   static navigationOptions = {title: 'Questionnaire',
   headerLeft:()=> null};
   state = {
    hours: 0,
    mins: 0,
    breaks: 0,
    breakTimes:0,
    //workTimes:0,
    number:0,
    select:true,
    timeChosen:false,
    processTime:false,
    breakD1:false,
    breakD2:false,
    list:[]
 }
 //submit button after hours and minutes
 //give recommendation and option to use/not use

makeListAuto=()=>{
  let add30=[25,5]
  let reg50=[20,5,20,5]
  let reg60=[20,5,25,10]
  let end45=[20,5,20]
  let mins=this.state.mins
  let hours = this.state.hours
  let list =[]
  if(mins==-1){
    list=[.25,.25,.25,.25]
  }
  else if (hours!=0){
    list = new Array(hours-1).fill(reg60).flat()
  }

  switch(mins){
    case 0: list=list.concat([25,10,25]); break;
    case 5: list=list.concat([25,10,30]); break;
    case 10: list=list.concat(reg50,[20]) ; break;
    case 15: list=list.concat(reg50,[25]) ; break;
    case 20: list=list.concat(reg60,[20]) ; break;
    case 25: list=list.concat(reg60,[25]) ; break;
    case 30: list=list.concat(reg60,[30]) ; break;
    case 35: list=list.concat(reg50,end45) ; break;
    case 40: list=list.concat(reg50,add30,[20]) ; break;
    case 45: list=list.concat(reg60,end45) ; break;
    case 50: list=list.concat(reg60,add30,[20]) ; break;
    case 55: list=list.concat(reg60,add30,[25]) ; break;
  }

  if (hours===0){
    list.shift()//removes the added reg60
    list.shift()
    list.shift()
    list.shift()
  }
  this.setState({list:list})
};

makeListManually =()=>{
  let mins = 60 * this.state.hours + this.state.mins;
  let breakTime = this.state.breaks * this.state.breakTimes;
  let workTime = mins-breakTime;

  let oneWorkTime= workTime/(this.state.breaks+1);
  //this.setState({workTimes:oneWorkTime})

  let list =[]
  for(let i=0;i<this.state.breaks*2+1;i++){
     if(i%2==0){
        list.push(oneWorkTime)
     }
     else{
        list.push(this.state.breakTimes)
     }

  }
  this.setState({list:list})
};

  changeState =()=>{
      this.setState({select:!this.state.select,
                     processTime:!this.state.processTime});
  };


  renderDropDown=()=>{
      return(
        <>
        <DropDownPicker
          items={makeDropdownBreakNum()}
          containerStyle={{height: 40}}
          dropDownStyle={{marginTop: 2}}
          placeholder="Select how many breaks you want"
          onChangeItem={
            (item)=>{this.setState ({
              breaks: item.value,
              breakD1:true
          })}}/>
        <DropDownPicker
          items={makeDropdownBreaks()}
          containerStyle={{height: 40}}
          dropDownStyle={{marginTop: 2}}
          placeholder="Select how long each break will be"
          onChangeItem={
            (item)=>{this.setState ({
              breakTimes: item.value,
              breakD2:true

          })}}/>
        </>
      );
  }

   render(){
       const { navigate } = this.props.navigation; //props comes from App.js

       return(
        <View style = {styles.container}>
          <DropDownPicker
            items={makeDropdown()}
            containerStyle={{height: 40}}
            dropDownStyle={{marginTop: 2}}
            placeholder="Select how long you will be studying"
            onChangeItem={
              (item)=>{this.setState ({
                hours: parseInt(Math.floor(item.value/60)),
                mins: parseInt(item.value%60),
                timeChosen: true,
                processTime: false
            })}}
          />
          <CheckBox clicks={this.state.number} select={this.state.select} changeState={this.changeState}/>
          {this.state.select?null:this.renderDropDown()}
          <TouchableOpacity
            style = {styles.submitButton}
            onPress = {() => {this.state.select?this.makeListAuto():this.makeListManually();
                           this.setState({processTime:true});}}
            >
            <Text style = {styles.submitButtonText}> Submit </Text>
          </TouchableOpacity>

          <Text> {this.state.list}</Text>

          <Button
              title= "Go to Timer Screen"
              disabled={this.state.select
                 ?(!this.state.timeChosen||!this.state.processTime)
                 :(!this.state.timeChosen||!this.state.processTime||!this.state.breakD1||!this.state.breakD2)}
              onPress={() => navigate('Timer', {listoftimes: this.state.list})}
          />
        </View>
       )
   }
};


function badEasyDropdown(){
  let dropdown=
  [
{label:'Demo', value:-1},
{label: '45 mins', value: 45,},
{label: '1 hour', value: 60, },
{label: '1 hour 15 mins', value: 75,},
{label: '1 hour 30 mins', value: 90,},
{label: '1 hour 45 mins', value: 105,},
{label: '2 hours', value: 120,},
{label: '2 hour 15 mins', value: 135,},
{label: '2 hour 30 mins', value: 150,},
];
return dropdown
};

function makeDropdown(){
  let dropdown= Array.from(Array(64).keys())
  dropdown=dropdown.map(x=>x*5+45)
  dropdown=dropdown.map(x=>{ return {label:parseInt(Math.floor(x/60))+" hours " + parseInt(x%60) +" mins ", value:x,}})
  dropdown.unshift({label:'Demo', value:-1},)
  return dropdown
};

function makeDropdownBreaks(){
  let dropdown= Array.from(Array(6).keys())
  dropdown=dropdown.map(x=>x*5+5)
  dropdown=dropdown.map(x=>{return {label:parseInt(x) + " mins", value:x}})
  return dropdown
};

function makeDropdownBreakNum(){
  let dropdown= Array.from(Array(15).keys())
  dropdown=dropdown.map(x=>{return {label:parseInt(x) + " breaks", value:x}})
  return dropdown
};


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
