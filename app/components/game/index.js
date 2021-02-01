//The code found in the game folder was taken from React-Native-Game-Engine Repository and was modified.
//The code that was modified belongs to Boris Berak
//His repository can be found here: https://github.com/bberak/react-native-game-engine-handbook
import React, { PureComponent } from "react";
import { Dimensions, TouchableOpacity, Button, View, AppRegistry, StyleSheet, StatusBar, Text } from "react-native";
import { GameEngine, dispatch } from "react-native-game-engine";
import { Finger } from "./renderers";
import { ChangeColor, Restart } from "./systems"
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

let customFonts = {
  'NovaSquare': require('../../assets/fonts/NovaSquare-Regular.ttf'),
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const dotPlacement = windowWidth/3;
const dotPlacement2 = windowWidth/4;
const dotPlacement3 = windowHeight/5;
export default class BestGameEver extends PureComponent {
  constructor(props) {
    super(props);
    this.engine = null;
    this.state = {
        running: true,
        fontsLoaded: false
    }
}

async _loadFontsAsync() {
  await Font.loadAsync(customFonts);
  this.setState({ fontsLoaded: true });
}

componentDidMount() {
  this._loadFontsAsync();
}


  render() {
    if (this.state.fontsLoaded) {return(
      <View>
      <GameEngine
      ref={(ref) => { this.engine = ref; }}
        style={styles.container}
        systems={[ChangeColor, Restart]}
        entities={{
          1: { selected:0, pairedB4: -1, color:'pink' , position: [Math.floor(Math.random()*(dotPlacement-60)+30),  Math.floor(Math.random()*(dotPlacement3-80)+40)], renderer: <Finger />}, //-- Notice that each entity has a unique id (required)
          2: { selected:0, pairedB4: -1, color:'pink' , position: [Math.floor(Math.random()*(dotPlacement-60)+dotPlacement+30),Math.floor(Math.random()*(dotPlacement3-80)+40)], renderer: <Finger />}, //-- and a renderer property (optional). If no renderer
          3: { selected:0, pairedB4: -1, color:'pink' , position: [Math.floor(Math.random()*(dotPlacement-60)+2*dotPlacement+30), Math.floor(Math.random()*(dotPlacement3-80)+40)], renderer: <Finger />}, //-- is supplied with the entity - it won't get displayed.
          4: { selected:0, pairedB4: -1, color:'pink' , position: [Math.floor(Math.random()*(dotPlacement-60)+30), Math.floor(Math.random()*(dotPlacement3-80)+dotPlacement3+40)], renderer: <Finger />},
          5: { selected:0, pairedB4: -1, color:'pink' , position: [Math.floor(Math.random()*(dotPlacement-60)+dotPlacement+30), Math.floor(Math.random()*(dotPlacement3-80)+dotPlacement3+40)], renderer: <Finger />},
          6: { selected:0, pairedB4: -1, color:'pink' , position: [Math.floor(Math.random()*(dotPlacement-60)+2*dotPlacement+30), Math.floor(Math.random()*(dotPlacement3-80)+dotPlacement3+40)], renderer: <Finger />},
          7: { selected:0, pairedB4: -1, color:'pink' , position: [Math.floor(Math.random()*(dotPlacement2-60)+30), Math.floor(Math.random()*(dotPlacement3-80)+2*dotPlacement3+40)], renderer: <Finger />},
          8: { selected:0, pairedB4: -1, color:'pink' , position: [Math.floor(Math.random()*(dotPlacement2-60)+dotPlacement2+30), Math.floor(Math.random()*(dotPlacement3-80)+2*dotPlacement3+40)], renderer: <Finger />},
          9: { selected:0, pairedB4: -1, color:'pink' , position: [Math.floor(Math.random()*(dotPlacement2-60)+2*dotPlacement2+30), Math.floor(Math.random()*(dotPlacement3-80)+2*dotPlacement3+40)], renderer: <Finger />},
          10: { selected:0, pairedB4: -1, color:'pink' , position: [Math.floor(Math.random()*(dotPlacement2-60)+3*dotPlacement2+30), Math.floor(Math.random()*(dotPlacement3-80)+2*dotPlacement3+40)], renderer: <Finger />},
        }}>
        <StatusBar hidden={true} />
      </GameEngine>
      <View style={{flexDirection:"row", backgroundColor:"white", justifyContent:"space-evenly", marginBottom: 10}}>
      <TouchableOpacity
        onPress={() => {
          this.engine.dispatch({type:"restart"})
          //insert something that clears the drawings.....
        } }>
        <Text style={styles.text}>New Game</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => { this.engine.dispatch({type:"next-move"})} }><Text style={styles.text}>Next Move</Text>
      </TouchableOpacity>
      </View>
          </View>

    );}else {
      return <AppLoading />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  text: {
    fontFamily:'NovaSquare',
    color:'#38127a',
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft:5
  },
  button:{
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom:0,
    left:0,
  }

});

AppRegistry.registerComponent("BestGameEver", () => BestGameEver);
