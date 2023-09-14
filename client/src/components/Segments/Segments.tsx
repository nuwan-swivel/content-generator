import {
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { VideoSegment } from "../../types";
import SegmentImage from "./SegmentImage";

interface Props {
  segments: VideoSegment[];
}
const Segments = ({ segments }: Props) => {
  return (
    <div>
      <Typography variant="h2">Finalize your video segments</Typography>
      <Tabs value="html" orientation="vertical">
        <TabsHeader className="w-32">
          {segments.map((_s, i) => (
            <Tab key={i} value={i}>
              Segment {i + 1}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {segments.map(({ imageScript, voiceScript }, i) => (
            <TabPanel key={i} value={i} className="py-0">
              <div className="w-full flex">
                <div className="w-1/2">
                  <SegmentImage imageScript={imageScript} />
                </div>
                <div className="w-1/2">
                  <Typography variant="h3">Audio script</Typography>
                </div>
              </div>
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default Segments;
