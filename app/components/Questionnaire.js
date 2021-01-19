import React,{useState} from 'react'
import { StyleSheet, TouchableOpacity, TextInput, Text, View, Button , } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker'
import Icon from 'react-native-vector-icons/MaterialIcons'


const CheckBox =(props)=>{
      const [selected, setSelected] = useState(false);
      const [clicks, setClicks]=useState(props.clicks);
      const changeBoxStatus=()=> {setSelected(!selected);props.onChange();}

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
   static navigationOptions = {title: 'Questionnaire'};
   state = {
    hours: 0,
    mins: 0,
    breaks: 0,
    breakTimes:0,
    workTimes:0,
    number:0,
    select:false
 }
 //submit button after hours and minutes
 //give recommendation and option to use/not use

 handleWorkTimes = () => {
    let i = 60 * this.state.hours + this.state.mins;
    let j = this.state.breaks * this.state.breakTimes;
    let k = i-j;

    k= k/(this.state.breaks+1);
    this.setState({workTimes:k})

    endplus30=[25,5]
    reg50=[20,5,20,5]
    reg60=[20,5,25,10]
    if (hours == 0) :
      if (mins==45):list= [20,5,20]
      else if (mins==50): list= [].push.apply(endplus30,20)
      else: list= [].push.apply(endplus30,25)
    else:
        let x=mins
        list=new Array(hours-1).fill(reg60).flat()
        //need zero case
        if 0<x<20 or 30<x<50:
          list.push.apply(list,reg50) //for 10,15,40,45
        else:
          list=list.push.apply(list,reg60) //for all others
        if x>30:
          list.push.apply(list,endplus30) //for greater than half an hour, add [25,5]
        if x===30:
          list.push.apply(list,[30])
        else if x % 10 = 0:
          list.push.apply(list,[20])
        else:
          list.push.apply(list,[25])

        switch(mins){
          //case 5: return hours*reg60
          //case 10: return hours*reg50+20 break;
          case 15: return hours*reg50+25
          case 20: return hours*reg60+20
          //case 25: return hours*reg60+25
          case 30: return hours*reg60+30
          case 40: return hours*reg50+endplus30+20
          case 45: return hours*reg50+endplus30+25
          case 50: return hours*reg60+endplus30+20
          //case 55: return hours*reg60+endplus30+25
          case 0: return hours*reg60+[25,10,25]
        }
  }//end of handleWorkTimes

  changeState =()=>{
      this.setState({select:!this.state.select});
  };


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
        <View style = {styles.container}>
          <DropDownPicker
            items={makeDropdown()}
            containerStyle={{height: 40}}
            dropDownStyle={{marginTop: 2}}
            placeholder="Select how long you will be studying"
            onChangeItem={
              (item)=>{this.setState ({
                hours: parseInt(Math.floor(item.value/60)),
                mins: parseInt(item.value%60)
            })}}
          />
          <CheckBox clicks={this.state.number} select={this.state.select} onChange={this.changeState}/>
          {this.state.select?this.renderDropDown():this.renderChildren()}
          <TouchableOpacity
            style = {styles.submitButton}
            onPress = {
               () => this.handleWorkTimes()
            }>
          <Text style = {styles.submitButtonText}> Submit </Text>
          </TouchableOpacity>

          <Text> {this.state.workTimes}</Text>
          <Text>{list}</Text>

          <Button
              title= "Go to Timer Screen"
              onPress={() => navigate('Timer')}
          />
        </View>
       )
   }
}

function makeDropdown(){
  let dropdown= Array.from(Array(64).keys())
  dropdown=dropdown.map(x=>x*5+45)
  dropdown=dropdown.map(x=>{label:parseInt(Math.floor(x/60))+"hours" + parseInt(x%60) +"mins", value:x})
  return dropdown
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
