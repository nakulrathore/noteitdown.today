import React, { useState, useEffect } from "react";

function Editor() {
  const [textToSet, setTextToSet] = useState("");

  useEffect(() => {
    setTextToSet(localStorage.idd ? localStorage.idd : "");
    document.getElementById('editor').focus()
  }, []);


  function handleChange(event) {
    const text = event.target.value;
    localStorage.idd = text;
    setTextToSet(text);
  }

  return (
    <textarea
      onChange={handleChange}
      name="editor"
      id="editor"
      placeholder="type here..."
      value={textToSet}
    ></textarea>
  );
}

export default Editor;
