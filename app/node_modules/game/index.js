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
import { MoveFinger } from "./systems"

export default class BestGameEver extends PureComponent {
  constructor() {
    super();
  }

  render() {
    return (
      <GameEngine
        style={styles.container}
        systems={[MoveFinger]}
        entities={{
          1: { position: [40,  50], renderer: <Finger />}, //-- Notice that each entity has a unique id (required)
          2: { position: [100, 50], renderer: <Finger />}, //-- and a renderer property (optional). If no renderer
          3: { position: [160, 50], renderer: <Finger />}, //-- is supplied with the entity - it won't get displayed.
          4: { position: [220, 50], renderer: <Finger />},
          5: { position: [280, 50], renderer: <Finger />},
          6: { position: [340, 50], renderer: <Finger />}
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
