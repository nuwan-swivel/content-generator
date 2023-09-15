import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import "tui-image-editor/dist/tui-image-editor.css";
import ImageEditor from "@toast-ui/react-image-editor";
import { apiHelper } from "../../helpers/axios.helper";
import FileUpload from "../FileUpload/FileUpload";

interface Props {
  imageScript: string;
  onSelectedImage: (imageUrl: string) => void;
  onRemoveSelectedImage: (imageUrl: string) => void;
}

type ImageEditor = /*unresolved*/ any;
const SegmentImage = ({
  imageScript,
  onSelectedImage,
  onRemoveSelectedImage,
}: Props) => {
  const [image, setImage] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const rootEl = useRef<ImageEditor>(null);

  const generateImage = () => {
    // generate image
    setIsLoading(true);
    const options = {
      method: "POST",
      url: "https://api.edenai.run/v2/image/generation",
      headers: {
        authorization: `Bearer ${process.env.REACT_APP_EDEN_AI_API_KEY}`,
      },
      data: {
        providers: "openai",
        text: `generate image inside 420px width and 614 height frame ${imageScript}`,
        resolution: "512x512",
        num_images: 1,
      },
    };
    axios.request(options).then((response) => {
      console.log("response.data", response.data);
      setIsLoading(false);
      setImage(response.data.openai.items.pop().image_resource_url);
    });
  };

  useEffect(() => {
    const inst = rootEl.current?.getInstance();
    if (image && inst) {
      try {
        console.log("🚀 ~ file: SegmentImage.tsx:64 ~ useEffect ~ inst:", inst);
        let dataURL = inst
          ?.loadImageFromURL(`${image}`, "sample")
          .then((value: any) => {
            if (value && inst && inst.ui && inst.ui.fire()) {
              inst.ui.activeMenuEvent();
              inst.ui.resizeEditor({ imageSize: value });
            }
          });
        console.log("dataURL", dataURL);
      } catch (error) {
        console.log(
          "🚀 ~ file: SegmentImage.tsx:65 ~ useEffect ~ error:",
          error
        );
      }
    }
  }, [image, rootEl]);

  async function handleSelectAndSaveImage() {
    if (!image) return;
    let editedDataUrl = image;
    if (rootEl.current) {
      const imageEditor = rootEl.current.getInstance();
      if (imageEditor) {
        editedDataUrl = imageEditor.toDataURL(); // Get edited image data URL
      }
    }
    const method = "POST";
    const url = "save-image";
    const type = isEdit ? "base64" : "url";
    const data = { image: editedDataUrl, type };

    const apiHelperData = await apiHelper({ method, url, data });
    onSelectedImage(apiHelperData.imageName);
    setImage(apiHelperData.imageName);
    setIsEdit(false);
  }

  function handleEditImage() {
    setIsEdit(!isEdit);
  }

  function handleSelectDropBox(imageBase64: string) {
    setIsEdit(true);
    const inst = rootEl.current?.getInstance();
    let dataURL = inst
      ?.loadImageFromURL(imageBase64, "sample")
      .then((value: any) => {
        if (value && inst && inst.ui && inst.ui.fire()) {
          inst.ui.activeMenuEvent();
          inst.ui.resizeEditor({ imageSize: value });
        }
      });
    console.log("dataURL", dataURL);
  }

  return (
    <>
      <div className="flex justify-center">
        <Typography variant="h3">Pick a image</Typography>
      </div>
      <div className="flex justify-center">
        <img className="" src={image} alt="" />
      </div>
      <div className="flex justify-center pt-2">
        <Button onClick={generateImage}>
          {" "}
          {isLoading ? (
            <>
              <Spinner /> <span className="mx-3">Generating...</span>
            </>
          ) : (
            "Generate"
          )}
        </Button>{" "}
        <Button className="ml-2 " onClick={handleSelectAndSaveImage}>
          Select & Save
        </Button>
        <Button className="ml-2 " onClick={handleEditImage}>
          Edit
        </Button>
      </div>

      <div className="flex justify-center">
        <FileUpload onSelectedDropBox={handleSelectDropBox} />
      </div>
      <div className="flex justify-center"></div>
      <Dialog size="xl" open={isEdit} handler={handleEditImage}>
        <DialogHeader>Its a simple dialog.</DialogHeader>
        <DialogBody divider>
          <div className="flex justify-center">
            <ImageEditor
              ref={rootEl}
              includeUI={{
                includeUI: {
                  loadImage: {
                    path: "",
                    name: "SampleImage",
                  },
                },
                menu: [
                  "shape",
                  "filter",
                  "draw",
                  "crop",
                  "flip",
                  "icon",
                  "text",
                  "mask",
                ],
                initMenu: "filter",
                uiSize: {
                  width: "800px",
                  height: "450px",
                },
                menuBarPosition: "left",
              }}
              cssMaxHeight={500}
              cssMaxWidth={700}
              selectionStyle={{
                cornerSize: 20,
                rotatingPointOffset: 70,
              }}
              usageStatistics={true}
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleEditImage}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={handleSelectAndSaveImage}
          >
            <span>Select & Save</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default SegmentImage;
