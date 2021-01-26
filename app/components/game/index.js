// import React from "react";
// import { GameEngine } from "react-native-game-engine";
// import Renderer from "./graphics/renderer";
// import Systems from "./systems";
// import Entities from "./entities";
// import Timer from "./utils/perf-timer";
// import ShaderPass from "./graphics/passes/shader-pass";
// import PixelShader from "./graphics/shaders/pixel-shader";
//
// class Game extends React.Component {
//   render() {
//     return (
//       <GameEngine
//         style={{ backgroundColor: "black" }}
//         timer={new Timer()}
//         systems={Systems}
//         entities={Entities()}
//         renderer={Renderer(
//           //new ShaderPass(PixelShader())
//         )}
//       />
//     );
//   }
// }
//
// export default Game;
import React, { PureComponent } from "react";
import { TouchableOpacity, Button, View, AppRegistry, StyleSheet, StatusBar, Text } from "react-native";
import { GameEngine, dispatch } from "react-native-game-engine";
import { Finger } from "./renderers";
import { ChangeColor } from "./systems"

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
          1: { selected:0, color:'pink' , position: [(Math.floor((Math.random()*4))+1)*25,  0], renderer: <Finger />}, //-- Notice that each entity has a unique id (required)
          2: { selected:0, color:'pink' ,position: [((Math.random()*4)+1)*25+50, 50], renderer: <Finger />}, //-- and a renderer property (optional). If no renderer
          3: { selected:0, color:'pink' ,position: [((Math.random()*4)+1)*25+100, 100], renderer: <Finger />}, //-- is supplied with the entity - it won't get displayed.
          4: { selected:0, color:'pink' ,position: [((Math.random()*4)+1)*25+125, 0], renderer: <Finger />},
          5: { selected:0, color:'pink' ,position: [((Math.random()*4)+1)*25+150, 50], renderer: <Finger />},
          6: { selected:0, color:'pink' ,position: [((Math.random()*4)+1)*25+175, 100], renderer: <Finger />},
        }}>
        <StatusBar hidden={true} />
      </GameEngine>
   
     
      <TouchableOpacity style={styles.button}  onPress={() => { this.engine.dispatch({type:"next-move"})} }><Text>HIII</Text>
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
