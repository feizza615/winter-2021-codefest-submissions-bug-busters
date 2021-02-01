
import React,{useState} from 'react'
import { TouchableHighlight, Image, ImageBackground, StyleSheet, TouchableOpacity, TextInput, Text, View, Button, ScrollView,  } from 'react-native';
import Timer from './Timer'
import OpenendedTimer from './OpenendedTimer'
import DropDownPicker from 'react-native-dropdown-picker'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {Header} from 'react-native-elements'
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

let customFonts = {
  'NovaSquare': require('../assets/fonts/NovaSquare-Regular.ttf'),
};
export default class Questionnaire extends React.Component{
  static navigationOptions = {title: 'Questionnaire', headerLeft:()=> null, headerShown: false,};
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
   list:[],
   fontsLoaded: false,
}
async _loadFontsAsync() {
  await Font.loadAsync(customFonts);
  this.setState({ fontsLoaded: true });
}


componentDidMount() {
  this._loadFontsAsync();
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

makeOpenEndedList=()=>{//NEW
  this.setState({list:[-5]})
};

 changeState =()=>{
     this.setState({select:!this.state.select});
 };

SendText=()=>{
  var text ="";
  for(let i = 0; i<this.state.list.length;i++){
    if(i%2==0){
      text+= this.state.list[i] + " minute study session"
    }
    else if(i%2!=0){
      text+= this.state.list[i] + " minute break"
    }
    if(i!=this.state.list.length-1){
      text+=" + "
    }

  }
  return text

}
 renderDropDown=()=>{
     return(
       <>
       <Text style={styles.questions}>How many breaks would you like?</Text>
       <DropDownPicker
         items={makeDropdownBreakNum()}
         style={styles.dropContainer}
          containerStyle={{ height: 50, width:'70%', paddingLeft:10,backgroundColor:'transparent'}}
          dropDownStyle={{ backgroundColor:'#38127a', alignContent:'center',alignSelf:'center'}}
          labelStyle={{
            fontSize: 20,
            fontFamily:'NovaSquare',
            textAlign: 'center',
            color: 'white',
            backgroundColor:'transparent'
        }}
           placeholderStyle={{
            color:'white',
            fontFamily:'NovaSquare',
            textAlign: 'center',
            backgroundColor:'transparent'
        }}
         placeholder=""
         onChangeItem={
          (item)=>{this.setState ({
            breaks: item.value,
            breakD1:true
        })}}/>
      <Text style={styles.questions}>How long should each break be?</Text>
       <DropDownPicker
         items={makeDropdownBreaks()}
         style={styles.dropContainer}
          containerStyle={{height: 50, width:'70%', paddingLeft:10,backgroundColor:'transparent',}}
          dropDownStyle={{backgroundColor:'#38127a', alignContent:'center',alignSelf:'center'}}
          labelStyle={{
            fontSize: 20,
            fontFamily:'NovaSquare',
            textAlign: 'center',
            color: 'white',
            backgroundColor:'transparent'
        }}
           placeholderStyle={{
            color:'white',
            fontFamily:'NovaSquare',
            textAlign: 'center',
            backgroundColor:'transparent'
        }}
         placeholder=""
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


      if (this.state.fontsLoaded) {return(
       <>
         <ImageBackground source={require("../assets/background.png")} style={{ resizeMode: 'cover', width: '100%', height: '100%' }}>
         <Header
          centerComponent={<Image source={require("../assets/logo.png")} style={{ height:'90%', width:'40%'}} />}

          containerStyle={{
            height:95,
            backgroundColor:'transparent',
            borderBottomColor:'transparent'
           }}
         />
         <ScrollView>

           <Text style={styles.questions}>How long would you like to study for?</Text>


           <DropDownPicker
             items={makeDropdown()}
             style={styles.dropContainer}
             containerStyle={{height: 50, width:'70%', backgroundColor:'transparent', paddingLeft:10, alignContent:'center'}}
             dropDownStyle={{ backgroundColor:'#38127a', alignContent:'center',alignSelf:'center'}}
             placeholder=""
             labelStyle={{
              fontSize: 20,
              fontFamily:'NovaSquare',
              textAlign: 'center',
              color: 'white',
              backgroundColor:'transparent',
          }}
             placeholderStyle={{
              color:'white',
              fontFamily:'NovaSquare',
              textAlign: 'center',
              backgroundColor:'transparent',

          }}
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

           {/*View Schedule Button*/}
           <View style={{paddingTop:20}}>
             <TouchableOpacity
               style = {styles.submitButton}
               onPress = {() => {
                 this.state.select?this.makeListAuto():this.makeListManually();
                 this.setState({processTime:true});
               }}
              >
                 <Text style={styles.submitButtonText}>View Schedule</Text>
             </TouchableOpacity>
           </View>

           {/*Text of what the schedule is*/}
            {this.state.processTime &&
              <Text style={styles.schedule}> <this.SendText/></Text>
            }
             {/*Go to timer regular Button*/}
             {(this.state.processTime && this.state.timeChosen &&
                (this.state.select ||
                  (this.state.breakD1 && this.state.breakD2))) &&

              /*<GoToTimer state = {this.state}/>*/
              <View style={{paddingTop:20}}>
                <TouchableOpacity
                  style = {styles.submitButton}
                  onPress={() => navigate('Timer', {listoftimes: this.state.list})}
                >
                <Text style={styles.submitButtonText}>Go To Timer</Text>
                </TouchableOpacity>
              </View>
            }

            {/*Open ended study session Button*/}
            <View style={{paddingTop:20}}>
            <TouchableOpacity
              style = {styles.submitButton}
              onPress={() => navigate('OpenendedTimer')}
              >
                <Text style={styles.submitButtonText}>Open-ended Sesh</Text>
            </TouchableOpacity>{/*NEW*/}
            </View>

           
          </ScrollView>
         </ImageBackground>
       </>
      )}
      else {
        return <AppLoading />;
      }
  }
};

const GoToTimer =(props)=>{
  return(
    <View style={{paddingTop:20}}>
    <TouchableOpacity style = {styles.submitButton} disabled={props.state.select
        ?(!props.state.timeChosen||!props.state.processTime)
        :(!props.state.timeChosen||!props.state.processTime||!props.state.breakD1||!props.state.breakD2)}
    onPress={() => navigate('Timer', {listoftimes: props.state.list})}>
        <Text style={styles.submitButtonText}>Go To Timer</Text>
    </TouchableOpacity>

    <Text style={styles.schedule}> <props.SendText/></Text>
 </View>
)
};

const CheckBox =(props)=>{
      const [selected, setSelected] = useState(true);
      const changeBoxStatus=()=> {setSelected(!selected);props.changeState();}

      return(
         <>
         <View style={{paddingTop:20, paddingBottom:20, paddingLeft:10}}>
        <TouchableOpacity style={{flexDirection:'row',alignItems: "left",
              justifyContent: "left",
              textAlign: "center"}} onPress={changeBoxStatus} >
            <Icon

                size={19}
                color={'white'}
                name={ selected ? 'check-box' : 'check-box-outline-blank'}
            />
            <Text style={styles.reccomendation}> Enable Recommended Schedule</Text>
            </TouchableOpacity>
            </View>
            </>
      )
}

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
  title: {
    fontFamily:'NovaSquare',
    color:'white',
    fontSize:20,
    fontWeight: 'bold',
    paddingTop:10,
    paddingLeft:10
  },
    questions: {
      fontFamily:'NovaSquare',
      color:'white',
      fontSize:20,
      paddingTop:20,
      paddingLeft:15
    },
    schedule: {
      fontFamily:'NovaSquare',
      color:'white',
      fontSize:20,
      paddingTop:40,
      paddingLeft:10
    },
    reccomendation: {
      fontFamily:'NovaSquare',
      color:'white',
      fontSize:15,
    },
    container: {

    },
    input: {
       margin: 15,
       height: 40,
       borderColor: '#7a42f4',
       borderWidth: 1
    },
    submitButton: {
       backgroundColor: '#38127a',
       height: 60,
      borderWidth:1,
      borderColor:'white',
      borderRadius:15,
      width:'60%',
      alignSelf:'center',
      justifyContent:'center',

    },
    submitButtonText:{
      fontFamily:'NovaSquare',
      color:'white',
      fontSize:25,
      justifyContent:'center',
      textAlign:'center'
    },
    dropContainer:{
      backgroundColor:'transparent',
      borderTopColor:'transparent',
      borderLeftColor:'transparent',
      borderRightColor:'transparent',
      borderBottomWidth:1,
      borderBottomColor:"white",
      borderBottomEndRadius:1,
      borderBottomStartRadius:1

    },
    button:{
      height:100,
      paddingTop:30,
      paddingBottom:30,
      width:50,
      justifyContent: "space-evenly"

    },
 });
