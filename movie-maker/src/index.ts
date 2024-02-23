import { getProject } from "@theatre/core";
import studio from "@theatre/studio";
import "./localize";
import { Application, Container } from "pixi.js";
import { Pictures } from "./sheets/Pictures";
import { Variables } from "./sheets/Variables";
import { extension } from "./extends";
import { loadProjectFile } from "./api";
import { gs } from "./globalState";
import { getQueries } from "./utils";

export default async () => {
  const q = getQueries("state", "width", "height");
  if (q.state) {
    gs.projectState = q.state ? (await loadProjectFile(q.state)).data : null;
    if (gs.projectState instanceof Error) {
      document.title = "MZMM: 読込エラー";
      return alert(
        "エラーが発生しました。`npm run api` を実行していないか、許可されていません。"
      );
    }
    document.title = "MZMM: " + q.state;
  }

  gs.app = new Application({
    width: Number(q.width) || 816,
    height: Number(q.height) || 624,
    background: "#1099bb",
  });

  document.body.appendChild(gs.app.view as HTMLCanvasElement);

  // オートセーブ無効化
  const pendingData = Object.keys(localStorage).find((x) => /theatre/.test(x));
  if (pendingData) localStorage.removeItem(pendingData);

  gs.studio = studio;
  gs.studio.initialize();

  // zIndex 調整用
  gs.container = new Container();
  gs.container.sortableChildren = true;
  gs.app.stage.addChild(gs.container);

  gs.project = getProject(
    "インスペクタ",
    gs.projectState
      ? { state: gs.projectState }
      : {
          state: {
            sheetsById: {},
            definitionVersion: "0.4.0",
            revisionHistory: [],
          },
        }
  );

  const objectLayer = gs.projectState?.sheetsById?.["シート"];
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

  gs.pictures = new Pictures({ list: objectPictures });

  const regexObjectNameToVariable = /^([^"]+): (整数|実数|文字列)$/;
  const objectVariables = objectNames
    .filter((x) => regexObjectNameToVariable.test(x))
    .map((name: string) => {
      const type = { 整数: "INT", 実数: "FLOAT", 文字列: "TEXT" }[
        name.match(regexObjectNameToPicture)?.[2] ?? ""
      ] as unknown as "INT" | "FLOAT" | "TEXT";
      return { name, type };
    });
  gs.variables = new Variables({
    list: objectVariables,
    // list: [
    //   { name: "分: 整数", type: "INT" },
    //   { name: "秒: 実数", type: "FLOAT" },
    //   { name: "字幕: 文字列", type: "TEXT" },
    // ],
  });

  gs.studio.extend(extension);
};
