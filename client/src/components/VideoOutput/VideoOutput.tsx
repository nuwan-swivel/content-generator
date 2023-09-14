import {
  Alert,
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
import "./VideoOutput.css";
import { getChatCompletions } from "../../helpers/openAI.helper";
import { VideoSegment } from "../../types";

interface Props {
  videoUrl: string;
}
function VideoOutput({ videoUrl }: Props) {
  return (
    <div>
      <div className="flex justify-center w-100 pt-10">
        <Typography variant="h3" color="blue-gray" className="mb-2">
          Congratulation! Your video is ready
        </Typography>
      </div>
      <div className="flex justify-center">
        <video
          className="video"
          controls
          src={videoUrl}
          width="80%"
          height="auto"
        />
      </div>
      <div className="flex justify-center pt-2">
        <a href={videoUrl} download={true} rel="noreferrer" target="_blank">
          <Button type="button" color="blue-gray" className="ml-1 font-bold">
            Download
          </Button>
        </a>
      </div>
    </div>
  );
}

export default VideoOutput;
