const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const PORT = 3001;
const PROJECT_DIR = "./movie-maker/projects";
const PICTURE_DIR = "./movie-maker/pictures";

express()
  .use(express.json())
  .use(cors())

  // プロジェクトファイル系
  .get("/files", (_req, res) => {
    fs.readdir(PROJECT_DIR, (err, files) => {
      if (err) {
        return res.status(500).send("Error reading directory");
      }
      res.json(files.filter((file) => file.endsWith(".json")));
    });
  })
  .get("/files/:name", (req, res) => {
    const filePath = path.join(PROJECT_DIR, req.params.name);
    if (!filePath.endsWith(".json")) {
      return res.status(400).send("Invalid file type");
    }
    fs.createReadStream(filePath)
      .on("error", () => res.status(404).send("File not found"))
      .pipe(res.type("json"));
  })
  .post("/files/:name", express.json(), (req, res) => {
    const filePath = path.join(PROJECT_DIR, req.params.name);
    fs.writeFile(filePath, JSON.stringify(req.body), (err) => {
      if (err) {
        return res.status(500).send("Error saving file");
      }
      res.send("File saved successfully");
    });
  })

  // ピクチャ系
  .get("/pictures", (_req, res) => {
    fs.readdir(PICTURE_DIR, (err, files) => {
      if (err) {
        return res.status(500).send("Error reading directory");
      }
      res.json(files.filter((file) => file.endsWith(".png")));
    });
  })

  .listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
