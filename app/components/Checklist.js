import React , {useState, useEffect} from 'react'
import { StyleSheet, TouchableOpacity, TextInput, Text, View,ScrollView, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

const CheckBox =()=>{
      const [selected, setSelected] = useState(false);
      const changeBoxStatus=()=> setSelected(!selected)

      return(
        <TouchableOpacity style={[styles.checkBox]} onPress={changeBoxStatus}>
            <Icon
                size={30}
                color={'#211f30'}
                name={ selected ? 'check-box' : 'check-box-outline-blank'}
            />
            <TextInput placeholder="type here"/>
        </TouchableOpacity>
      )

}

export default class Checklist extends React.Component {
    static navigationOptions = {title: 'Checklist'};

    render(){
      var rows=[];
      for (var i=0; i<10;i++){
        rows.push(<CheckBox key={i}/>); //makes ten rows of checkbox lines
      }
      return(
        <>
        <Text>Things to do:</Text>
        {rows}
        </>
      )
    };

}


const styles = StyleSheet.create({
    checkBox: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})
