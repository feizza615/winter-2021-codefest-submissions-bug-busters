const MoveFinger = (entities, { touches }) => {
  //
  // //-- I'm choosing to update the game state (entities) directly for the sake of brevity and simplicity.
  // //-- There's nothing stopping you from treating the game state as immutable and returning a copy..
  // //-- Example: return { ...entities, t.id: { UPDATED COMPONENTS }};
  // //-- That said, it's probably worth considering performance implications in either case.
  //
  // touches.filter(t => t.type === "move").forEach(t => {
  //   let finger = entities[t.id];
  //   if (finger && finger.position) {
  //     finger.position = [
  //       finger.position[0] + t.delta.pageX,
  //       finger.position[1] + t.delta.pageY
  //     ];
  //   }
  // });
  return entities;
};

const PressFinger = (entities, { touches }) => {
  //
  // //-- I'm choosing to update the game state (entities) directly for the sake of brevity and simplicity.
  // //-- There's nothing stopping you from treating the game state as immutable and returning a copy..
  // //-- Example: return { ...entities, t.id: { UPDATED COMPONENTS }};
  // //-- That said, it's probably worth considering performance implications in either case.
  //
  touches.filter(t => t.type === "press").forEach(t => {
    let finger = entities[t.id];
    if (finger && finger.color==='pink') {
      finger.color = 'red';
    }
    else if(finger && finger.color==='red'){
      finger.color='pink';
   }
   if (finger && finger.position) {
     finger.position = [
      finger.position[0] + 5,
      finger.position[1]
   ];
}
  });
  return entities;
};
export { MoveFinger, PressFinger };
