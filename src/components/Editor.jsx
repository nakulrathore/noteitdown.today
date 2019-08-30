import React, { Component } from "react";
import logo from "../icons/apple-icon-76x76.png";
// import logo from "../public/icons/apple-icon-76x76.png";

class Editor extends Component {
  componentDidMount() {
    this.Editor.value = localStorage.idd;
    this.Editor.focus();
  }

  handleChange(event) {
    localStorage.idd = event.target.value;
  }

  copyText(){
    this.Editor.select();
    document.execCommand('copy');
    this.Editor.focus();
  }

  saveTextAsFile() {
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

  render() {
    return (
      <section>
        <div className="header">
          <a href="https://github.com/nakulrathore" target="_blank" rel="noopener noreferrer" ref="noreffer">
            <img src={logo} alt="note" />
            <span>note</span>
          </a>
          <section className="controlls">
            <button onClick={this.saveTextAsFile.bind(this)}>⌔ download</button>
            <button onClick={this.copyText.bind(this)}>○ copy</button>
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
          autofocus
        >
          hello there
        </textarea>
      </section>
    );
  }
}

export default Editor;
