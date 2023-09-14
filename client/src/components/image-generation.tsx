import axios from "axios";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";

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

function ImageGeneration() {
  const [prompt, setPrompt] = useState("");
  const [generateImageCount, setGenerateImageCount] = useState(1);
  const [createdImages, setCreatedImages] = useState([] as GeneratedImage[]);
  function submitAi() {
    const wordCount = countWords(prompt);
    console.log("🚀 ~ file: Edenai.tsx:30 ~ submitAi ~ wordCount:", wordCount);
    console.log("🚀 ~ file: Edenai.tsx:30 ~ submitAi ~ prompt:", prompt);
    console.log(
      "🚀 ~ file: Edenai.tsx:30 ~ submitAi ~ generateImageCount:",
      generateImageCount
    );

    // return;
    if (wordCount <= 5) return;
    const options = {
      method: "POST",
      url: "https://api.edenai.run/v2/image/generation",
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzE4ZjMxMGYtM2VmYy00NGE5LWI2ZTAtYzEyNjRmYmMyOGRiIiwidHlwZSI6ImFwaV90b2tlbiJ9.V-Z9tfoE6cKLYY-en2N7qjrMClld3asqvhvpzLqhCRA",
      },
      data: {
        providers: "openai",
        text: prompt,
        resolution: "512x512",
        num_images: generateImageCount,
      },
    };
    axios
      .request(options)
      .then((response: Response) => {
        console.log("response.data", response.data);
        setCreatedImages(response.data.openai.items);
      })

      .catch((error: unknown) => {
        console.error(error);
      });
  }

  return (
    <>
      <div className="flex justify-center m-10">
        <Card className=" w-96">
          <CardHeader
            variant="gradient"
            color="gray"
            className="mb-4 grid h-28 place-items-center"
          >
            Text to Image
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Textarea
              label="Enter Your Prompt"
              onChange={(e) => setPrompt(e.target.value)}
            />
            <Input
              label="Number of images"
              type="number"
              onChange={(e) =>
                setGenerateImageCount(e.target.value as unknown as number)
              }
              crossOrigin={undefined}
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              color="blue-gray"
              className="ml-1 font-bold"
              onClick={() => submitAi()}
            >
              Submit Generate
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div className="container grid grid-cols-3 gap-2 mx-auto">
        {createdImages.map((image, index) => (
          <Card key={index} className="w-96 m-3 ">
            <CardHeader
              variant="gradient"
              color="gray"
              className="mb-4 grid h-20 place-items-center"
            >
              Image {index + 1}
            </CardHeader>
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

export default ImageGeneration;
