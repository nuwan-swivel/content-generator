import React, { useState } from "react";
import ImageGenerator from "./components/ImagesGenerator/ImageGenerator";
import VideoScriptGenerator from "./components/VideoScriptGenerator/VideoScriptGenerator";
function App() {
  const [selectedScript, SetSelectedScript] = useState<string | undefined>(
    undefined
  );
  return (
    <div className="App">
      {!selectedScript && (
        <VideoScriptGenerator
          onSelectScript={(script) => SetSelectedScript(script)}
        />
      )}
      {selectedScript && <ImageGenerator selectedScript={selectedScript} />}
    </div>
  );
}

export default App;
