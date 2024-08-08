import React, { useState } from "react";
import "./App.css";
import FileUploader from "./fileUploader/fileUploader";
import { Button, Grid, TextField } from "@mui/material";

function App() {
  const [selectedUrl, setSelectedUrl] = useState("");
  const [result, setResult] = useState({});
  const inviaUrl = () => {
    fetch("http://localhost:8080/readFromUrl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: selectedUrl }),
    })
      .then((res) => res.json())
      .then((res) => {
        changeResult(res);
      });
  };

  const changeResult = (result: any) => {
    const { totalWords, totalLetters, totalSpaces, frequentWords } = result;
    setResult({
      "totale Parole": totalWords,
      "totale Lettere": totalLetters,
      "totale Spazi": totalSpaces,
      "Parole che appaiono piu' di 10 volte": frequentWords,
    });
  };
  return (
    <div className="app">
      <Grid container spacing={2}>
        <Grid xs={6}>
          <FileUploader changeResult={changeResult} />
        </Grid>
        <Grid xs={6}>
          <Grid xl={12}>
            <TextField
              id="outlined-basic"
              label="Analizza il file presente in questo url"
              variant="outlined"
              onChange={(event) => {
                setSelectedUrl(event.target.value);
              }}
            />
          </Grid>
          <Grid xl={12}>
            <Button variant="contained" onClick={inviaUrl}>
              Analizza il file in questo url
            </Button>
          </Grid>
        </Grid>
        <Grid xl={12}>Result:</Grid>
        <Grid xs={12}>
          {Object.entries(result).map(([key, value]) => (
            <div>
              {key === "Parole che appaiono piu' di 10 volte" ? (
                <>
                  <Grid xs={1}> </Grid>
                  <Grid xs={11}>
                    <b>{key}: </b>
                    {(value as { [key: string]: number }[]).map((item) =>
                      Object.entries(item).map(([countWord, countValue]) => (
                        <p>
                          {countWord}: {countValue}
                        </p>
                      ))
                    )}
                  </Grid>
                </>
              ) : (
                <>
                  <b>{key}: </b>
                  {value as number}
                </>
              )}
            </div>
          ))}
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
