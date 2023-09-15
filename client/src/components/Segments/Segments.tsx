import {
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel,
  Typography,
  Button,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { VideoSegment } from "../../types";
import SegmentImage from "./SegmentImage";
import SpeechGenerator from "../SpeechGenerator/SpeechGenerator";
import axios from "axios";
import { apiHelper } from "../../helpers/axios.helper";
import { on } from "events";

interface Props {
  segments: VideoSegment[];
  onVideoUrlGenerated: (url: string) => void;
}
const Segments = ({ segments, onVideoUrlGenerated }: Props) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [updatedSegments, setUpdatedSegments] =
    useState<VideoSegment[]>(segments);

  const onSaveImage = (img: string, segmentIndex: number) => {
    setUpdatedSegments(
      updatedSegments.map((segment, i) =>
        i === segmentIndex ? { ...segment, image: img } : segment
      )
    );
  };

  const onRemoveImage = (segmentIndex: number) => {
    setUpdatedSegments(
      updatedSegments.map((segment, i) =>
        i === segmentIndex ? { ...segment, image: undefined } : segment
      )
    );
  };

  const onSaveVoice = (url: string, segmentIndex: number) => {
    setUpdatedSegments(
      updatedSegments.map((segment, i) =>
        i === segmentIndex ? { ...segment, voice: url } : segment
      )
    );
  };

  const handleNextClick = async () => {
    if (selectedTab + 1 === updatedSegments.length) {
      await generateVideo();
      return;
    }
    const element = document.querySelector(
      `li[data-value="${selectedTab + 1}"]`
    );
    (element as HTMLLIElement).click();
    setSelectedTab(selectedTab + 1);
  };

  const generateVideo = async () => {
    const result = await apiHelper({
      method: "post",
      url: "video",
      data: {
        images: updatedSegments.map((segment) => segment.image),
        audioUrls: updatedSegments.map((segment) => segment.voice),
      },
    });

    onVideoUrlGenerated(result.videoUrl);
  };

  return (
    <div>
      <Typography variant="h2">Finalize your video segments</Typography>
      <Tabs value={selectedTab} orientation="vertical">
        <TabsHeader className="w-32">
          {segments.map((_s, i) => (
            <Tab key={i} value={i} onClick={() => setSelectedTab(i)}>
              Segment {i + 1}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {segments.map(({ imageScript, voiceScript }, i) => (
            <TabPanel key={i} value={i} className="py-0">
              <div className="w-full flex">
                <div className="w-1/2">
                  <SegmentImage
                    imageScript={imageScript}
                    onSelectedImage={(img) => onSaveImage(img, i)}
                    onRemoveSelectedImage={() => onRemoveImage(i)}
                  />
                </div>
                <div className="w-1/2 p-2">
                  <Typography variant="h3">Audio script</Typography>
                  <SpeechGenerator
                    voiceScript={voiceScript}
                    onSaveVoice={(url) => onSaveVoice(url, i)}
                  />
                </div>
              </div>
              <div className="w-full flex justify-end mt-4 pt-4 border-t-2">
                <Button onClick={handleNextClick}>
                  {selectedTab + 1 === segments.length
                    ? "Generate video"
                    : "Next"}
                </Button>
              </div>
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default Segments;
