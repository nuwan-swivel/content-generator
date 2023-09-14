import { Button } from "@material-tailwind/react";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  onSelectedDropBox: (url: string) => void;
}

const FileUpload = ({ onSelectedDropBox }: Props) => {
  const [selectedFile, setSelectedFile] = useState<string>("");

  const onDrop = (acceptedFiles: File[]) => {
    console.log(
      "🚀 ~ file: FileUpload.tsx:20 ~ onDrop ~ acceptedFiles:",
      acceptedFiles
    );
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const base64String = e.target?.result as string;
      setSelectedFile(base64String);
      onSelectedDropBox(base64String);
    };

    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="container mx-auto mt-10">
      <div {...getRootProps()} className="text-center">
        <input {...getInputProps()} />
        <p className="text-gray-600">
          Drag 'n' drop a file here, or click to select a file
        </p>
        <Button className="ml-2 ">Add New Image</Button>
      </div>
    </div>
  );
};

export default FileUpload;
