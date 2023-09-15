import React, { useState } from "react";
import ImageGenerator from "./components/ImagesGenerator/ImageGenerator";
import VideoScriptGenerator from "./components/VideoScriptGenerator/VideoScriptGenerator";
import { VideoSegment } from "./types";
import Segments from "./components/Segments/Segments";
import VideoOutput from "./components/VideoOutput/VideoOutput";

enum PROMPTS {
  VIDEO_SCRIPT = "VIDEO_SCRIPT",
  AUDIO_IMAGE_GENERATION = "AUDIO_IMAGE_GENERATION",
  VIDEO_OUTPUT = "VIDEO_OUTPUT",
}

function App() {
  const [step, setStep] = useState<PROMPTS>(PROMPTS.VIDEO_SCRIPT);
  const [segments, setSegments] = useState<VideoSegment[]>([
    { imageScript: "He", voiceScript: "He" },
  ]);
  const [videoUrl, setVideoUrl] = useState("");
  function handleSelectSegments(videoSegments: VideoSegment[]) {
    console.log("segments", videoSegments);
    setSegments(videoSegments);
    setStep(PROMPTS.AUDIO_IMAGE_GENERATION);
  }

  function renderComponent() {
    switch (step) {
      case PROMPTS.VIDEO_SCRIPT:
        return <VideoScriptGenerator onSubmit={handleSelectSegments} />;
      case PROMPTS.AUDIO_IMAGE_GENERATION:
        return (
          <Segments
            segments={segments}
            onVideoUrlGenerated={(url) => {
              setVideoUrl(url);
              setStep(PROMPTS.VIDEO_OUTPUT);
            }}
          />
        );

      case PROMPTS.VIDEO_OUTPUT:
        return <VideoOutput videoUrl={videoUrl} />;

      default:
        return <div>Steps not supported</div>;
    }
  }

  return <div className="container mx-auto">{renderComponent()}</div>;
}

export default App;
