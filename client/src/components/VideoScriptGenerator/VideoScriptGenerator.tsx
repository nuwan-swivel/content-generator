import {
  Button,
  Input,
  Spinner,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import "./VideoScriptGenerator.css";
import { getChatCompletions } from "../../helpers/openAI.helper";
import { VideoSegment } from "../../types";

interface Props {
  onSubmit: (segments: VideoSegment[]) => void;
}
function VideoScriptGenerator({ onSubmit }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState(
    "Introduction video for swivel hackathon 2023"
  );
  const [scripts, setScripts] = useState<string[]>([]);
  const [selectedScript, setSelectedScript] = useState<string | null>(null);
  const [segmentCount, setSegmentCount] = useState(0);
  const [imageScripts, setImageDescriptions] = useState<string[]>([]);
  const [voiceScripts, setVoiceDescriptions] = useState<string[]>([]);

  const onGenerateClick = async () => {
    setIsLoading(true);

    const content = `write 3 transcripts for the following description and output each inside double quotes as a csv string and don't include headers, placeholders, numbering or indexes. Description:  ${prompt}`;
    const matches = await getChatCompletions(content, /"(.*?)"/g);

    if (matches) {
      setScripts([...matches]);
    }
    setIsLoading(false);
  };

  const onNextClick = async () => {
    setIsLoading(true);
    const imageScriptContent = `Generate ${segmentCount} image descriptions to cover the following content for a video presentation and separate them by double quotes. "${selectedScript}"`;
    const imageScriptMatches = await getChatCompletions(
      imageScriptContent,
      /"(.*?)"/g
    );

    if (imageScriptMatches) {
      setImageDescriptions(imageScriptMatches);
    }

    const voiceScriptContent = `Generate ${segmentCount} voice scripts to describe the following content for a video presentation and separate them by double quotes. "${selectedScript}"`;
    const videoScriptMatches = await getChatCompletions(
      voiceScriptContent,
      /"(.*?)"/g
    );

    if (videoScriptMatches) {
      setVoiceDescriptions(videoScriptMatches);
    }

    setIsLoading(false);
    onSubmit(
      imageScripts.map((imageScript, i) => ({
        imageScript,
        voiceScript: voiceScripts[i],
      }))
    );
  };

  return (
    <div className="wrapper">
      {scripts.length === 0 && (
        <>
          <Typography variant="h3" color="blue-gray" className="mb-2">
            What do you want to make?
          </Typography>

          <div className="input-wrapper">
            <Input
              label="Prompt"
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              crossOrigin={undefined}
            />
          </div>
          <Button className="flex justify-center" onClick={onGenerateClick}>
            {isLoading ? (
              <>
                <Spinner /> <span className="mx-3">Generating...</span>
              </>
            ) : (
              "Generate"
            )}
          </Button>
        </>
      )}

      {scripts.length > 0 && !selectedScript && (
        <>
          <Typography variant="h3" color="blue-gray" className="mb-2">
            Select a script
          </Typography>
          <Tabs value="html">
            <TabsHeader>
              {scripts.map((_s, i) => (
                <Tab key={i} value={i}>
                  Script {i + 1}
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody>
              {scripts.map((script, i) => (
                <TabPanel key={i} value={i}>
                  <Typography variant="paragraph" className="mb-1">
                    {script}
                  </Typography>
                  <Button onClick={() => setSelectedScript(script)}>
                    Select script {i + 1}
                  </Button>
                </TabPanel>
              ))}
            </TabsBody>
          </Tabs>
          <Button
            className="mt-3"
            variant="outlined"
            onClick={() => setScripts([])}
          >
            Retry
          </Button>
        </>
      )}

      {selectedScript && (
        <>
          <Typography variant="h3" color="blue-gray" className="mb-2">
            How many segments do you need in the video?
          </Typography>

          <div className="input-wrapper">
            <Input
              label="Segment count"
              type="number"
              max={5}
              value={segmentCount}
              onChange={(e) => setSegmentCount(parseInt(e.target.value))}
              crossOrigin={undefined}
            />
          </div>
          <Button onClick={onNextClick}>
            {isLoading ? (
              <>
                <Spinner /> Loading...
              </>
            ) : (
              "Next"
            )}
          </Button>
        </>
      )}
    </div>
  );
}

export default VideoScriptGenerator;
