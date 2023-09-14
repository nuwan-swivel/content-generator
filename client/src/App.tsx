import React, { useState } from "react";
import ImageGenerator from "./components/ImagesGenerator/ImageGenerator";
import SpeechGenerator from "./components/SpeechGenerator/SpeechGenerator";
import VideoScriptGenerator from "./components/VideoScriptGenerator/VideoScriptGenerator";

enum PROMPTS {
  VIDEO_SCRIPT = "VIDEO_SCRIPT",
  IMAGE_GENERATION = "IMAGE_GENERATION",
  AUDIO_GENERATION = "AUDIO_GENERATION",
}

function App() {
  const [step, setStep] = useState<PROMPTS>(PROMPTS.VIDEO_SCRIPT);

  const [videoScript, setVideoScript] = useState<string | undefined>(undefined);

  function handleSelectVideoScript(script: string) {
    setVideoScript(script);
    setStep(PROMPTS.IMAGE_GENERATION);
  }

  function renderComponent() {
    switch (step) {
      case PROMPTS.VIDEO_SCRIPT:
        return (
          <VideoScriptGenerator onSelectScript={handleSelectVideoScript} />
        );
      case PROMPTS.IMAGE_GENERATION:
        return <ImageGenerator selectedScript={videoScript || ""} />;
      case PROMPTS.AUDIO_GENERATION:
        return <SpeechGenerator />;
      default:
        return <div>Steps not supported</div>;
    }
  }

  return <div className="container mx-auto">{renderComponent()}</div>;
}

export default App;
