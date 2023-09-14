import { Typography } from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Props {
  imageScript: string;
}
const SegmentImage = ({ imageScript }: Props) => {
  const [image, setImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    // generate image
    const options = {
      method: "POST",
      url: "https://api.edenai.run/v2/image/generations",
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzE4ZjMxMGYtM2VmYy00NGE5LWI2ZTAtYzEyNjRmYmMyOGRiIiwidHlwZSI6ImFwaV90b2tlbiJ9.V-Z9tfoE6cKLYY-en2N7qjrMClld3asqvhvpzLqhCRA",
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
      setImage(response.data.openai.items.pop());
    });
  }, [imageScript]);

  return (
    <div className="w-full flex flex-col">
      <Typography variant="h3">Pick a image</Typography>

      <div className="w-full">
        <img src={image} alt="Segment image" />
      </div>
    </div>
  );
};

export default SegmentImage;
