import React , {useState, useEffect} from 'react'
import { StyleSheet, TouchableOpacity, TextInput, Text, View,ScrollView, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

const CheckBox = ({ selected, onPress, style, textStyle, size = 30, color = '#211f30', text = '', ...props}) => (
    <TouchableOpacity style={[styles.checkBox, style]} onPress={onPress} {...props}>
        <Icon
            size={size}
            color={color}
            name={ selected ? 'check-box' : 'check-box-outline-blank'}
        />

        <Text style={textStyle}> {text} </Text>
    </TouchableOpacity>
)

export default class Checklist extends React.Component {
    static navigationOptions = {title: 'Checklist'};
    state = {
        termsAccepted: false
    }

    handleCheckBox = () => this.setState({ termsAccepted: !this.state.termsAccepted })

    render(){
      return(
        <>
        <CheckBox
            selected={this.state.termsAccepted}
            onPress={this.handleCheckBox}
            text='Input should be here'
        />
        <CheckBox
            selected={this.state.termsAccepted}
            onPress={this.handleCheckBox}
            text='Input should be here'
        />
        </>
    )};

}


const styles = StyleSheet.create({
    checkBox: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})
