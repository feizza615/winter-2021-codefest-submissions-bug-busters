import React , {useState, useEffect} from 'react'
import { StyleSheet, TouchableOpacity, TextInput, Text, View,ScrollView, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'



export default class GamePanel extends React.Component {
    static navigationOptions = {title: 'GamePanel'};
    render(){
    return(
    <View style={styles.container}>
        <Text>This is the Game Screen</Text>
    </View>)
    }

}


const styles = StyleSheet.create({
    checkBox: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})
