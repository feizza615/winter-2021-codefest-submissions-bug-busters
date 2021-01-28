import { Dimensions} from "react-native";
import React from "react";
import { Finger } from "./renderers";

const Restart = (entities, { touches, dispatch, events}) => {
  if (events.length){
    for(let e=0; e<events.length; e++){
      if (events[e].type === "restart" ){
        const windowWidth = Dimensions.get('window').width;
        const dotPlacement = windowWidth/3;
        entities={
          1: { selected:0, pairedB4: -1, color:'pink' , position: [Math.floor(Math.random()*(dotPlacement-60)+30),  Math.floor(Math.random()*(160)+20)], renderer: <Finger />}, //-- Notice that each entity has a unique id (required)
          2: { selected:0, pairedB4: -1, color:'pink' , position: [Math.floor(Math.random()*(dotPlacement-60)+dotPlacement+30),Math.floor(Math.random()*(160)+20)], renderer: <Finger />}, //-- and a renderer property (optional). If no renderer
          3: { selected:0, pairedB4: -1, color:'pink' , position: [Math.floor(Math.random()*(dotPlacement-60)+2*dotPlacement+30), Math.floor(Math.random()*(160)+20)], renderer: <Finger />}, //-- is supplied with the entity - it won't get displayed.
          4: { selected:0, pairedB4: -1, color:'pink' , position: [Math.floor(Math.random()*(dotPlacement-60)+30), Math.floor(Math.random()*(160)+220)], renderer: <Finger />},
          5: { selected:0, pairedB4: -1, color:'pink' , position: [Math.floor(Math.random()*(dotPlacement-60)+dotPlacement+30), Math.floor(Math.random()*(160)+220)], renderer: <Finger />},
          6: { selected:0, pairedB4: -1, color:'pink' , position: [Math.floor(Math.random()*(dotPlacement-60)+2*dotPlacement+30), Math.floor(Math.random()*(160)+220)], renderer: <Finger />},
        }
      }
    }
  }
  return entities
};

function getRandomIn(array) {
  return Math.floor(Math.random() * array.length);
}

const ChangeColor = (entities, { touches, dispatch, events}) => {
  if (events.length){
    for(let e=0; e<events.length; e++){
      if (events[e].type === "next-move" ){

        var length=Object.keys(entities).length
        var eligibleArray = []

        for (var i = 1; i<=length; i++){ //loops through dots
          d= entities[i] //d for dot

          if (d.selected <2){
            d.color = 'pink' //makes all the unused dots back to pink
            eligibleArray.push(i) //adds dots that havent been selected 2x already to array
          }

          else if( d.selected==2){
            d.color = 'gray' //grays out the used twice dots
          }
        }

        if (eligibleArray.length >1){ //if theres two dots left which there always should be unless the game is done

          let ran1= getRandomIn(eligibleArray) //gets a random index in eligibleArray
          let id1=eligibleArray[ran1]
          dotOne = entities[id1] //uses id to get one dot
          console.log(id1)
          eligibleArray.splice(ran1,1) //removes that id from the eligible list

          //this bit removes the dot that dotOne was previously paired with, if it exists and is still in the array
          let indexofpairedb4= eligibleArray.indexOf(dotOne.pairedB4) //indexOf() returns -1 if not found
          if (indexofpairedb4 > -1 && eligibleArray.length >1) { //if its not found, means the pairedB4 dot was used twice already OR dotOne is new
            console.log(eligibleArray)
            eligibleArray.splice(indexofpairedb4,1) //removes the dot that was already paired with this one

            console.log(eligibleArray)
          }

          //gets second dot entity
          //handles an edge case
          if ((eligibleArray.length === 2) && (entities[eligibleArray[0]].selected === 0)){
              id2= eligibleArray[0]
          }
          else if ((eligibleArray.length === 2) && (entities[eligibleArray[1]].selected === 0)){
              id2= eligibleArray[1]
          }
          else{ //regular case
            let ran2=getRandomIn(eligibleArray)
            id2= eligibleArray[ran2]
          }
          console.log(id2)
          dotTwo = entities[id2]

          //makes these two red
          dotOne.color = 'red';
          dotTwo.color = 'red';
          //adds to the counter
          dotOne.selected = dotOne.selected + 1
          dotTwo.selected = dotTwo.selected + 1
          //records that they were pairedB4
          //dont have to worry about if they were paired with something else before, because the selected counter handles that
          dotOne.pairedB4 = id2 //id of dot two
          dotTwo.pairedB4 = id2//id of dot one
        }
  }}}
  return entities;
};

export { ChangeColor, Restart };
