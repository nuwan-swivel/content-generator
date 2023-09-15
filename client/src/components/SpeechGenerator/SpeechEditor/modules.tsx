import { insertPause, insertProsody, insertDelay } from "./toolbarIconHandler";

export const modules = {
  toolbar: {
    container: "#toolbar",
    handlers: {
      insertPause: insertPause,
      insertProsody: insertProsody,
      insertDelay: insertDelay,
    },
  },
  clipboard: {
    matchVisual: false,
  },
};
