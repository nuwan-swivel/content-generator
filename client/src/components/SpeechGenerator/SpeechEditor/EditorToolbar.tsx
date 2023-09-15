import { styled } from "styled-components";
import { PauseIcon, BreakIcon, ProsodyIcon } from "./Icons";

const ToolbarWrapper = styled.div`
  button {
    margin: 0 5px;
  }
`;

export const EditorToolbar = () => (
  <ToolbarWrapper id="toolbar">
    <button className="ql-insertPause">
      <PauseIcon />
    </button>
    <button className="ql-insertDelay">
      <BreakIcon />
    </button>
    <button className="ql-insertProsody">
      <ProsodyIcon />
    </button>
  </ToolbarWrapper>
);
