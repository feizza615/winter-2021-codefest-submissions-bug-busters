


function getRandomID(array) {
  return Math.floor(Math.random() * array.length);
}

const ChangeColor = (entities, { touches, dispatch, events }) => {
  var length=Object.keys(entities).length
  var eligibleArray = []
  for (var i =1; i<length; i++){
    //console.log("Aaa")//not going here
    t= entities[i]
    //t.color = 'pink'   //makes all the dots back to pink
    //^dont want it to do that continuously
    if (t.selected < 2){
      eligibleArray.push(t.id) //adds dots that havent been selected 2x already to array
    }
  }
  if (events.length){
    for(let i=0; i<events.length; i++){
        if (events[i].type === "next-move" ){
            
            ran1= getRandomID(eligibleArray)
            console.log(entities[1].id) //id is not working!!
            //uses id to get one dot entity
            dotOne = entities[ran1]//[eligibleArray[ran1]]
            //removes that id from the eligible list
            eligibleArray.splice(ran1,1)
            //gets second dot entity
            //dotTwo = entities[1]//[eligibleArray[getRandomID(eligibleArray)]]
            //console.log("aaaa")

            //makes these two red
            //entities[[eligibleArray[ran1]]].color = 'red';
          
           // dotOne.color = 'red'
            //adds to the counter
            //dotOne.selected = dotOne.selected + 1
            //dotTwo.selected = dotTwo.selected + 1
        } 
    }
}
  //-- I'm choosing to update the game state (entities) directly for the sake of brevity and simplicity.
  //-- There's nothing stopping you from treating the game state as immutable and returning a copy..
  //-- Example: return { ...entities, t.id: { UPDATED COMPONENTS }};
  //-- That said, it's probably worth considering performance implications in either case.

  //should i make a button entity??
  //do some stuff with if you touch that button.....


  // touches.filter(t => t.type === "press").forEach(t => {
  //   console.log(t.event.pageX, t.event.pageY) //probably pixels
  //   if (0<=t.event.pageX <3 && 0<=t.event.pageY <3){ //why is it going into here?
  //     //gets random index of eligibleArray
  //     ran1= getRandomID(eligibleArray)
  //     //uses id to get one dot entity
  //     dotOne = entities[2]//[eligibleArray[ran1]]
  //     //removes that id from the eligible list
  //     eligibleArray.splice(ran1,1)
  //     //gets second dot entity
  //     dotTwo = entities[1]//[eligibleArray[getRandomID(eligibleArray)]]
  //     console.log("aaaa")

  //     //makes these two red
  //     entities[[eligibleArray[ran1]]].color = 'red';
  //     dotTwo.color = 'red';
  //     //adds to the counter
  //     dotOne.selected = dotOne.selected + 1
  //     dotTwo.selected = dotTwo.selected + 1
  //   }
  // })




  return entities;
};

export { ChangeColor };
