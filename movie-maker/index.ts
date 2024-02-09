import { getProject } from "@theatre/core";
import studio from "@theatre/studio";
import "./localize";
import { Application, Container } from "pixi.js";
import { Pictures } from "./sheets/Pictures";
import { Variables } from "./sheets/Variables";
import { extension } from "./extends";

export default ({ width, height }) => {
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

  const container = new Container();
  app.stage.addChild(container);

  const project = getProject("ムービーメーカー");

  new Pictures({
    project,
    container,
    list: [
      // { name: "文章窓", href: "./pictures/meswin.png", pos: { x: 0, y: 384 } },
      // { name: "ボタン1", href: "./pictures/button.png", pos: { x: 24, y: 24 } },
      // {
      //   name: "ボタン2",
      //   href: "./pictures/button.png",
      //   pos: { x: 24, y: 144 },
      // },
      // {
      //   name: "ボタン3",
      //   href: "./pictures/button.png",
      //   pos: { x: 24, y: 264 },
      // },
      // { name: "名刺", href: "./pictures/meishi.png", pos: { x: 384, y: 72 } },
    ],
  });
  new Variables({
    project,
    container,
    list: [
      // { name: "整数", type: "INT", value: 10 },
      // { name: "実数", type: "FLOAT", value: 3.75 },
      // { name: "文字列", type: "TEXT", value: "あいうえお" },
    ],
  });

  studio.extend(extension({ project, studio }));
};
