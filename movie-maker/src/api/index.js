const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const PORT = 3001;
const DATA_DIR = "./movie-maker/projects";

express()
  .use(express.json())
  .use(cors())
  .get("/files", (req, res) => {
    fs.readdir(DATA_DIR, (err, files) => {
      if (err) {
        return res.status(500).send("Error reading directory");
      }
      res.json(files.filter((file) => file.endsWith(".json")));
    });
  })
  // 指定されたJSONファイルの内容取得
  .get("/files/:name", (req, res) => {
    const filePath = path.join(DATA_DIR, req.params.name);
    if (!filePath.endsWith(".json")) {
      return res.status(400).send("Invalid file type");
    }
    fs.createReadStream(filePath)
      .on("error", () => res.status(404).send("File not found"))
      .pipe(res.type("json"));
  })
  // JSONファイルの保存
  .post("/files/:name", express.json(), (req, res) => {
    const filePath = path.join(DATA_DIR, req.params.name);
    fs.writeFile(filePath, JSON.stringify(req.body), (err) => {
      if (err) {
        return res.status(500).send("Error saving file");
      }
      res.send("File saved successfully");
    });
  })
  .listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
