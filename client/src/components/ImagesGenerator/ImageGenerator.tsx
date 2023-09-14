import axios from "axios";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Spinner,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import "./ImageGenerator.css";
function countWords(str: string) {
  // Use a regular expression to split the string by spaces and punctuation
  const words = str.split(/\s+|\p{P}/u);

  // Filter out any empty strings (e.g., caused by consecutive spaces)
  const filteredWords = words.filter((word) => word.trim() !== "");

  // Return the number of words
  return filteredWords.length;
}

interface GeneratedImage {
  image: string;
  image_resource_url: string;
}

interface ReplicateReponse {
  items: GeneratedImage[];
  cost: number;
  status: string;
}

interface ResponseData {
  openai: ReplicateReponse;
}
interface Response {
  data: ResponseData;
}
interface VideoResponse {
  data: { message: string; videoUrl: string };
}

interface Props {
  selectedScript: string;
}

function ImageGenerator({ selectedScript }: Props) {
  const [script, setScript] = useState(selectedScript);
  const [generateImageCount, setGenerateImageCount] = useState(3);
  const [createdImages, setCreatedImages] = useState([] as GeneratedImage[]);
  const [videoUrl, setVideoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  function submitAi() {
    setIsLoading(true);
    const options = {
      method: "POST",
      url: "https://api.edenai.run/v2/image/generation",
      headers: {
        authorization: `Bearer ${process.env.REACT_APP_EDEN_AI_API_KEY}`,
      },
      data: {
        providers: "openai",
        text: script,
        resolution: "512x512",
        num_images: 1,
      },
    };
    axios
      .request(options)
      .then((response: Response) => {
        console.log("response.data", response.data);
        setCreatedImages(response.data.openai.items);
        setIsLoading(false);
      })
      .catch((error: unknown) => {
        console.error(error);
        setIsLoading(false);
      });
  }

  function generateVideo() {
    const images = createdImages.map((image) => image.image_resource_url);
    const options = {
      method: "POST",
      url: "http://localhost:4000/video",
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzE4ZjMxMGYtM2VmYy00NGE5LWI2ZTAtYzEyNjRmYmMyOGRiIiwidHlwZSI6ImFwaV90b2tlbiJ9.V-Z9tfoE6cKLYY-en2N7qjrMClld3asqvhvpzLqhCRA",
      },
      data: {
        images,
        text: "Hello Swivel",
      },
    };
    axios
      .request(options)
      .then((response: VideoResponse) => {
        console.log("response.data", response.data);
        setVideoUrl(response.data.videoUrl);
      })
      .catch((error: unknown) => {
        console.error(error);
      });
  }

  return (
    <>
      <div className="wrapper">
        <>
          <div className="input-wrapper">
            <Textarea
              label="Enter Your Prompt"
              value={script}
              onChange={(e) => setScript(e.target.value)}
            />
          </div>
          <Button
            color="blue-gray"
            className="ml-1 font-bold"
            onClick={() => submitAi()}
          >
            {isLoading ? (
              <>
                <Spinner /> Generating...
              </>
            ) : (
              "Generate Image"
            )}
          </Button>
        </>
      </div>
      <div className="wrapper">
        {createdImages.map((image, index) => (
          <Card key={index} className="w-96 m-3 ">
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h6" className="text-center">
                <img
                  className="h-96 w-96 rounded-lg object-cover object-center"
                  src={`${image.image_resource_url}`}
                  alt="nature image"
                />
              </Typography>
            </CardBody>
          </Card>
        ))}
      </div>
    </>
  );
}

export default ImageGenerator;
