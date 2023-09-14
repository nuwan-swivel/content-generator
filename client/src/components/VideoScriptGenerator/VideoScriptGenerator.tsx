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
import OpenAI from "openai";
import React, { useState } from "react";
import "./VideoScriptGenerator.css";

interface Props {
  onSelectScript: (script: string) => void;
}
function VideoScriptGenerator({ onSelectScript }: Props) {
  const [prompt, setPrompt] = useState("");
  const [scripts, setScripts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onGenerateClick = async () => {
    setIsLoading(true);
    const openAi = new OpenAI({
      apiKey: process.env.REACT_APP_OPEN_AI_API_KEY,
      dangerouslyAllowBrowser: true,
    });

    const content = `write 3 transcripts for the following description and output each inside double quotes as a csv string and don't include headers, placeholders, numbering or indexes. Description:  ${prompt}`;

    const result = await openAi.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content }],
      temperature: 0.3,
    });

    // setScripts(result.choices.pop()?.message?.content?.split(",,") ?? []);
    const matches = result.choices.pop()?.message?.content?.match(/"(.*?)"/g);

    if (matches) {
      for (const element of matches) {
        const match = element;
        const substring = match.substring(1, match.length - 1); // quotation mark removing
        console.log(substring);
      }
      setScripts([...matches]);
    }
    setIsLoading(false);
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

      {scripts.length > 0 && (
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
                  <Button onClick={() => onSelectScript(script)}>
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
    </div>
  );
}

export default VideoScriptGenerator;
