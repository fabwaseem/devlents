"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Icons } from "./Icons";
import { Button } from "./ui/Button";
import Image from "next/image";

interface FileProps {
  file: File;
  preview: string;
}

interface FileUploadProps {
  onchange: (file: File | undefined) => void;
  error?: string;
}

const FileUpload = ({ onchange, error }: FileUploadProps) => {
  const [file, setFile] = useState<FileProps>();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length && acceptedFiles[0] !== undefined) {
        const newFile = {
          file: acceptedFiles[0],
          preview: URL.createObjectURL(acceptedFiles[0]),
        };
        setFile(newFile);
        onchange(acceptedFiles[0]);
      } else {
        setFile(undefined);
        onchange(undefined);
      }
    },
    [onchange],
  );

  useEffect(() => {
    return () => file && URL.revokeObjectURL(file.preview);
  }, [file]);

  const { fileRejections, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
      accept: {
        "image/*": [".png", ".jpg", ".jpeg"],
      },
      multiple: false,
      maxSize: 1000000,
    });

  return (
    <div
      className={`relative  flex h-full  flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed ${isDragActive ? "border-dark" : null} ${error ? "border-red-500" : null}`}
      {...getRootProps()}
    >
      <input {...getInputProps()} />

      {file ? (
        <Image
          src={file.preview}
          alt="image"
          width={1000}
          height={500}
          className="absolute object-cover"
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      ) : (
        <>
          <Icons.imageUp size={50} strokeWidth={1} />
          <span className="mt-4">Drag and drop here</span>

          {/* error */}
          {fileRejections.length > 0 && (
            <span className="mt-2 text-sm text-red-500">
              {fileRejections[0]?.errors[0]?.message}
            </span>
          )}
          {error && <span className="mt-2 text-sm text-red-500">{error}</span>}
          <Button className="mt-4">or select file</Button>
        </>
      )}
    </div>
  );
};
export default FileUpload;
