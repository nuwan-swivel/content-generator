import { styled } from "styled-components";
const IconWrapper = styled.div`
  display: inline-block;
  margin: 5px;
  padding: 2px 5px;
  font-size: 10px;
  text-transform: uppercase;
  background: #cccccc;
  border: 1px solid #dddddd;
  border-radius: 5px;
`;

export const PauseIcon = () => (
  <IconWrapper>
    <span className="pause-icon" title="Break">PA</span>
  </IconWrapper>
);

export const BreakIcon = () => (
  <IconWrapper>
    <span className="break-icon" title="Break">BR</span>
  </IconWrapper>
);

export const ProsodyIcon = () => (
  <IconWrapper>
    <span className="prosody-icon" title="Prosody">PR</span>
  </IconWrapper>
);
