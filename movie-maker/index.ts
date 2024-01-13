import { getProject } from "@theatre/core";
import studio from "@theatre/studio";
import demo from "./demo";
import "./localize";
import { Picture } from "./picture";
import { Application, Container } from "pixi.js";

const app = new Application({
  width: 816,
  height: 624,
  background: "#1099bb",
});

document.body.appendChild(app.view as HTMLCanvasElement);

const project = getProject(document.title, {
  state: demo,
});
const sheet = project.sheet("レイヤー", "ピクチャ");

console.log(
  JSON.parse(
    localStorage.getItem(
      Object.keys(localStorage).find((x) => /theatre/.test(x)) ?? ""
    ) ?? ""
  )?.historic.innerState.coreByProject.Document
);

// studio.extend({
//   id: "hello-world-extension",
//   toolbars: {
//     global(set, studio) {
//       set([
//         {
//           type: "Icon",
//           title: "Example Button",
//           svgSource: "🍕",
//           onClick: () => {},
//         },
//       ]);
//       return () => console.log("toolbar removed!");
//     },
//   },
//   panes: [
//     {
//       class: "example",
//       mount({ paneId, node }) {
//         studio.ui.renderToolset("exampleToolbar", node);
//         return () => console.log("pane closed!");
//       },
//     },
//   ],
// });
studio.initialize();

const container = new Container();
app.stage.addChild(container);

const pictures = [
  new Picture(sheet, "文章窓", "./pictures/meswin.png", {
    corner: true,
    x: 0,
    y: 384,
  }),
  new Picture(sheet, "ボタン1", "./pictures/button.png", {
    corner: true,
    x: 24,
    y: 24,
  }),
  new Picture(sheet, "ボタン2", "./pictures/button.png", {
    corner: true,
    x: 24,
    y: 144,
  }),
  new Picture(sheet, "ボタン3", "./pictures/button.png", {
    corner: true,
    x: 24,
    y: 264,
  }),
  new Picture(sheet, "名刺", "./pictures/meishi.png", {
    corner: true,
    x: 384,
    y: 72,
  }),
];

pictures.forEach((picture) => {
  container.addChild(picture.sprite);
});
