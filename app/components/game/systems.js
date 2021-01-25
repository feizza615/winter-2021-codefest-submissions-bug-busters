


function getRandomIn(array) {
  return Math.floor(Math.random() * array.length);
}

const ChangeColor = (entities, { touches }) => {

  //-- I'm choosing to update the game state (entities) directly for the sake of brevity and simplicity.
  //-- There's nothing stopping you from treating the game state as immutable and returning a copy..
  //-- Example: return { ...entities, t.id: { UPDATED COMPONENTS }};
  //-- That said, it's probably worth considering performance implications in either case.



  touches.filter(t => t.type === "press").forEach(t => {
    var length=Object.keys(entities).length
    var eligibleArray = []
    for (var i =1; i<length; i++){
      //console.log("Aaa")//not going here
      g= entities[i]
      if (g.selected < 2){
        g.color = 'pink' //makes all the dots back to pink
        eligibleArray.push(i) //adds dots that havent been selected 2x already to array
      }
      else{
        g.color = 'gray' //grays out the done dots
      }
    }


    //console.log(t.event.pageX, t.event.pageY) //probably pixels
    if (eligibleArray.length >1){ //why is it going into here?
      //gets random index of eligibleArray
      ran1= getRandomIn(eligibleArray) //works
      //uses id to get one dot entity
      dotOne = entities[eligibleArray[ran1]]
      console.log(ran1, eligibleArray[ran1])
      //removes that id from the eligible list
      eligibleArray.splice(ran1,1)
      //gets second dot entity
      dotTwo = entities[eligibleArray[getRandomIn(eligibleArray)]]
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
