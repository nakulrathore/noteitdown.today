import React, { useState, useEffect } from "react";

function Header() {
  const [isDarkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDarkModeSet = localStorage.darkMode === "true";
    setDarkMode(isDarkModeSet);
    setAttribute(isDarkModeSet);
  }, []);

  function setAttribute(isDarkModeSet) {
    document.documentElement.setAttribute(
      "data-theme",
      isDarkModeSet ? "dark" : "light"
    );
  }

  function toggleDarkMode() {
    setDarkMode(!isDarkMode);
    localStorage.darkMode = !isDarkMode;
    setAttribute(!isDarkMode);
  }


  function copyText() {
    document.getElementById('editor').select();
    document.execCommand("copy");
  }


  function saveTextAsFile() {
    let textToWrite = localStorage.idd ? localStorage.idd : "";
    textToWrite = textToWrite.replace(/\n/g, "\r\n");
    let textFileAsBlob = new Blob([textToWrite], { type: "text/plain" });

    let utc = new Date()
      .toJSON()
      .slice(0, 10)
      .replace(/-/g, "/");
    let fileNameToSaveAs = `note ${utc}.txt`;
    let downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.URL != null) {
      // Chrome allows the link to be clicked without actually adding it to the DOM.
      downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    } else {
      // Firefox requires the link to be added to the DOM before it can be clicked.
      downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
      downloadLink.onclick = event => document.body.removeChild(event.target);
      downloadLink.style.display = "none";
      document.body.appendChild(downloadLink);
    }

    downloadLink.click();
  }

  return (
    <header>
      <button className="logo-dropdown">
        <span className="logo">
          fuckingNotepad
        </span>
        <ul className="dropdown">
          <li onClick={toggleDarkMode} className={`theme-indicator`}>
            {!isDarkMode ? "dark" : "light"}Theme
          </li>
          <li onClick={saveTextAsFile}>download</li>
          <li onClick={copyText}>copy</li>
          <div className="info">
            works offline, data dosn't leave your browser
          </div>
        </ul>
      </button>
    </header>
  );
}
export default Header;
