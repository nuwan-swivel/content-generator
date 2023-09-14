import React, { useState } from "react";
import logo from "./logo.svg";
import ImageGeneration from "./components/image-generation";
import StartPage from "./components/start";
function App() {
  const [selectedScript, SetSelectedScript] = useState<string | undefined>(
    undefined
  );
  return (
    <div className="App">
      {/* {!selectedScript && (
        <StartPage onSelectScript={(script) => SetSelectedScript(script)} />
      )}
      {selectedScript && <ImageGeneration selectedScript={selectedScript} />} */}
      <ImageGeneration selectedScript={"Hello"} />
    </div>
  );
}

export default App;
