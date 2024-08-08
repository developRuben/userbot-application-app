// src/FileUploader.tsx
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface IFileUploaderProps {
  changeResult: (result: any) => void;
}

const FileUploader: React.FC<IFileUploaderProps> = ({
  changeResult,
}: IFileUploaderProps) => {
  // Funzione per convertire il file in Base64
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        handleSubmit(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  // Funzione per inviare il file in Base64 tramite una richiesta POST
  const handleSubmit = (fileBase64: string) => {
    if (!fileBase64) {
      alert("Seleziona un file prima di inviare.");
      return;
    }

    fetch("http://localhost:8080/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ file: fileBase64 }),
    })
      .then((res) => res.json())
      .then((res) => {
        changeResult(res);
      });
  };

  return (
    <div>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
      >
        Upload file
        <VisuallyHiddenInput type="file" onChange={handleFileChange} />
      </Button>
    </div>
  );
};

export default FileUploader;
