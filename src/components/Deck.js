import React, { useState } from "react";
import { useSprings } from "react-spring/hooks";
import { useGesture } from "react-with-gesture";

import Card from "./Card";
import data from "../data.js";

import "../styles/Deck.css";
import { longStackSupport } from "q";
let finish = false
const test = new Set();
const movieGenres = [];
function left(data){};
function right(i, cards){
  let genres = cards[i].props.data[i].genre
  genres.forEach(genre =>
    //test.add(genre)
    keepScore(genre)
  )
  
}
const to = i => ({
  x: 0,
  y: i * -10,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100
});
const from = i => ({ rot: 0, scale: 1.5, y: -1000 });

const trans = (r, s) =>
  `perspective(1500px) rotateX(30deg) rotateY(${r /
    10}deg) rotateZ(${r}deg) scale(${s})`;

let scores = {'action':0,'adventure':0,'sciFi':0,'comedy':0,'drama':0}

function keepScore(genre){
  if (genre === 'Action'){
    scores['action'] = scores['action'] + 1
  }
  if (genre === 'Adventure'){
    scores['adventure'] = scores['adventure'] + 1
  }
  if (genre === 'Sci-Fi'){
    scores['sciFi'] = scores['sciFi'] + 1
  }
  if (genre === 'Comedy'){
    scores['comedy'] = scores['comedy'] + 1
  }
  if (genre === 'Drama'){
    scores['drama'] = scores['drama'] + 1
  }
}

function findMax(arr){
  //let scores = {'action':0,'adventure':0,'sciFi':0,'comedy':0,'drama':0}
  /*
  arr.forEach(genre => {
    if (genre === 'action'){
      action = action + 1
    }
  }
  */
  console.log(arr[3])
  for (var i = 0; i < arr.length; i++) { 
    if (arr[i] === 'Action'){
      scores['action'] = scores['action'] + 1
    }
    if (arr[i] === 'Adventure'){
      scores['adventure'] = scores['adventure'] + 1
    }
    if (arr[i] === 'Sci-Fi'){
      scores['sciFi'] = scores['sciFi'] + 1
    }
    if (arr[i] === 'Comedy'){
      scores['comedy'] = scores['comedy'] + 1
    }
    if (arr[i] === 'Drama'){
      scores['drama'] = scores['drama'] + 1
    }
  }
}

function releaseScore(){
  let maxGenre = ""
  let max = 0
  for (var key in scores){
    //let stringMsg = key + ":" + scores[key]
    //alert(stringMsg)
    if (scores[key] > max){
      maxGenre = key
      max = scores[key]
    }
  }

  let stringMsg = "<div id='result'><img href=\"logo.png\" /><h1>Your favourite Genre: " + maxGenre + " </h1></div>"
  //alert(stringMsg)
  //const result = () => stringMsg;
  return stringMsg
  //alert(stringMsg)
}

function Deck() {
  var score;
  var returnVal;
  const [gone] = useState(() => new Set());

  const [props, set] = useSprings(data.length, i => ({
    ...to(i),
    from: from(i)
  }));

  const bind = useGesture(
    ({
      args: [index],
      down,
      delta: [xDelta],
      distance,
      direction: [xDir],
      velocity
    }) => {
      const trigger = velocity > 0.2;

      const dir = xDir < 0 ? -1 : 1;

      if (!down && trigger){
        dir === -1 ? left(index) : right(index, cards);
        gone.add(index);
      }
      set(i => {
        if (index !== i) return;
        const isGone = gone.has(index);

        const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0;

        const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0);

        const scale = down ? 1.1 : 1;
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 }
        };
      });

      if (!down && gone.size === data.length){
        //console.log(test)
        //findMax(test)
        score = releaseScore()
        document.getElementById("root").innerHTML = score
        document.getElementById("next").innerHTML = "<h1>Score is 5 </h1>"
        //alert(popular)
        //setTimeout(() => gone.clear() || set(i => to(i)), 600);

    }}
  );

  var cards = props.map(({ x, y, rot, scale, name }, i) => (
    <Card
      i={i}
      x={x}
      y={y}
      rot={rot}
      scale={scale}
      trans={trans}
      data={data}
      bind={bind}
      name={name}
    />),
    
  
  );
  
  //alert(cards[1].props.data[1].name);
  console.log("gone")
  console.log(gone)
  console.log("test")
  console.log(test)
  
  if (finish === true){
    alert(score)
    returnVal = "hi"
  }
  else{
    returnVal = cards
  }
  return returnVal;
  
  
}



export default Deck;
console.log("I GOT HERE")
