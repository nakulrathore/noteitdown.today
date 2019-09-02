import React, { Component } from "react";
import logo from "../icons/apple-icon-76x76.png";
// import logo from "../public/icons/apple-icon-76x76.png";

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      darkMode: false
    };
  }

  componentDidMount() {
    var newState = Object.assign({}, this.state);
    // eslint-disable-next-line 
    newState.darkMode = localStorage.darkMode ? localStorage.darkMode == 'true'  : false; 
    document.documentElement.setAttribute('data-theme', newState.darkMode ? 'dark' : 'light');

    this.setState(newState);

    this.Editor.value = localStorage.idd ? localStorage.idd : "";
    this.Editor.focus();
  }

  handleChange(event) {
    localStorage.idd = event.target.value;
  }

  copyText(action) {
    this.props.captureAction(action);
    this.Editor.select();
    document.execCommand("copy");
    this.Editor.focus();
  }

  saveTextAsFile(action) {
    this.props.captureAction(action);
    let textToWrite = this.Editor.value;
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

  toggleDarkMode(event) {
    let newState = Object.assign({}, this.state);
    let value = event.target.checked;
    newState.darkMode = value;
    localStorage.darkMode = value;
    document.documentElement.setAttribute('data-theme', value ? 'dark' : 'light');
    this.setState(newState);
  }

  render() {
    return (
      <section>
        <div className="header">
          <a href="https://github.com/nakulrathore" target="_blank" rel="noopener noreferrer" ref="noreffer">
            <img src={logo} alt="note" />
            <span>note</span>
          </a>
          <section className="controlls">
            <label class="switch" title="switch theme">
              <input type="checkbox" checked={this.state.darkMode} onChange={this.toggleDarkMode.bind(this)} />
              <span class="slider round"></span>
            </label>
            <button onClick={this.saveTextAsFile.bind(this, "download")}>⌔ download</button>
            <button onClick={this.copyText.bind(this, "copy")}>○ copy</button>
          </section>
        </div>
        <textarea
          onChange={this.handleChange}
          ref={input => {
            this.Editor = input;
          }}
          name="editor"
          id="editor"
          placeholder="type here..."
        ></textarea>
      </section>
    );
  }
}

export default Editor;
