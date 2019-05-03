import React, { useState } from "react";
import { useSprings } from "react-spring/hooks";
import { useGesture } from "react-with-gesture";
//var Spinner = require('react-spinkit');
import Spinner from "react-spinkit";
import ReactDOM from "react-dom";

import Card from "./Card";
import data from "../kidsMovies";
import "../styles/Deck.css";
let finish = false
const test = new Set();
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

let scores = {'Action':0,'Adventure':0,'Fantasy':0,'Comedy':0,'Drama':0}
let movieRecs = {'Action': ['The Incredibles'], 'Adventure': ['The Jungle Book', 'The Lego Movie', 'Zootopia', 'Finding Dory'], 'Fantasy': ['The Chronicles of Narnia'], 'Comedy':['Ice Age'], 'Drama':['Free Willy']}

function keepScore(genre){
  if (genre === 'Action'){
    scores['Action'] = scores['Action'] + 1
  }
  if (genre === 'Adventure'){
    scores['Adventure'] = scores['Adventure'] + 1
  }
  if (genre === 'Fantasy'){
    scores['Fantasy'] = scores['Fantasy'] + 1
  }
  if (genre === 'Comedy'){
    scores['Comedy'] = scores['Comedy'] + 1
  }
  if (genre === 'Drama'){
    scores['Drama'] = scores['Drama'] + 1
  }
}

function releaseScore(){
  let totalScores = 0
  let maxGenre = ""
  let max = 0
  let secondBest = ""
  let secondMax = ""
  for (var key in scores){
    totalScores = totalScores + scores[key]
    if (scores[key] > max){
      maxGenre = key
      max = scores[key]
    }
  }

  for (var seckey in scores){
    if (scores[seckey] > secondMax && seckey !== maxGenre){
      secondBest = seckey
      secondMax = scores[seckey]
    }
  }

  var movieRec
  let ranNum = Math.floor((Math.random() * 3) + 0)
  let movieRecGenre = movieRecs[maxGenre]
  if (maxGenre === "Adventure"){
    movieRec = movieRecGenre[ranNum]
  }
  else{
    movieRec = movieRecGenre[0]
  }


  max = parseInt((max*100)/totalScores)
  secondMax = parseInt((secondMax*100)/totalScores)

  let stringMsg = "<h4>Your favourite Genre: " + maxGenre + " (" + max + "% Match), but you also like " + secondBest + " (" + secondMax + "% Match)</h4><h4> A movie you would enjoy: " + movieRec + "</h4>"
  //alert(stringMsg)
  //const result = () => stringMsg;
  return stringMsg
  //alert(stringMsg)
}

function showResult(score){
  document.getElementById("resultText").innerHTML = score
  document.getElementById("root").style.visibility = "hidden";
  document.getElementById("spin").style.display = "none";
  document.getElementById("result").style.display = "block";
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
        let spin = <Spinner name="line-scale-party" color="#f38b00" fadeIn="half"/>
        document.getElementById("root").style.visibility = "hidden";
        document.getElementById("green-thumb").style.display = "none";
        document.getElementById("red-thumb").style.display = "none";
        ReactDOM.render(spin, document.getElementById("spinner"));
        document.getElementById("spin").style.display = "block";
        score = releaseScore();
        //setTimeout(showResult(score), 60000);
        setTimeout(() => showResult(score), 4000);
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
