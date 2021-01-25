


function getRandomID(array) {
  return Math.floor(Math.random() * array.length);
}

const ChangeColor = (entities, { touches }) => {

  //-- I'm choosing to update the game state (entities) directly for the sake of brevity and simplicity.
  //-- There's nothing stopping you from treating the game state as immutable and returning a copy..
  //-- Example: return { ...entities, t.id: { UPDATED COMPONENTS }};
  //-- That said, it's probably worth considering performance implications in either case.

  //should i make a button entity??
  //do some stuff with if you touch that button.....
  var eligibleArray = []
  for (var i =1; i<7; i++){//entities.size is not a thing
    //console.log("Aaa")//not going here
    t= entities[i]
    t.color = 'pink'   //makes all the dots back to pink
    if (t.selected < 2){
      eligibleArray.push(t.id) //adds dots that havent been selected 2x already to array
    }
  }

  touches.filter(t => t.type === "press").forEach(t => {
    console.log(t.event.pageX, t.event.pageY)
    if (0<=t.event.pageX <3 && 0<=t.event.pageY <3){
      //gets random index of eligibleArray
      ran1= getRandomID(eligibleArray)
      //uses id to get one dot entity
      dotOne = entities[eligibleArray[ran1]]
      //removes that id from the eligible list
      eligibleArray.splice(ran1,1)
      //gets second dot entity
      dotTwo = entities[eligibleArray[getRandomID(eligibleArray)]]
      console.log("aaaa")

      //makes these two red
      dotOne.color = 'red';
      dotTwo.color = 'red';
      //adds to the counter
      dotOne.selected = dotOne.selected + 1
      dotTwo.selected = dotTwo.selected + 1
    }
  })




  return entities;
};

export { ChangeColor };
