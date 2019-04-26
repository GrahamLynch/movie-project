import React from "react";
import Deck from "./components/Deck";
import Result from "./components/Result";

const App = () => <Deck />;
console.log(App)
if (<Deck /> === "hi"){
    App = () => <Result result="yes" />
}
export default App;
