import { insertEmphasis } from "./insertEmphasis";

export const modules = {
  toolbar: {
    container: "#toolbar",
    handlers: {
      insertEmphasis: insertEmphasis,
    },
  },
  clipboard: {
    matchVisual: false,
  },
};
