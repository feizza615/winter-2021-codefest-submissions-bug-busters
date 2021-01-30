//The code found in the game folder was taken from React-Native-Game-Engine Repository and was modified.
//The code that was modified belongs to Boris Berak
//His repository can be found here: https://github.com/bberak/react-native-game-engine-handbook
import React, { PureComponent } from "react";
import { Dimensions, TouchableOpacity, Button, View, AppRegistry, StyleSheet, StatusBar, Text } from "react-native";
import { GameEngine, dispatch } from "react-native-game-engine";
import { Finger } from "./renderers";
import { ChangeColor } from "./systems"


const windowWidth = Dimensions.get('window').width;
const dotPlacement = windowWidth/3;
export default class BestGameEver extends PureComponent {
  constructor(props) {
    super(props);
    this.engine = null;
    this.state = {
        running: true
    }
}

  render() {
    return (
      <View>

      <GameEngine
      ref={(ref) => { this.engine = ref; }}
        style={styles.container}
        systems={[ChangeColor]}
        entities={{
          1: { selected:0, pairedB4: -1, color:'pink' , position: [Math.floor(Math.random()*(dotPlacement-60)+30),  Math.floor(Math.random()*(160)+20)], renderer: <Finger />}, //-- Notice that each entity has a unique id (required)
          2: { selected:0, pairedB4: -1, color:'pink' , position: [Math.floor(Math.random()*(dotPlacement-60)+dotPlacement+30),Math.floor(Math.random()*(160)+20)], renderer: <Finger />}, //-- and a renderer property (optional). If no renderer
          3: { selected:0, pairedB4: -1, color:'pink' , position: [Math.floor(Math.random()*(dotPlacement-60)+2*dotPlacement+30), Math.floor(Math.random()*(160)+20)], renderer: <Finger />}, //-- is supplied with the entity - it won't get displayed.
          4: { selected:0, pairedB4: -1, color:'pink' , position: [Math.floor(Math.random()*(dotPlacement-60)+30), Math.floor(Math.random()*(160)+220)], renderer: <Finger />},
          5: { selected:0, pairedB4: -1, color:'pink' , position: [Math.floor(Math.random()*(dotPlacement-60)+dotPlacement+30), Math.floor(Math.random()*(160)+220)], renderer: <Finger />},
          6: { selected:0, pairedB4: -1, color:'pink' , position: [Math.floor(Math.random()*(dotPlacement-60)+2*dotPlacement+30), Math.floor(Math.random()*(160)+220)], renderer: <Finger />},
        }}>
        <StatusBar hidden={true} />
      </GameEngine>

      <TouchableOpacity  onPress={() => { this.engine.dispatch({type:"next-move"})} }><Text>HIII</Text>
          </TouchableOpacity>

          </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },

  button:{
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom:0,
    left:0,
  }

});

AppRegistry.registerComponent("BestGameEver", () => BestGameEver);
