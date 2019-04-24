import React, { Component } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ServerApp from "./ServerApp";

/*
const go = document.querySelector('#go');
ReactDOM.render(e(LikeButton), domContainer);


const intro = (
    <div>
      <h1>Welcome!</h1>
      <p>
        The purpose of this game is to recommend a movie to you based on the choices you
        choose. Swipe RIGHT if you like a movie, swipe LEFT if you don't like a movie.
      </p>
      <p>Press GO when you're ready</p>
      <input onClick={showCards()} id="go" type="submit" value="GO" />
    </div>
      );

const introStyle = {
    visibility: "hidden",
};

ReactDOM.render(intro, document.getElementById("root"));
ReactDOM.render(<App />, document.getElementById("root"));
*/

//const go = document.querySelector('#go');
/*
class ShowCards extends Component{
    ShowCards(){
        ReactDOM.render(<App />, document.getElementById("root"));
    }

    render(){
        const intro = (
            <div>
              <h1>Welcome!</h1>
              <p>
                The purpose of this game is to recommend a movie to you based on the choices you
                choose. Swipe RIGHT if you like a movie, swipe LEFT if you don't like a movie.
              </p>
              <p>Press GO when you're ready</p>
              <button id="go" type="submit" value="GO" onClick={this.ShowCards()}/>
            </div>
        );

        return intro;
    }
}

export default ShowCards;
*/

//ReactDOM.render(<ServerApp />, document.getElementById("root"));
ReactDOM.render(<App />, document.getElementById("root"));