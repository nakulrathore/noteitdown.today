import React, { Component } from "react";
import "./App.scss";
import ReactGA from "react-ga";
import Editor from "./components/Editor";

class App extends Component {
  initializeReactGA() {
    ReactGA.initialize("UA-146775995-1");
    ReactGA.pageview("/");
  }

  captureAction(action) {
    ReactGA.event({
      category: "User",
      action
    });
  }
  componentWillMount() {
    this.initializeReactGA();
  }
  render() {
    return (
      <div className="App">
        <Editor captureAction={this.captureAction} />
      </div>
    );
  }
}

export default App;
