import { useState } from "react";
import ReactQuill from "react-quill";
import { styled } from "styled-components";
import { EditorToolbar } from "./EditorToolbar";
import { modules } from "./modules";

import "react-quill/dist/quill.snow.css";

interface SpeechEditorProps {
  inputValue: string;
  onTextChanged: (text: string) => void;
}

const EditorWrapper = styled.div`
  width: 600px;
  height: 350px;
  margin: 0 auto;
`;

export default function SpeechEditor({ onTextChanged, inputValue }: SpeechEditorProps) {

  const [value, setValue] = useState<string>(inputValue);

  const formats = [""];

  function handleOnChange(innerText: string) {
    setValue(innerText);
    let editorText: string = innerText.replaceAll(/&lt;/g, "<");
    editorText = editorText.replaceAll(/&gt;/g, ">");
    editorText = editorText.replaceAll(/<br>/g, "");
    onTextChanged(`<speak>${editorText}</speak>`);
  }

  return (
    <EditorWrapper>
      <EditorToolbar />
      <ReactQuill
        style={{ height: "300px" }}
        theme="snow"
        modules={modules}
        formats={formats}
        value={value}
        onChange={handleOnChange}
      />
    </EditorWrapper>
  );
}
