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
import { AppRegistry, StyleSheet, StatusBar } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { Finger } from "./renderers";
import { MoveFinger,PressFinger } from "./systems"

export default class BestGameEver extends PureComponent {
  constructor() {
    super();
  }

  render() {
    return (
      <GameEngine
        style={styles.container}
        systems={[MoveFinger,PressFinger]}
        entities={{
          1: { color:'pink' , position: [((Math.random()*4)+1)*25,  0], renderer: <Finger />}, //-- Notice that each entity has a unique id (required)
          2: { color:'pink' ,position: [((Math.random()*4)+1)*25+50, ((Math.random()*4)+1)*25+25], renderer: <Finger />}, //-- and a renderer property (optional). If no renderer
          3: { color:'pink' ,position: [((Math.random()*4)+1)*25+100, ((Math.random()*4)+1)*25+50], renderer: <Finger />}, //-- is supplied with the entity - it won't get displayed.
          4: { color:'pink' ,position: [((Math.random()*4)+1)*25+125, ((Math.random()*4)+1)*25], renderer: <Finger />},
          5: { color:'pink' ,position: [((Math.random()*4)+1)*25+150, ((Math.random()*4)+1)*25+25], renderer: <Finger />},
          6: { color:'pink' ,position: [((Math.random()*4)+1)*25+175, ((Math.random()*4)+1)*25+50], renderer: <Finger />}
        }}>

        <StatusBar hidden={true} />

      </GameEngine>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  }
});

AppRegistry.registerComponent("BestGameEver", () => BestGameEver);