import { getProject } from "@theatre/core";
import studio from "@theatre/studio";
import "./localize";
import { Application, Container } from "pixi.js";
import { Pictures } from "./sheets/Pictures";
import { Variables } from "./sheets/Variables";
import { extension } from "./extends";
import { loadProjectFile } from "./api";

export default async ({ width, height }) => {
  const queries = location.search
    .slice(1)
    .split("&")
    .map((x) => x.split("="));
  const queryState = queries.find(([k]) => k === "state")?.[1];
  const state = queryState ? await loadProjectFile(queryState) : null;
  if (state) document.title = "MZMM: " + queryState;

  const app = new Application({
    width,
    height,
    background: "#1099bb",
  });

  document.body.appendChild(app.view as HTMLCanvasElement);

  // オートセーブ無効化
  const pendingData = Object.keys(localStorage).find((x) => /theatre/.test(x));
  if (pendingData) localStorage.removeItem(pendingData);

  studio.initialize();

  // zIndex 調整用
  const container = new Container();
  container.sortableChildren = true;
  app.stage.addChild(container);

  const project = getProject("インスペクタ", state ? { state } : {});

  const objectLayer = state?.sheetsById?.["レイヤー"];
  const objectNames = [
    ...new Set([
      ...Object.keys(objectLayer?.sequence?.tracksByObject ?? {}),
      ...Object.keys(objectLayer?.staticOverrides?.byObject ?? {}),
    ]),
  ].sort();

  const regexObjectNameToPicture = /^([^"]+): ([^"]+)\.png$/;
  const objectPictures = objectNames
    .filter((x) => regexObjectNameToPicture.test(x))
    .map((name: string) => {
      const filename = name.match(regexObjectNameToPicture)?.[2];
      return { name, href: `./pictures/${filename}.png` };
    }) as { name: string; href: string }[];
  new Pictures({
    project,
    container,
    list: objectPictures,
  });

  const regexObjectNameToVariable = /^([^"]+): (整数|実数|文字列)$/;
  const objectVariables = objectNames
    .filter((x) => regexObjectNameToVariable.test(x))
    .map((name: string) => {
      const type = { 整数: "INT", 実数: "FLOAT", 文字列: "TEXT" }[
        name.match(regexObjectNameToPicture)?.[2] ?? ""
      ] as unknown as "INT" | "FLOAT" | "TEXT";
      return { name, type };
    });
  new Variables({
    project,
    container,
    list: objectVariables,
    // list: [
    //   { name: "分: 整数", type: "INT" },
    //   { name: "秒: 実数", type: "FLOAT" },
    //   { name: "字幕: 文字列", type: "TEXT" },
    // ],
  });

  studio.extend(extension({ project, studio }));
};
