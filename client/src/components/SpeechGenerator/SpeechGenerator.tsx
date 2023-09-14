import { ReactElement, useState } from "react";
import { Polly, SynthesizeSpeechCommand } from "@aws-sdk/client-polly";
import { defaultText } from "./SpeechEditor/DefaultText";
import SpeechEditor from "./SpeechEditor/SpeechEditor";

interface SpeechGeneratorProps {}

const config = {
  region: "us-east-1",
  credentials: {
    accessKeyId: `${process.env.REACT_APP_AWS_ACCESS_KEY_ID}`,
    secretAccessKey: `${process.env.REACT_APP_AWS_SECRET_ACCESS_KEY}`,
  },
};

const pollyClient = new Polly(config);

export default function SpeechGenerator(
  props: SpeechGeneratorProps
): ReactElement {
  const [text, setText] = useState<string | null>(defaultText);
  const [audioURL, setAudioURL] = useState("");
  const [generating, setGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function handlePayButtonOnClick(): Promise<void> {
    if (text !== null) {
      try {
        const audio = await generateSpeech();
        if (audio) {
          const uInt8Array = await audio.transformToByteArray();
          const arrayBuffer = uInt8Array.buffer;
          const blob = new Blob([arrayBuffer]);
          setAudioURL(URL.createObjectURL(blob));
        }
      } catch (error) {
        console.error("Error:", error);
        setError(`Error: ${error}`);
      }
    } else {
      setError("Text is empty. Please enter a text to continue");
    }
  }

  function handleOnTextChange(input: string): void {
    setText(input);
  }

  async function generateSpeech() {
    if (text) {
      setGenerating(true);
      const params = {
        Engine: "neural",
        LanguageCode: "en-US",
        OutputFormat: "mp3",
        Text: text,
        VoiceId: "Joanna",
        //SpeechMarkTypes: ["ssml"],
        TextType: "ssml",
      };

      try {
        const { AudioStream: audioStream } = await pollyClient.send(
          new SynthesizeSpeechCommand(params)
        );
        return audioStream;
      } catch (error) {
        console.error("Error generating speech:", error);
        throw error;
      } finally {
        setGenerating(false);
      }
    }
  }

  return (
    <div>
      <h1>Audio Generator</h1>
      <div>
        <label>Enter text to speech</label>
      </div>
      <div>
        <SpeechEditor
          inputValue={defaultText}
          onTextChanged={handleOnTextChange}
        ></SpeechEditor>
      </div>
      <div>
        <button type="button" onClick={handlePayButtonOnClick}>
          {!generating ? "Play" : "Generating..."}
        </button>
      </div>
      <div>{audioURL && <audio controls src={audioURL} autoPlay={true} />}</div>
      <div>{error ? <p>{error}</p> : null}</div>
    </div>
  );
}
