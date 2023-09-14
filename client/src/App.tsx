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
  const [segments, setSegments] = useState<VideoSegment[]>([]);

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
        return <Segments segments={segments} />;
      case PROMPTS.VIDEO_OUTPUT:
        return (
          <VideoOutput
            videoUrl={
              "https://player.vimeo.com/video/522678746/config?autopause=1&byline=0&collections=0&context=Vimeo%5CController%5CClipController.main&default_to_hd=1&h=9029ef9102&outro=nothing&portrait=0&share=1&speed=1&title=0&watch_trailer=0&s=63509a2e2ecc02e187759ef96dfa1c26ffbc178c_1694803587"
            }
          />
        );

      default:
        return <div>Steps not supported</div>;
    }
  }

  return <div className="container mx-auto">{renderComponent()}</div>;
}

export default App;
