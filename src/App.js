import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Editor from "./components/Editor";
import "./App.scss";
import ReactGA from "react-ga";

function App() {
  const [inCompactMode, setInCompactMode] = useState(false);
  const initializeReactGA = () => {
    ReactGA.initialize("UA-146775995-1");
    ReactGA.pageview("/");
  };

  const getIfInCompactMode = () => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    let isInCompactMode = params.compact;
    if (isInCompactMode !== null) {
      console.clear();
      console.log("Compact mode enabled!");
      setInCompactMode(true);
    }
  };

  const captureAction = (action) => {
    ReactGA.event({
      category: "User",
      action,
    });
  };

  useEffect(() => {
    initializeReactGA();
    getIfInCompactMode();
  }, []);

  return (
    <div className="App">
      <Header />
      <Editor captureAction={captureAction} inCompactMode={inCompactMode} />
    </div>
  );
}

export default App;
