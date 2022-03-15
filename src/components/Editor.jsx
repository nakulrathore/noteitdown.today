import React, { useState, useEffect, useRef } from "react";

function Editor({ inCompactMode }) {
  const [textToSet, setTextToSet] = useState("");
  const editorRef = useRef(null);

  useEffect(() => {
    setTextToSet(localStorage.noteText ? localStorage.noteText : "");
    editorRef.current.focus();
  }, []);

  function handleChange(event) {
    const text = event.target.value;
    localStorage.noteText = text;
    setTextToSet(text);
  }

  return (
    <textarea
      ref={editorRef}
      onChange={handleChange}
      name="editor"
      id="editor"
      placeholder="Start typing..."
      value={textToSet}
      className={inCompactMode ? "compact-mode" : ""}
    ></textarea>
  );
}

export default Editor;
