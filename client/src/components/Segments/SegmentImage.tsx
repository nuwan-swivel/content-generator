import { Button, Typography } from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Props {
  imageScript: string;
}
const SegmentImage = ({ imageScript }: Props) => {
  const [image, setImage] = useState<string | undefined>(undefined);

  const generateImage = () => {
    // generate image
    const options = {
      method: "POST",
      url: "https://api.edenai.run/v2/image/generation",
      headers: {
        authorization: `Bearer ${process.env.REACT_APP_EDEN_AI_API_KEY}`,
      },
      data: {
        providers: "openai",
        text: imageScript,
        resolution: "512x512",
        num_images: 1,
      },
    };
    axios.request(options).then((response) => {
      console.log("response.data", response.data);
      setImage(response.data.openai.items.pop().image_resource_url);
    });
  };

  return (
    <div className="w-full flex flex-col">
      <Typography variant="h3">Pick a image</Typography>

      <div className="w-full">
        <img src={image} alt="Segment image" />
      </div>
      <Button onClick={generateImage}>Generate</Button>
    </div>
  );
};

export default SegmentImage;
